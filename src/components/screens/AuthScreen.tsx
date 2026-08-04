import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import appLogo from '../../assets/images/app_logo_1785840078052.jpg';
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  KeyRound,
  RefreshCw,
  Send,
  X
} from 'lucide-react';
import {
  loginUserWithEmail,
  registerUserWithEmail,
  sendResetPasswordEmail,
  resendEmailVerificationLink,
  checkEmailVerificationStatus,
  UserCloudProfile
} from '../../services/firebaseAuthService';

interface AuthScreenProps {
  onAuthSuccess: (profile: UserCloudProfile, isNewUser: boolean) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Forgot Password Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgotError, setForgotError] = useState('');

  // Email Verification State
  const [unverifiedUser, setUnverifiedUser] = useState<UserCloudProfile | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !password) {
      setErrorMsg('Email dan Password wajib diisi.');
      return;
    }

    if (mode === 'REGISTER') {
      if (!fullName.trim()) {
        setErrorMsg('Nama Lengkap wajib diisi.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password minimal 6 karakter.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Konfirmasi Password tidak cocok.');
        return;
      }
    }

    setIsLoading(true);

    try {
      if (mode === 'REGISTER') {
        const profile = await registerUserWithEmail(email, password, fullName);
        setIsLoading(false);
        setSuccessMsg('Akun berhasil dibuat! Silakan verifikasi email Anda.');
        setUnverifiedUser(profile);
        onAuthSuccess(profile, true);
      } else {
        const profile = await loginUserWithEmail(email, password);
        setIsLoading(false);
        
        if (rememberMe) {
          localStorage.setItem('fz_remember_email', email);
        } else {
          localStorage.removeItem('fz_remember_email');
        }

        onAuthSuccess(profile, false);
      }
    } catch (err: any) {
      setIsLoading(false);
      console.error('Firebase Auth Error:', err);
      
      const code = err.code || '';
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        setErrorMsg('Email atau password salah.');
      } else if (code === 'auth/email-already-in-use') {
        setErrorMsg('Email sudah terdaftar. Silakan masuk.');
      } else if (code === 'auth/invalid-email') {
        setErrorMsg('Format email tidak valid.');
      } else if (code === 'auth/too-many-requests') {
        setErrorMsg('Terlalu banyak percobaan gagal. Coba lagi nanti.');
      } else {
        setErrorMsg(err.message || 'Gagal memproses otentikasi. Coba lagi.');
      }
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');

    if (!forgotEmail) {
      setForgotError('Masukkan email terdaftar Anda.');
      return;
    }

    setForgotLoading(true);
    try {
      await sendResetPasswordEmail(forgotEmail);
      setForgotLoading(false);
      setForgotSuccess('Tautan reset password telah dikirim ke email Anda!');
    } catch (err: any) {
      setForgotLoading(false);
      if (err.code === 'auth/user-not-found') {
        setForgotError('Email tidak ditemukan dalam sistem.');
      } else {
        setForgotError('Gagal mengirim email reset. Periksa format email.');
      }
    }
  };

  const handleResendVerification = async () => {
    if (resendCooldown > 0) return;
    try {
      await resendEmailVerificationLink();
      setSuccessMsg('Email verifikasi baru telah dikirim.');
      setResendCooldown(60);
      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (e: any) {
      setErrorMsg('Gagal mengirim email verifikasi.');
    }
  };

  const handleCheckVerified = async () => {
    const isVerified = await checkEmailVerificationStatus();
    if (isVerified && unverifiedUser) {
      setUnverifiedUser({ ...unverifiedUser, emailVerified: true });
      onAuthSuccess({ ...unverifiedUser, emailVerified: true }, false);
    } else {
      setErrorMsg('Email Anda belum terverifikasi. Silakan cek inbox/spam.');
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-[#090D16] text-zinc-100 flex flex-col justify-between p-6 select-none overflow-y-auto">
      {/* Premium Multi-Layered Animated Ambient Gradient Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 0.95, 1],
            rotate: [0, 60, 120, 180],
            x: ['-20%', '-15%', '-25%', '-20%'],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-1/4 w-[450px] h-[450px] bg-[#6C4CF5]/10 rounded-full blur-[110px] opacity-40"
        />
        <motion.div
          animate={{
            scale: [0.95, 1.05, 1, 0.95],
            rotate: [0, -45, -90, -135],
            y: ['0%', '8%', '-4%', '0%'],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-[#0ea5e9]/5 rounded-full blur-[100px] opacity-20"
        />
      </div>

      {/* Header */}
      <div className="pt-2 flex justify-between items-center relative z-10">
        <motion.div 
          initial={{ x: -15, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="flex items-center space-x-2.5"
        >
          <div className="w-8 h-8 rounded-xl overflow-hidden border border-indigo-500/30 shadow-md shrink-0 bg-[#16181D]">
            <img
              src={appLogo}
              alt="FZ"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="text-xs font-bold tracking-widest text-white uppercase block">FZ SAVINGS</span>
            <span className="text-[9px] font-semibold text-zinc-400 uppercase tracking-wider block">Firebase Cloud Auth</span>
          </div>
        </motion.div>

        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          onClick={() => {
            setMode(mode === 'LOGIN' ? 'REGISTER' : 'LOGIN');
            setErrorMsg('');
            setSuccessMsg('');
          }}
          className="text-[11px] font-bold text-indigo-400 hover:text-white transition-all px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800/80 flex items-center gap-1.5 shadow-lg shadow-black/20"
        >
          <span>{mode === 'LOGIN' ? 'Daftar Akun' : 'Masuk Sesi'}</span>
          <ArrowRight className="w-3 h-3 text-indigo-400" />
        </motion.button>
      </div>

      {/* Main Container */}
      <div className="my-auto max-w-sm w-full mx-auto space-y-5 relative z-10 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-1.5"
          >
            <h2 className="text-2xl font-black text-white tracking-tight">
              {mode === 'LOGIN' ? 'Selamat Datang Kembali' : 'Buat Akun FZ Vault'}
            </h2>
            <p className="text-xs text-zinc-400 font-medium max-w-xs mx-auto leading-relaxed">
              {mode === 'LOGIN'
                ? 'Otentikasi aman berbasis enkripsi Firebase Cloud untuk portofolio finansial Anda.'
                : 'Daftarkan diri Anda untuk mulai mengelola tabungan dan dompet digital terenkripsi.'}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Global Alert Messages */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold flex items-start gap-2.5 shadow-lg"
            >
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5 animate-bounce" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-start gap-2.5 shadow-lg"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 animate-bounce" />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence initial={false}>
            {mode === 'REGISTER' && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="space-y-1 pb-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-1">
                    Nama Lengkap
                  </label>
                  <div className="relative group">
                    <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-indigo-400" />
                    <input
                      type="text"
                      required
                      placeholder="Faza Asfi"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-900/80 border border-zinc-800 rounded-2xl text-xs font-medium text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-500 transition-all shadow-inner"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-1">
              Alamat Email
            </label>
            <div className="relative group">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-indigo-400" />
              <input
                type="email"
                required
                placeholder="faza.asfi@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-zinc-900/80 border border-zinc-800 rounded-2xl text-xs font-medium text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-500 transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between px-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Password
              </label>
              {mode === 'LOGIN' && (
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(email);
                    setShowForgotModal(true);
                  }}
                  className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Lupa Password?
                </button>
              )}
            </div>
            <div className="relative group">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-indigo-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-zinc-900/80 border border-zinc-800 rounded-2xl text-xs font-medium text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-500 transition-all shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {mode === 'REGISTER' && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="space-y-1 pb-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 px-1">
                    Konfirmasi Password
                  </label>
                  <div className="relative group">
                    <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-indigo-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-900/80 border border-zinc-800 rounded-2xl text-xs font-medium text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-500 transition-all shadow-inner"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {mode === 'LOGIN' && (
            <div className="flex items-center justify-between px-1 pt-0.5">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-indigo-600 focus:ring-indigo-600/40"
                />
                <span className="text-xs text-zinc-300 font-semibold transition-colors group-hover:text-white">Ingat Sesi Saya</span>
              </label>
            </div>
          )}

          <div className="space-y-2.5 pt-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/20 disabled:opacity-50"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
              ) : (
                <>
                  <span>{mode === 'LOGIN' ? 'Masuk Sesi Terenkripsi' : 'Daftar Akun Baru'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="button"
              onClick={() => onAuthSuccess({ uid: 'guest', email: 'fazaasfi@gmail.com', displayName: 'Faza Asfi' }, false)}
              className="w-full py-3 rounded-2xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/60 text-zinc-300 font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 shadow-md"
            >
              <span>Masuk Tanpa Login (Langsung ke Aplikasi)</span>
            </motion.button>
          </div>
        </form>

        {/* Verification Alert Notice Banner */}
        {unverifiedUser && !unverifiedUser.emailVerified && (
          <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 space-y-2.5">
            <div className="flex items-center space-x-2">
              <Send className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-white">Email Verifikasi Terkirim</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Kami telah mengirimkan instruksi verifikasi ke <strong className="text-white">{unverifiedUser.email}</strong>. Harap verifikasi sebelum melanjutkan.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleResendVerification}
                disabled={resendCooldown > 0}
                className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-indigo-300 border border-zinc-700 transition-all"
              >
                {resendCooldown > 0 ? `Kirim Ulang (${resendCooldown}s)` : 'Kirim Ulang Email'}
              </button>
              <button
                onClick={handleCheckVerified}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-bold text-emerald-400 border border-emerald-500/20 transition-all"
              >
                Saya Sudah Verifikasi
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Badge */}
      <div className="pb-2 text-center relative z-10">
        <div className="inline-flex items-center space-x-1.5 text-[10px] text-zinc-400 bg-zinc-900/90 border border-zinc-800 px-3 py-1 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Firebase Cloud Auth & Firestore Secured</span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-xs p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 shadow-2xl relative"
            >
              <button
                onClick={() => setShowForgotModal(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Reset Password</h3>
                  <p className="text-[10px] text-zinc-400">Kirim instruksi ke email Anda</p>
                </div>
              </div>

              {forgotError && (
                <p className="text-xs font-semibold text-rose-400 bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20">
                  {forgotError}
                </p>
              )}

              {forgotSuccess && (
                <p className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                  {forgotSuccess}
                </p>
              )}

              <form onSubmit={handleForgotPassword} className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="faza.asfi@gmail.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  {forgotLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <span>Kirim Email Reset</span>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
