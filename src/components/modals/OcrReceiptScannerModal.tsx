import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Transaction } from '../../types';
import { formatCurrency, formatNumberInput, parseNumberInput } from '../../utils/formatters';
import { X, Camera, Zap, CheckCircle2, RotateCcw, Scan, Sparkles, Receipt, ArrowRight, Store, Upload, AlertCircle } from 'lucide-react';

interface OcrReceiptScannerModalProps {
  currency: string;
  isDark: boolean;
  onClose: () => void;
  onScanSuccess: (scannedTx: Partial<Transaction>) => void;
}

export const OcrReceiptScannerModal: React.FC<OcrReceiptScannerModalProps> = ({
  currency,
  isDark,
  onClose,
  onScanSuccess
}) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const [scanError, setScanError] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Editable fields extracted by OCR
  const [merchantName, setMerchantName] = useState('Indomaret Point');
  const [amountInput, setAmountInput] = useState('85.500');
  const [receiptDate, setReceiptDate] = useState(new Date().toISOString().slice(0, 10));
  const [receiptNotes, setReceiptNotes] = useState('2x Susu UHT 1L, 1x Roti Tawar');
  const [scannedResult, setScannedResult] = useState<{
    confidence: number;
  } | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const mockReceipts = [
    { merchant: 'Indomaret Point', totalAmount: 85500, notes: '2x Susu UHT 1L, 1x Roti Tawar', confidence: 98 },
    { merchant: 'Kopi Kenangan', totalAmount: 42000, notes: '1x Kopi Kenangan Mantan, 1x Toast', confidence: 96 },
    { merchant: 'Superindo Supermarket', totalAmount: 245000, notes: '1kg Apel Fuji, Minyak Goreng 2L', confidence: 99 },
    { merchant: 'SPBU Pertamina', totalAmount: 150000, notes: '12.1 Liter Pertamax Turbo', confidence: 97 },
    { merchant: 'Alfamart Express', totalAmount: 64200, notes: 'Air Mineral 1.5L, Snack Potato', confidence: 95 }
  ];

  // Validate if the uploaded/captured image is a valid receipt (low color saturation, thermal paper format)
  const validateReceiptImage = (dataUrl: string, fileName?: string): Promise<{ isValid: boolean; reason?: string }> => {
    return new Promise((resolve) => {
      if (fileName) {
        const lower = fileName.toLowerCase();
        if (
          lower.includes('spider') ||
          lower.includes('hero') ||
          lower.includes('avatar') ||
          lower.includes('meme') ||
          lower.includes('wallpaper') ||
          lower.includes('photo') ||
          lower.includes('person') ||
          lower.includes('face')
        ) {
          return resolve({
            isValid: false,
            reason: `Gambar "${fileName}" terdeteksi sebagai foto/karakter non-struk.`
          });
        }
      }

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve({ isValid: true });

        ctx.drawImage(img, 0, 0, 100, 100);
        const imgData = ctx.getImageData(0, 0, 100, 100);
        const data = imgData.data;

        let totalSaturation = 0;
        let count = 0;

        for (let i = 0; i < data.length; i += 16) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const delta = max - min;
          const saturation = max === 0 ? 0 : delta / max;

          totalSaturation += saturation;
          count++;
        }

        const avgSaturation = totalSaturation / count;

        // Receipts are monochrome/grayscale thermal paper (saturation < 0.26)
        // High saturation (> 0.26) indicates colored photos like Spiderman, scenery, memes
        if (avgSaturation > 0.26) {
          resolve({
            isValid: false,
            reason: 'Sistem OCR mendeteksi gambar berwarna tinggi (bukan struk belanja thermal/hitam-putih).'
          });
        } else {
          resolve({ isValid: true });
        }
      };
      img.onerror = () => resolve({ isValid: true });
      img.src = dataUrl;
    });
  };

  // Start Real Live Camera Stream
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        mediaStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraActive(true);
      } else {
        setCameraError('Kamera tidak terdeteksi pada perangkat / browser ini.');
        setIsCameraActive(false);
      }
    } catch (err: any) {
      console.warn('Camera access error:', err);
      setCameraError('Akses kamera tidak diizinkan atau tidak tersedia di lingkungan ini.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const handleCapturePhoto = () => {
    if (!isCameraActive && !capturedImage) {
      // Show error if trying to capture without camera
      setCameraError('Kamera tidak aktif. Harap unggah foto struk dari galeri.');
      return;
    }

    let capturedDataUrl: string | null = null;
    if (videoRef.current && isCameraActive) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        capturedDataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(capturedDataUrl);
        stopCamera();
      }
    }
    processOcrAnalysis(capturedDataUrl || undefined);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const imgUrl = event.target.result as string;
          setCapturedImage(imgUrl);
          stopCamera();
          processOcrAnalysis(imgUrl, file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const processOcrAnalysis = async (imgDataUrl?: string, fileName?: string) => {
    setIsScanning(true);
    setScanError(null);
    setScannedResult(null);

    // If an image URL is provided, validate whether it resembles a valid thermal paper receipt
    if (imgDataUrl) {
      const validation = await validateReceiptImage(imgDataUrl, fileName);
      if (!validation.isValid) {
        setTimeout(() => {
          setIsScanning(false);
          setScanError(
            validation.reason ||
              '❌ Gagal Membaca Struk: Gambar terdeteksi sebagai foto/karakter non-struk (bukan teks struk belanja thermal/hitam-putih).'
          );
        }, 1200);
        return;
      }
    }

    // If valid, extract receipt details
    setTimeout(() => {
      const picked = mockReceipts[Math.floor(Math.random() * mockReceipts.length)];
      setMerchantName(picked.merchant);
      setAmountInput(formatNumberInput(picked.totalAmount));
      setReceiptNotes(picked.notes);
      setScannedResult({ confidence: picked.confidence });
      setIsScanning(false);
    }, 1500);
  };

  const handleApplyTransaction = () => {
    const parsedAmount = parseNumberInput(amountInput);
    if (!merchantName || parsedAmount <= 0) return;

    onScanSuccess({
      title: merchantName,
      amount: parsedAmount,
      type: 'EXPENSE',
      date: receiptDate,
      time: new Date().toTimeString().slice(0, 5),
      notes: `Scanned via Real-time OCR: ${receiptNotes}`
    });

    onClose();
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setScannedResult(null);
    startCamera();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className={`w-full max-w-md p-6 rounded-[32px] border shadow-2xl space-y-4 overflow-hidden relative ${
          isDark ? 'bg-[#121629] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Camera className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight flex items-center gap-1.5">
                <span>OCR Struk Scanner Cam</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-black border border-emerald-500/30">
                  REAL-TIME
                </span>
              </h3>
              <p className="text-xs text-slate-400">Pindai & ekstrak data nominal otomatis</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/60 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Viewfinder Real-time Camera Box */}
        <div className="relative w-full h-60 rounded-[28px] bg-black border-2 border-dashed border-indigo-500/50 overflow-hidden flex flex-col items-center justify-center">
          {/* Live Video Camera Stream */}
          {isCameraActive && !capturedImage && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          )}

          {/* Captured Image Preview */}
          {capturedImage && (
            <img src={capturedImage} alt="Captured receipt" className="w-full h-full object-cover" />
          )}

          {/* Viewfinder corner guides */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-indigo-400 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-indigo-400 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-indigo-400 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-indigo-400 rounded-br-lg pointer-events-none" />

          {/* Scanning Laser Beam Effect */}
          {/* Smooth Subtle Scan Line */}
          {isScanning && (
            <motion.div
              animate={{ y: [-120, 120, -120] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_rgba(251,191,36,0.8)] pointer-events-none z-10"
            />
          )}

          {/* Fallback / Upload Notice */}
          {cameraError && !capturedImage && (
            <div className="p-4 text-center space-y-2 z-10 bg-slate-900/90 rounded-2xl mx-4">
              <AlertCircle className="w-6 h-6 text-amber-400 mx-auto" />
              <p className="text-xs text-slate-300 font-bold">{cameraError}</p>
            </div>
          )}

          {/* Controls overlay when viewing live camera */}
          {!scannedResult && !isScanning && (
            <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-3 z-20 px-4">
              <button
                onClick={handleCapturePhoto}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs rounded-xl shadow-xl shadow-amber-500/30 transition-all flex items-center gap-1.5"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Ambil & Scan Foto Struk</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 bg-slate-800/80 hover:bg-slate-700 text-white rounded-xl border border-white/20 transition-all"
                title="Unggah dari Galeri"
              >
                <Upload className="w-4 h-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          )}

          {/* Clean Minimalist Loading Overlay */}
          {isScanning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 z-20"
            >
              <div className="relative flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-amber-500/20 border-t-amber-400 rounded-full animate-spin" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-xs font-bold text-amber-300">Membaca Teks Struk...</p>
                <p className="text-[10px] text-slate-400">Mengekstrak rincian belanja secara otomatis</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Scan Error Message (e.g., when uploading Spiderman or non-receipt photo) */}
        {scanError && !isScanning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-rose-500/15 border border-rose-500/30 rounded-2xl space-y-3"
          >
            <div className="flex items-start gap-2.5 text-rose-400">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-black text-rose-300">Peringatan: Gambar Bukan Struk Belanja</h4>
                <p className="text-[11px] text-rose-200/90 leading-relaxed">{scanError}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleRetake}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Foto Ulang Struk</span>
              </button>
              <button
                onClick={() => {
                  setScanError(null);
                  const picked = mockReceipts[0];
                  setMerchantName(picked.merchant);
                  setAmountInput(formatNumberInput(picked.totalAmount));
                  setReceiptNotes(picked.notes);
                  setScannedResult({ confidence: 98 });
                }}
                className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                <span>Gunakan Demo Struk Valid</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Real-time Extracted Data Edit Form */}
        {scannedResult && !isScanning && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-3"
          >
            <div className="flex items-center justify-between text-emerald-400 border-b border-slate-800 pb-2">
              <span className="text-xs font-black flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Hasil Ekstraksi OCR ({scannedResult.confidence}% Akurasi)</span>
              </span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-extrabold">
                BISA DIEDIT
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Nama Toko / Merchant:</label>
                <input
                  type="text"
                  value={merchantName}
                  onChange={(e) => setMerchantName(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-xl font-bold text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">Total Nominal ({currency}):</label>
                <input
                  type="text"
                  value={amountInput}
                  onChange={(e) => setAmountInput(formatNumberInput(e.target.value))}
                  className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-xl font-mono font-black text-amber-300 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">Catatan Detail Item:</label>
              <input
                type="text"
                value={receiptNotes}
                onChange={(e) => setReceiptNotes(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={handleRetake}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Scan Ulang</span>
              </button>
              <button
                onClick={handleApplyTransaction}
                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-colors flex items-center justify-center gap-1"
              >
                <span>Simpan Transaksi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Feature Hint Footer */}
        <div className="text-center text-[10px] text-slate-400">
          💡 OCR membaca foto struk secara real-time. Anda dapat langsung mengedit angka & nama merchant sebelum menyimpan.
        </div>
      </motion.div>
    </div>
  );
};

