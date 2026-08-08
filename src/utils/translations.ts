export type AppLanguage = 'ID' | 'EN' | 'ES' | 'JA' | 'AR' | 'FR' | 'DE' | 'ZH' | 'KO';

export interface TranslationDictionary {
  appName: string;
  // Dock / Navigation Tabs
  tabDashboard: string;
  tabSavings: string;
  tabTransactions: string;
  tabStats: string;
  tabTools: string;
  tabProfile: string;
  tabTarget: string;

  // Common UI words
  save: string;
  cancel: string;
  add: string;
  delete: string;
  edit: string;
  loading: string;
  search: string;
  all: string;
  active: string;
  filter: string;

  // Settings screen specific
  settingsTitle: string;
  settingsSubtitle: string;
  userProfileCard: string;
  joinedSince: string;
  changePhoto: string;
  changeUsername: string;
  currencyAndDisplay: string;
  mainCurrency: string;
  displayTheme: string;
  lightTheme: string;
  darkTheme: string;
  systemTheme: string;
  languageSetting: string;
  securitySection: string;
  biometricSecurity: string;
  pinSecurity: string;
  dataBackup: string;
  resetAllData: string;
  logoutFirebase: string;

  // Dashboard specific
  financialOverview: string;
  totalBalance: string;
  totalIncome: string;
  totalExpense: string;
  financialHealth: string;
  recentTransactions: string;
  addTransaction: string;
  emptyTransactions: string;

  // New Dashboard & general UI additions
  searchTooltip?: string;
  settingsTooltip?: string;
  savedRateSuffix?: string;
  showBalance?: string;
  hideBalance?: string;
  quickActions?: string;
  depositCash?: string;
  withdrawCash?: string;
  transfer?: string;
  scanQris?: string;
  yourAccounts?: string;
  manage?: string;
  emergency?: string;
  investment?: string;
  main?: string;
  annualInterest?: string;
  netWorthGrowth?: string;
  detail?: string;
  viewAll?: string;
  cashFlow?: string;
}

export const translations: Record<AppLanguage, TranslationDictionary> = {
  ID: {
    appName: "FZ Savings",
    tabDashboard: "Dasbor",
    tabSavings: "Tabungan",
    tabTransactions: "Riwayat",
    tabStats: "Statistik",
    tabTools: "Fitur",
    tabProfile: "Profil",
    tabTarget: "Target",
    save: "Simpan",
    cancel: "Batal",
    add: "Tambah",
    delete: "Hapus",
    edit: "Ubah",
    loading: "Memuat...",
    search: "Cari...",
    all: "Semua",
    active: "Aktif",
    filter: "Saring",
    settingsTitle: "Profil & Pengaturan",
    settingsSubtitle: "Personalisasi akun & keamanan biometrik",
    userProfileCard: "Kartu Profil Pengguna",
    joinedSince: "Anggota Sejak",
    changePhoto: "Ubah Foto dari Galeri",
    changeUsername: "Ubah USN",
    currencyAndDisplay: "Mata Uang & Tampilan",
    mainCurrency: "Mata Uang Utama",
    displayTheme: "Tema Tampilan",
    lightTheme: "Terang (Light)",
    darkTheme: "Gelap (Dark)",
    systemTheme: "Sistem (System)",
    languageSetting: "Bahasa Aplikasi",
    securitySection: "Keamanan & Proteksi PIN",
    biometricSecurity: "Keamanan Biometrik / FaceID",
    pinSecurity: "Proteksi PIN 6-Digit",
    dataBackup: "Cadangkan Data (Offline First)",
    resetAllData: "Reset Semua Data Aplikasi",
    logoutFirebase: "Keluar Sesi (Logout Firebase)",
    financialOverview: "Ikhtisar Finansial",
    totalBalance: "Total Saldo",
    totalIncome: "Total Pemasukan",
    totalExpense: "Total Pengeluaran",
    financialHealth: "Kesehatan Finansial",
    recentTransactions: "Transaksi Terbaru",
    addTransaction: "Tambah Transaksi",
    emptyTransactions: "Belum ada transaksi tercatat.",
    searchTooltip: "Cari Transaksi",
    settingsTooltip: "Pengaturan",
    savedRateSuffix: "Terhemat",
    showBalance: "Tampilkan Saldo",
    hideBalance: "Sembunyikan Saldo",
    quickActions: "Aksi Cepat",
    depositCash: "Setor Kas",
    withdrawCash: "Tarik Kas",
    transfer: "Transfer",
    scanQris: "Scan QRIS",
    yourAccounts: "Rekening Anda",
    manage: "Kelola",
    emergency: "Darurat",
    investment: "Investasi",
    main: "Utama",
    annualInterest: "Bunga Tahunan",
    netWorthGrowth: "Pertumbuhan Net Worth",
    detail: "Detail",
    viewAll: "Lihat Semua",
    cashFlow: "Arus Kas"
  },
  EN: {
    appName: "FZ Savings",
    tabDashboard: "Dashboard",
    tabSavings: "Savings",
    tabTransactions: "History",
    tabStats: "Statistics",
    tabTools: "Tools",
    tabProfile: "Profile",
    tabTarget: "Goals",
    save: "Save",
    cancel: "Cancel",
    add: "Add",
    delete: "Delete",
    edit: "Edit",
    loading: "Loading...",
    search: "Search...",
    all: "All",
    active: "Active",
    filter: "Filter",
    settingsTitle: "Profile & Settings",
    settingsSubtitle: "Account personalization & biometric security",
    userProfileCard: "User Profile Card",
    joinedSince: "Member Since",
    changePhoto: "Change Photo from Gallery",
    changeUsername: "Edit Username",
    currencyAndDisplay: "Currency & Display",
    mainCurrency: "Main Currency",
    displayTheme: "Display Theme",
    lightTheme: "Light",
    darkTheme: "Dark",
    systemTheme: "System",
    languageSetting: "App Language",
    securitySection: "Security & PIN Protection",
    biometricSecurity: "Biometric Security / FaceID",
    pinSecurity: "6-Digit PIN Protection",
    dataBackup: "Data Backup (Offline First)",
    resetAllData: "Reset All Application Data",
    logoutFirebase: "Logout Sesi (Firebase Logout)",
    financialOverview: "Financial Overview",
    totalBalance: "Total Balance",
    totalIncome: "Total Income",
    totalExpense: "Total Expenses",
    financialHealth: "Financial Health",
    recentTransactions: "Recent Transactions",
    addTransaction: "Add Transaction",
    emptyTransactions: "No transactions recorded yet.",
    searchTooltip: "Search Transactions",
    settingsTooltip: "Settings",
    savedRateSuffix: "Saved",
    showBalance: "Show Balance",
    hideBalance: "Hide Balance",
    quickActions: "Quick Actions",
    depositCash: "Deposit Cash",
    withdrawCash: "Withdraw Cash",
    transfer: "Transfer",
    scanQris: "Scan QRIS",
    yourAccounts: "Your Accounts",
    manage: "Manage",
    emergency: "Emergency",
    investment: "Investment",
    main: "Main",
    annualInterest: "Annual Interest",
    netWorthGrowth: "Net Worth Growth",
    detail: "Detail",
    viewAll: "View All",
    cashFlow: "Cash Flow"
  },
  ES: {
    appName: "FZ Savings",
    tabDashboard: "Tablero",
    tabSavings: "Ahorros",
    tabTransactions: "Historial",
    tabStats: "Estadísticas",
    tabTools: "Herramientas",
    tabProfile: "Perfil",
    tabTarget: "Metas",
    save: "Guardar",
    cancel: "Cancelar",
    add: "Añadir",
    delete: "Eliminar",
    edit: "Editar",
    loading: "Cargando...",
    search: "Buscar...",
    all: "Todo",
    active: "Activo",
    filter: "Filtrar",
    settingsTitle: "Perfil y Configuración",
    settingsSubtitle: "Personalización de cuenta y seguridad biométrica",
    userProfileCard: "Tarjeta de perfil de usuario",
    joinedSince: "Miembro desde",
    changePhoto: "Cambiar foto de la galería",
    changeUsername: "Editar nombre",
    currencyAndDisplay: "Moneda y Pantalla",
    mainCurrency: "Moneda Principal",
    displayTheme: "Tema de Pantalla",
    lightTheme: "Claro",
    darkTheme: "Oscuro",
    systemTheme: "Sistema",
    languageSetting: "Idioma de la aplicación",
    securitySection: "Seguridad y Protección PIN",
    biometricSecurity: "Seguridad biométrica / FaceID",
    pinSecurity: "Protección PIN de 6 dígitos",
    dataBackup: "Copia de seguridad (Offline First)",
    resetAllData: "Restablecer todos los datos",
    logoutFirebase: "Cerrar sesión de Firebase",
    financialOverview: "Resumen Financiero",
    totalBalance: "Saldo Total",
    totalIncome: "Ingresos Totales",
    totalExpense: "Gastos Totales",
    financialHealth: "Salud Financiera",
    recentTransactions: "Transacciones Recientes",
    addTransaction: "Añadir Transacción",
    emptyTransactions: "Aún no hay transacciones registradas."
  },
  JA: {
    appName: "FZ Savings",
    tabDashboard: "ダッシュボード",
    tabSavings: "貯金目標",
    tabTransactions: "履歴",
    tabStats: "統計",
    tabTools: "機能",
    tabProfile: "プロフィール",
    tabTarget: "目標",
    save: "保存",
    cancel: "キャンセル",
    add: "追加",
    delete: "削除",
    edit: "編集",
    loading: "読み込み中...",
    search: "検索...",
    all: "すべて",
    active: "有効",
    filter: "フィルター",
    settingsTitle: "設定とプロフィール",
    settingsSubtitle: "アカウントのカスタマイズと生体認証セキュリティ",
    userProfileCard: "ユーザープロフィール",
    joinedSince: "登録日",
    changePhoto: "ギャラリーから写真を変更",
    changeUsername: "名前を編集",
    currencyAndDisplay: "通貨とディスプレイ",
    mainCurrency: "基準通貨",
    displayTheme: "表示テーマ",
    lightTheme: "ライト",
    darkTheme: "ダーク",
    systemTheme: "システム",
    languageSetting: "アプリ言語",
    securitySection: "セキュリティとPIN保護",
    biometricSecurity: "生体認証 / FaceID",
    pinSecurity: "6桁のPINコード保護",
    dataBackup: "バックアップ (オフラインファースト)",
    resetAllData: "全データの初期化",
    logoutFirebase: "ログアウト (Firebase)",
    financialOverview: "財務概要",
    totalBalance: "総残高",
    totalIncome: "総収入",
    totalExpense: "総支出",
    financialHealth: "財務の健全性",
    recentTransactions: "最近の取引履歴",
    addTransaction: "取引を追加",
    emptyTransactions: "取引履歴はまだありません。"
  },
  AR: {
    appName: "FZ Savings",
    tabDashboard: "لوحة التحكم",
    tabSavings: "المدخرات",
    tabTransactions: "السجل",
    tabStats: "الإحصائيات",
    tabTools: "الأدوات",
    tabProfile: "الملف الشخصي",
    tabTarget: "الأهداف",
    save: "حفظ",
    cancel: "إلغاء",
    add: "إضافة",
    delete: "حذف",
    edit: "تعديل",
    loading: "جارٍ التحميل...",
    search: "بحث...",
    all: "الكل",
    active: "نشط",
    filter: "تصفية",
    settingsTitle: "الملف الشخصي والإعدادات",
    settingsSubtitle: "تخصيص الحساب والأمان الحيوي",
    userProfileCard: "بطاقة الملف الشخصي",
    joinedSince: "عضو منذ",
    changePhoto: "تغيير الصورة من المعرض",
    changeUsername: "تعديل الاسم",
    currencyAndDisplay: "العملة والعرض",
    mainCurrency: "العملة الرئيسية",
    displayTheme: "مظهر الشاشة",
    lightTheme: "فاتح",
    darkTheme: "داكن",
    systemTheme: "النظام",
    languageSetting: "لغة التطبيق",
    securitySection: "الأمان وحماية PIN",
    biometricSecurity: "الأمان الحيوي / FaceID",
    pinSecurity: "حماية PIN المكون من 6 أرقام",
    dataBackup: "نسخ احتياطي للبيانات (أولاً دون اتصال)",
    resetAllData: "إعادة تعيين جميع البيانات",
    logoutFirebase: "تسجيل الخروج من Firebase",
    financialOverview: "النظرة المالية العامة",
    totalBalance: "إجمالي الرصيد",
    totalIncome: "إجمالي الدخل",
    totalExpense: "إجمالي المصروفات",
    financialHealth: "الصحة المالية",
    recentTransactions: "أحدث المعاملات",
    addTransaction: "إضافة معاملة",
    emptyTransactions: "لا توجد معاملات مسجلة بعد."
  },
  FR: {
    appName: "FZ Savings",
    tabDashboard: "Tableau",
    tabSavings: "Épargne",
    tabTransactions: "Historique",
    tabStats: "Statistiques",
    tabTools: "Outils",
    tabProfile: "Profil",
    tabTarget: "Objectifs",
    save: "Enregistrer",
    cancel: "Annuler",
    add: "Ajouter",
    delete: "Supprimer",
    edit: "Modifier",
    loading: "Chargement...",
    search: "Rechercher...",
    all: "Tout",
    active: "Actif",
    filter: "Filtrer",
    settingsTitle: "Profil & Paramètres",
    settingsSubtitle: "Personnalisation du compte & sécurité biométrique",
    userProfileCard: "Carte de profil de l'utilisateur",
    joinedSince: "Membre depuis",
    changePhoto: "Changer la photo de la galerie",
    changeUsername: "Modifier le pseudo",
    currencyAndDisplay: "Devise & Affichage",
    mainCurrency: "Devise Principale",
    displayTheme: "Thème d'affichage",
    lightTheme: "Clair",
    darkTheme: "Sombre",
    systemTheme: "Système",
    languageSetting: "Langue de l'application",
    securitySection: "Sécurité & Code PIN",
    biometricSecurity: "Sécurité biométrique / FaceID",
    pinSecurity: "Protection par PIN à 6 chiffres",
    dataBackup: "Sauvegarde des données (Offline First)",
    resetAllData: "Réinitialiser toutes les données",
    logoutFirebase: "Déconnexion de Firebase",
    financialOverview: "Aperçu Financier",
    totalBalance: "Solde Total",
    totalIncome: "Revenu Total",
    totalExpense: "Dépenses Totales",
    financialHealth: "Santé Financière",
    recentTransactions: "Transactions Récentes",
    addTransaction: "Ajouter une Transaction",
    emptyTransactions: "Aucune transaction enregistrée."
  },
  DE: {
    appName: "FZ Savings",
    tabDashboard: "Dashboard",
    tabSavings: "Sparen",
    tabTransactions: "Verlauf",
    tabStats: "Statistiken",
    tabTools: "Tools",
    tabProfile: "Profil",
    tabTarget: "Ziele",
    save: "Speichern",
    cancel: "Abbrechen",
    add: "Hinzufügen",
    delete: "Löschen",
    edit: "Bearbeiten",
    loading: "Laden...",
    search: "Suchen...",
    all: "Alle",
    active: "Aktiv",
    filter: "Filtern",
    settingsTitle: "Profil & Einstellungen",
    settingsSubtitle: "Personalisierung & Biometrische Sicherheit",
    userProfileCard: "Benutzerprofilkarte",
    joinedSince: "Mitglied seit",
    changePhoto: "Foto aus Galerie ändern",
    changeUsername: "Benutzername ändern",
    currencyAndDisplay: "Währung & Anzeige",
    mainCurrency: "Hauptwährung",
    displayTheme: "Anzeigemodus",
    lightTheme: "Hell",
    darkTheme: "Dunkel",
    systemTheme: "System",
    languageSetting: "App-Sprache",
    securitySection: "Sicherheit & PIN-Schutz",
    biometricSecurity: "Biometrischer Schutz / FaceID",
    pinSecurity: "6-Stelliger PIN-Schutz",
    dataBackup: "Daten-Backup (Offline zuerst)",
    resetAllData: "Alle App-Daten zurücksetzen",
    logoutFirebase: "Firebase-Sitzung abmelden",
    financialOverview: "Finanzübersicht",
    totalBalance: "Gesamtguthaben",
    totalIncome: "Gesamteinnahmen",
    totalExpense: "Gesamtausgaben",
    financialHealth: "Finanzielle Gesundheit",
    recentTransactions: "Letzte Transaktionen",
    addTransaction: "Transaktion hinzufügen",
    emptyTransactions: "Noch keine Transaktionen erfasst."
  },
  ZH: {
    appName: "FZ Savings",
    tabDashboard: "仪表盘",
    tabSavings: "储蓄",
    tabTransactions: "明细",
    tabStats: "统计",
    tabTools: "功能",
    tabProfile: "我的",
    tabTarget: "目标",
    save: "保存",
    cancel: "取消",
    add: "添加",
    delete: "删除",
    edit: "编辑",
    loading: "加载中...",
    search: "搜索...",
    all: "全部",
    active: "活跃",
    filter: "筛选",
    settingsTitle: "个人中心与设置",
    settingsSubtitle: "账户个性化与生物识别安全保护",
    userProfileCard: "用户卡片",
    joinedSince: "加入时间",
    changePhoto: "从相册更换头像",
    changeUsername: "修改用户名",
    currencyAndDisplay: "货币与显示",
    mainCurrency: "主货币",
    displayTheme: "显示主题",
    lightTheme: "浅色模式",
    darkTheme: "深色模式",
    systemTheme: "系统默认",
    languageSetting: "应用语言",
    securitySection: "安全与PIN码保护",
    biometricSecurity: "指纹/人脸识别安全",
    pinSecurity: "开启6位安全密码",
    dataBackup: "数据备份 (离线优先)",
    resetAllData: "重置所有应用数据",
    logoutFirebase: "退出Firebase登录",
    financialOverview: "财务概览",
    totalBalance: "总余额",
    totalIncome: "总收入",
    totalExpense: "总支出",
    financialHealth: "财务健康度",
    recentTransactions: "最近交易明细",
    addTransaction: "新增收支",
    emptyTransactions: "暂无交易记录。"
  },
  KO: {
    appName: "FZ Savings",
    tabDashboard: "대시보드",
    tabSavings: "저금목표",
    tabTransactions: "거래내역",
    tabStats: "통계분석",
    tabTools: "유용한기능",
    tabProfile: "프로필설정",
    tabTarget: "목표",
    save: "저장하기",
    cancel: "취소",
    add: "추가",
    delete: "삭제",
    edit: "수정",
    loading: "로딩 중...",
    search: "검색...",
    all: "전체",
    active: "활성",
    filter: "필터",
    settingsTitle: "프로필 및 설정",
    settingsSubtitle: "계정 개인화 및 바이오 보안 설정",
    userProfileCard: "사용자 프로필",
    joinedSince: "가입일",
    changePhoto: "갤러리에서 사진 변경",
    changeUsername: "이름 편집",
    currencyAndDisplay: "화폐 및 디스플레이",
    mainCurrency: "기준 화폐",
    displayTheme: "화면 테마",
    lightTheme: "라이트 모드",
    darkTheme: "다크 모드",
    systemTheme: "시스템 기본값",
    languageSetting: "앱 언어 설정",
    securitySection: "보안 및 PIN 번호 보호",
    biometricSecurity: "생체 인식 / FaceID 보안",
    pinSecurity: "6자리 PIN 번호 설정",
    dataBackup: "데이터 백업 (오프라인 우선)",
    resetAllData: "모든 앱 데이터 초기화",
    logoutFirebase: "Firebase 로그아웃",
    financialOverview: "자산 현황 요약",
    totalBalance: "총 잔액",
    totalIncome: "총 수입",
    totalExpense: "총 지출",
    financialHealth: "재정 건강 상태",
    recentTransactions: "최근 거래 내역",
    addTransaction: "거래 내역 추가",
    emptyTransactions: "등록된 거래 내역이 없습니다."
  }
};

export const uiTranslations: Record<string, Record<string, string>> = {
  "Rekening & Tabungan": {
    EN: "Accounts & Savings",
    ES: "Cuentas y Ahorros",
    JA: "口座と貯金",
    ZH: "账户与储蓄",
    KO: "계좌 및 저축",
    FR: "Comptes et Épargne",
    DE: "Konten & Sparen",
    AR: "الحسابات والمدخرات"
  },
  "Kelola sub-rekening & alokasi dana khusus": {
    EN: "Manage sub-accounts & custom allocations",
    ES: "Administrar subcuentas y asignaciones",
    JA: "サブアカウントとカスタム割り当ての管理",
    ZH: "管理子账户和自定义分配",
    KO: "하위 계좌 및 맞춤 배정 관리"
  },
  "Tambah Rekening": {
    EN: "Add Account",
    ES: "Añadir Cuenta",
    JA: "口座を追加",
    ZH: "添加账户",
    KO: "계좌 추가"
  },
  "Total Kas Terakumulasi": {
    EN: "Total Accumulated Cash",
    ES: "Efectivo Acumulado Total",
    JA: "累積キャッシュ合計",
    ZH: "累计总现金",
    KO: "누적 총 자산"
  },
  "Buat Rekening Tabungan Baru": {
    EN: "Create New Savings Account",
    ES: "Crear Nueva Cuenta de Ahorro",
    JA: "新規貯金口座の作成",
    ZH: "创建新储蓄账户",
    KO: "새 저축 계좌 개설"
  },
  "Nama Rekening": {
    EN: "Account Name",
    ES: "Nombre de la Cuenta",
    JA: "口座名",
    ZH: "账户名称",
    KO: "계좌 이름"
  },
  "Contoh: Dana Darurat, Tabungan Rumah": {
    EN: "e.g., Emergency Fund, House Savings",
    ES: "Ej: Fondo de Emergencia, Ahorro para Casa",
    JA: "例：緊急資金、住宅貯金",
    ZH: "例如：紧急基金、购房储蓄",
    KO: "예: 비상금, 주택 저축"
  },
  "Saldo Awal (Rp)": {
    EN: "Initial Balance",
    ES: "Saldo Inicial",
    JA: "初期残高",
    ZH: "初始余额",
    KO: "초기 잔액"
  },
  "Target Nominal (Rp)": {
    EN: "Target Amount",
    ES: "Monto Objetivo",
    JA: "目標金額",
    ZH: "目标金额",
    KO: "목표 금액"
  },
  "Pilih Warna Rekening": {
    EN: "Choose Account Color",
    ES: "Elegir Color de la Cuenta",
    JA: "口座カラーを選択",
    ZH: "选择账户颜色",
    KO: "계좌 색상 선택"
  },
  "Simpan Rekening": {
    EN: "Save Account",
    ES: "Guardar Cuenta",
    JA: "口座を保存",
    ZH: "保存账户",
    KO: "계좌 저장"
  },
  "Batal": {
    EN: "Cancel",
    ES: "Cancelar",
    JA: "キャンセル",
    ZH: "取消",
    KO: "취소"
  },
  "Riwayat Transaksi": {
    EN: "Transaction History",
    ES: "Historial de Transacciones",
    JA: "取引履歴",
    ZH: "交易历史",
    KO: "거래 내역"
  },
  "Pencatatan arus kas & transfer antar rekening": {
    EN: "Cash flow tracking & account transfers",
    ES: "Seguimiento de flujo de caja y transferencias",
    JA: "キャッシュフロー追跡と口座間送金",
    ZH: "现金流跟踪与账户转账",
    KO: "현금 흐름 추적 및 계좌 이체"
  },
  "Pencatatan arus kas & transfer antar rekening...": {
    EN: "Cash flow tracking & account transfers...",
    ES: "Seguimiento de flujo de caja y transferencias...",
    JA: "キャッシュフロー追跡と口座間送金...",
    ZH: "现金流跟踪与账户转账...",
    KO: "현금 흐름 추적 및 계좌 이체..."
  },
  "Tambah Transaksi": {
    EN: "Add Transaction",
    ES: "Añadir Transacción",
    JA: "取引の追加",
    ZH: "添加交易",
    KO: "거래 내역 추가"
  },
  "Semua": {
    EN: "All",
    ES: "Todo",
    JA: "すべて",
    ZH: "全部",
    KO: "전체"
  },
  "Pemasukan": {
    EN: "Income",
    ES: "Ingresos",
    JA: "収入",
    ZH: "收入",
    KO: "수입"
  },
  "Pengeluaran": {
    EN: "Expense",
    ES: "Gastos",
    JA: "支出",
    ZH: "支出",
    KO: "지출"
  },
  "Transfer": {
    EN: "Transfer",
    ES: "Transferencia",
    JA: "振込",
    ZH: "转账",
    KO: "이체"
  },
  "Sampah": {
    EN: "Trash",
    ES: "Papelera",
    JA: "ゴミ箱",
    ZH: "回收站",
    KO: "휴지통"
  },
  "Kalender Kas": {
    EN: "Cash Calendar",
    ES: "Calendario de Caja",
    JA: "キャッシュカレンダー",
    ZH: "现金日历",
    KO: "자산 캘린더"
  },
  "Lihat arus kas masuk & keluar secara harian": {
    EN: "View daily cash inflows and outflows",
    ES: "Ver entradas y salidas diarias de efectivo",
    JA: "毎日のキャッシュイン・アウトを表示",
    ZH: "查看每日现金流入和流出",
    KO: "일일 현금 유입 및 유출 보기"
  },
  "Analisis & Statistik": {
    EN: "Analysis & Statistics",
    ES: "Análisis y Estadísticas",
    JA: "分析と統計",
    ZH: "分析与统计",
    KO: "분석 및 통계"
  },
  "Grafik pengeluaran & distribusi alokasi kas": {
    EN: "Expense charts & cash allocation distribution",
    ES: "Gráficos de gastos y distribución de efectivo",
    JA: "支出グラフとキャッシュ配分",
    ZH: "支出图表与现金分配",
    KO: "지출 차트 및 현금 배분 통계"
  },
  "Perencana Anggaran": {
    EN: "Budget Planner",
    ES: "Planificador de Presupuesto",
    JA: "予算プランナー",
    ZH: "预算规划",
    KO: "예산 계획"
  },
  "Kendalikan pengeluaran dengan batas anggaran bulanan": {
    EN: "Control spending with monthly budget limits",
    ES: "Controlar gastos con límites mensuales",
    JA: "月間予算制限で支出を管理",
    ZH: "通过每月预算限制控制支出",
    KO: "월간 예산 한도로 지출 통제"
  },
  "Wishlist & Target Impian": {
    EN: "Wishlist & Dream Targets",
    ES: "Lista de Deseos y Metas",
    JA: "ウィッシュリストと夢の目標",
    ZH: "愿望清单与梦想目标",
    KO: "위시리스트 및 드림 타겟"
  },
  "Rencanakan pembelian barang impian Anda": {
    EN: "Plan your dream item purchases",
    ES: "Planifica tus compras deseadas",
    JA: "夢の商品の購入計画",
    ZH: "规划您的梦想物品购买",
    KO: "위시리스트 구매 계획 수립"
  },
  "Sinkronisasi Wallet & SMS": {
    EN: "Wallet & SMS Sync",
    ES: "Sincronización de Billetera y SMS",
    JA: "ウォレットとSMS同期",
    ZH: "钱包与短信同步",
    KO: "지갑 및 SMS 동기화"
  },
  "Hubungkan wallet digital & baca SMS transaksi otomatis": {
    EN: "Connect digital wallets & read SMS automatically",
    ES: "Conectar billeteras y leer SMS automáticamente",
    JA: "ウォレット連携とSMS自動読み込み",
    ZH: "连接数字钱包并自动读取短信",
    KO: "디지털 지갑 연결 및 SMS 자동 읽기"
  },
  "Fitur Cerdas Tambahan": {
    EN: "Additional Smart Features",
    ES: "Características Inteligentes Adicionales",
    JA: "追加のスマート機能",
    ZH: "更多智能功能",
    KO: "추가 스마트 기능"
  },
  "Alat pendukung manajemen keuangan mandiri": {
    EN: "Supporting tools for financial management",
    ES: "Herramientas de apoyo financiero",
    JA: "自律的な財務管理のサポートツール",
    ZH: "自主财务管理支持工具",
    KO: "독립적 자산 관리를 위한 보조 도구"
  },
  "Split Bill (Bagi Tagihan)": {
    EN: "Split Bill",
    ES: "Dividir Cuenta",
    JA: "割り勘 (Split Bill)",
    ZH: "AA付款 / 分账",
    KO: "더치페이 (정산)"
  },
  "Pengingat Tagihan & Berulang": {
    EN: "Recurring & Bill Reminders",
    ES: "Recordatorios de Facturas",
    JA: "自動振替と請求書リマインダー",
    ZH: "账单 and 周期提醒",
    KO: "주기적 지출 및 공과금 알림"
  },
  "Pencatat Utang & Piutang": {
    EN: "Debt & Receivable Tracker",
    ES: "Seguimiento de Deudas",
    JA: "借入・貸出管理",
    ZH: "债务与应收款跟踪",
    KO: "빚 및 채권 추적기"
  },
  "Ekspor Laporan": {
    EN: "Export Reports",
    ES: "Exportar Informes",
    JA: "レポートのエクスポート",
    ZH: "导出报告",
    KO: "보고서 내보내기"
  },
  "Cari Transaksi, Akun, atau Target...": {
    EN: "Search transactions, accounts, or goals...",
    ES: "Buscar transacciones, cuentas o metas...",
    JA: "取引、口座、目標を検索...",
    ZH: "搜索交易、账户或目标...",
    KO: "거래, 계좌, 목표 검색..."
  },
  "Bagi Tagihan Cepat": {
    EN: "Quick Bill Splitter",
    ES: "Divisor de Facturas Rápido",
    JA: "クイック割り勘",
    ZH: "快速分账",
    KO: "빠른 더치페이 정산"
  },
  "Bagi pengeluaran bersama teman secara adil & instan": {
    EN: "Split joint expenses with friends fairly & instantly",
    ES: "Divide gastos compartidos de forma justa e instantánea",
    JA: "友達と共同の支出を公平に即座に割り勘",
    ZH: "与朋友公平且即时地分摊共同支出",
    KO: "친구들과 공동 지출을 공정하고 즉시 정산"
  },
  "Tagihan Berulang & Pengingat": {
    EN: "Recurring Bills & Reminders",
    ES: "Facturas Recurrentes y Recordatorios",
    JA: "定期請求とリマインダー",
    ZH: "周期性账单与提醒",
    KO: "주기적 공과금 및 알림"
  },
  "Kelola pengeluaran berulang bulanan & langganan aktif": {
    EN: "Manage recurring monthly expenses & active subscriptions",
    ES: "Administrar gastos recurrentes y suscripciones activas",
    JA: "毎月の定期支出と有効なサブスクの管理",
    ZH: "管理每月周期性支出和活动订阅",
    KO: "월간 반복 지출 및 구독 서비스 관리"
  },
  "Utang & Piutang": {
    EN: "Debt & Receivables",
    ES: "Deudas y Cobros",
    JA: "借入と貸出",
    ZH: "债务与应收款",
    KO: "빌린 돈과 빌려준 돈"
  },
  "Pantau saldo utang ke teman atau piutang yang belum dibayar": {
    EN: "Monitor debt to friends or unpaid receivables",
    ES: "Controla deudas a amigos o cobros pendientes",
    JA: "友達への借入金や未回収の貸出金を追跡",
    ZH: "监控对朋友的债务或未收回应收款",
    KO: "친구에게 빌린 돈 또는 받지 못한 돈 추적"
  },
  "Ekspor Laporan & Cadangan": {
    EN: "Export Reports & Backups",
    ES: "Exportar Informes y Copias",
    JA: "レポートとバックアップのエクスポート",
    ZH: "导出报告与备份",
    KO: "보고서 및 백업 내보내기"
  },
  "Unduh rekaman transaksi dalam format CSV atau file JSON cadangan": {
    EN: "Download transaction records in CSV format or JSON backup files",
    ES: "Descarga transacciones en CSV o copias en JSON",
    JA: "CSV形式の取引記録またはJSONバックアップのダウンロード",
    ZH: "下载CSV格式的交易记录或JSON备份文件",
    KO: "거래 내역 CSV 다운로드 또는 JSON 백업 파일 생성"
  },
  "Fitur Unggulan Pro ⚡": {
    EN: "Featured Pro Tools ⚡",
    ES: "Herramientas Pro Destacadas ⚡",
    JA: "プロの機能 ⚡",
    ZH: "专业特色功能 ⚡",
    KO: "프로 프리미엄 기능 ⚡"
  },
  "5 alat finansial canggih untuk mengoptimalkan kekayaan Anda": {
    EN: "5 advanced financial tools to optimize your wealth",
    ES: "5 herramientas financieras avanzadas para optimizar tu riqueza",
    JA: "資産を最適化する5つの高度な財務ツール",
    ZH: "5个先进的财务工具来优化您的财富",
    KO: "자산 관리를 최적화하기 위한 5가지 고급 금융 도구"
  },
  "AI Financial Advisor": {
    EN: "AI Financial Advisor",
    ES: "Asesor Financiero de IA",
    JA: "AI財務アドバイザー",
    ZH: "AI财务顾问",
    KO: "AI 자산 관리 조언가"
  },
  "Audit kesehatan keuangan, skor 0-100 & rekomendasi Gemini AI": {
    EN: "Financial health audit, 0-100 score & Gemini AI recommendations",
    ES: "Auditoría de salud financiera, puntuación 0-100 y recomendaciones de IA",
    JA: "財務健康診断、0〜100のスコア、Gemini AIの推奨事項",
    ZH: "财务健康审计、0-100评分和Gemini AI建议",
    KO: "재정 건강 상태 진단, 0-100 점수 및 Gemini AI 권장안"
  },
  "Auto-Save & Tagihan": {
    EN: "Auto-Save & Bills",
    ES: "Ahorro Automático y Facturas",
    JA: "自動保存と請求書",
    ZH: "自动保存与账单",
    KO: "자동 저축 및 공과금"
  },
  "Jadwalkan transfer rutin & pembayaran tagihan otomatis": {
    EN: "Schedule regular transfers & automatic bill payments",
    ES: "Programa transferencias regulares y pagos automáticos",
    JA: "定期的な振込と自動引き落としのスケジュール",
    ZH: "安排定期转账和自动账单支付",
    KO: "정기 이체 및 공과금 자동 납부 예약"
  },
  "Hutang & Piutang": {
    EN: "Debt & Receivables",
    ES: "Deudas y Cobros",
    JA: "借入と貸出",
    ZH: "债务与应收款",
    KO: "빌린 돈과 빌려준 돈"
  },
  "Pantau uang yang dipinjamkan dan jatuh tempo rekan": {
    EN: "Monitor money lent and friend due dates",
    ES: "Controla dinero prestado y fechas de vencimiento de amigos",
    JA: "貸し出したお金と友人の返済期日を追跡",
    ZH: "监控借出的资金 and 朋友的还款截止日期",
    KO: "빌려준 돈 및 친구와의 정산 기일 추적"
  },
  "Ekspor Laporan PDF/CSV": {
    EN: "Export PDF/CSV Reports",
    ES: "Exportar Informes PDF/CSV",
    JA: "PDF/CSVレポートのエクスポート",
    ZH: "导出PDF/CSV报告",
    KO: "PDF/CSV 보고서 내보내기"
  },
  "Unduh laporan resmi ringkasan aset & mutasi arus kas": {
    EN: "Download official asset summaries & cash flow mutations",
    ES: "Descarga resúmenes de activos oficiales y variaciones de efectivo",
    JA: "公式な資産サマリーとキャッシュフローの変動履歴をダウンロード",
    ZH: "下载官方资产摘要和现金流变动记录",
    KO: "공식 자산 요약 및 현금 흐름 변동 내역서 다운로드"
  },
  "Kalkulator Split Bill": {
    EN: "Split Bill Calculator",
    ES: "Calculadora de Dividir Cuentas",
    JA: "割り勘電卓",
    ZH: "分账计算器",
    KO: "더치페이 계산기"
  },
  "Bagi rata tagihan makanan & patungan bersama teman": {
    EN: "Split food bills and share joint costs with friends",
    ES: "Divide facturas de comida y comparte costos con amigos",
    JA: "食事代を割り勘し、友達と共同でコストを分担",
    ZH: "分摊餐费并与朋友共同分担费用",
    KO: "식사 비용을 공평하게 분할하고 친구들과 공동 정산"
  },
  "AI Powered": {
    EN: "AI Powered",
    ES: "Con IA",
    JA: "AI搭載",
    ZH: "AI驱动",
    KO: "AI 탑재"
  },
  "Otomatis": {
    EN: "Automatic",
    ES: "Automático",
    JA: "自動",
    ZH: "自动",
    KO: "자동화"
  },
  "Praktis": {
    EN: "Practical",
    ES: "Práctico",
    JA: "実用的",
    ZH: "实用",
    KO: "실용적"
  },
  "Dokumen": {
    EN: "Document",
    ES: "Documento",
    JA: "書類",
    ZH: "文档",
    KO: "문서"
  },
  "Grup": {
    EN: "Group",
    ES: "Grupo",
    JA: "グループ",
    ZH: "群组",
    KO: "그룹"
  },
  "Cari transaksi berdasarkan judul atau catatan...": {
    EN: "Search transactions by title or notes...",
    ES: "Buscar transacciones por título o notas...",
    JA: "取引のタイトルまたはメモで検索...",
    ZH: "根据标题或备注搜索交易...",
    KO: "제목 또는 메모로 거래 내역 검색..."
  },
  "Catat Transaksi Baru": {
    EN: "Record New Transaction",
    ES: "Registrar Nueva Transacción",
    JA: "新しい取引を記録",
    ZH: "记录新交易",
    KO: "새로운 거래 내역 기록"
  },
  "Pencatatan keuangan real-time": {
    EN: "Real-time financial tracking",
    ES: "Seguimiento financiero en tiempo real",
    JA: "リアルタイム財務追跡",
    ZH: "实时财务记录",
    KO: "실시간 재정 모니터링"
  },
  "Keluar": {
    EN: "Expense",
    ES: "Gastos",
    JA: "支出",
    ZH: "支出",
    KO: "지출"
  },
  "Masuk": {
    EN: "Income",
    ES: "Ingresos",
    JA: "収入",
    ZH: "收入",
    KO: "수입"
  },
  "Nominal": {
    EN: "Amount",
    ES: "Monto",
    JA: "金額",
    ZH: "金额",
    KO: "금액"
  },
  "Nominal ({currency})": {
    EN: "Amount ({currency})",
    ES: "Monto ({currency})",
    JA: "金額 ({currency})",
    ZH: "金额 ({currency})",
    KO: "금액 ({currency})"
  },
  "Judul Transaksi": {
    EN: "Transaction Title",
    ES: "Título de la Transacción",
    JA: "取引のタイトル",
    ZH: "交易标题",
    KO: "거래 제목"
  },
  "Contoh: Makan Siang, Gaji Bulanan, Bensin": {
    EN: "e.g., Lunch, Monthly Salary, Fuel",
    ES: "Ej: Almuerzo, Salario Mensual, Gasolina",
    JA: "例：昼食、毎月の給与、ガソリン",
    ZH: "例如：午餐、月薪、汽油",
    KO: "예: 점심 식사, 월급, 주유비"
  },
  "Sumber Rekening": {
    EN: "Source Account",
    ES: "Cuenta de Origen",
    JA: "振込元口座",
    ZH: "来源账户",
    KO: "출금 계좌"
  },
  "Rekening Tujuan": {
    EN: "Target Account",
    ES: "Cuenta de Destino",
    JA: "振込先口座",
    ZH: "目标账户",
    KO: "입금 계좌"
  },
  "Kategori": {
    EN: "Category",
    ES: "Categoría",
    JA: "カテゴリー",
    ZH: "分类",
    KO: "카테고리"
  },
  "Simpan Transaksi": {
    EN: "Save Transaction",
    ES: "Guardar Transacción",
    JA: "取引を保存",
    ZH: "保存交易",
    KO: "거래 저장"
  },
  "Tong Sampah": {
    EN: "Trash Bin",
    ES: "Papelera de Reciclaje",
    JA: "ゴミ箱",
    ZH: "回收站",
    KO: "휴지통"
  },
  "Tong sampah kosong.": {
    EN: "Trash is empty.",
    ES: "La papelera está vacía.",
    JA: "ゴミ箱は空です。",
    ZH: "回收站为空。",
    KO: "휴지통이 비어 있습니다."
  },
  "Tidak ada transaksi ditemukan.": {
    EN: "No transactions found.",
    ES: "No se encontraron transacciones.",
    JA: "取引が見つかりませんでした。",
    ZH: "未找到任何交易记录。",
    KO: "거래 내역이 없습니다."
  },
  "Hapus Transaksi": {
    EN: "Delete Transaction",
    ES: "Eliminar Transacción",
    JA: "取引を削除",
    ZH: "删除交易",
    KO: "거래 내역 삭제"
  },
  "Pulihkan Transaksi": {
    EN: "Restore Transaction",
    ES: "Restaurar Transacción",
    JA: "取引を復원",
    ZH: "还原交易",
    KO: "거래 내역 복원"
  },
  "Kalender Keuangan": {
    EN: "Financial Calendar",
    ES: "Calendario Financiero",
    JA: "財務カレンダー",
    ZH: "财务日历",
    KO: "재정 캘린der"
  },
  "Pantau catatan transaksi berdasarkan tanggal": {
    EN: "Monitor transaction records by date",
    ES: "Monitorear registros de transacciones por fecha",
    JA: "日付ごとに取引記録を追跡します",
    ZH: "按日期监控交易记录",
    KO: "날짜별 거래 내역 모니터링"
  },
  "Agustus 2026": {
    EN: "August 2026",
    ES: "Agosto 2026",
    JA: "2026年8月",
    ZH: "2026年8月",
    KO: "2026년 8월"
  },
  "Min": {
    EN: "Sun",
    ES: "Dom",
    JA: "日",
    ZH: "日",
    KO: "일"
  },
  "Sen": {
    EN: "Mon",
    ES: "Lun",
    JA: "月",
    ZH: "一",
    KO: "월"
  },
  "Sel": {
    EN: "Tue",
    ES: "Mar",
    JA: "火",
    ZH: "二",
    KO: "화"
  },
  "Rab": {
    EN: "Wed",
    ES: "Mié",
    JA: "水",
    ZH: "三",
    KO: "수"
  },
  "Kam": {
    EN: "Thu",
    ES: "Jue",
    JA: "木",
    ZH: "四",
    KO: "목"
  },
  "Jum": {
    EN: "Fri",
    ES: "Vie",
    JA: "金",
    ZH: "五",
    KO: "금"
  },
  "Sab": {
    EN: "Sat",
    ES: "Sáb",
    JA: "土",
    ZH: "六",
    KO: "토"
  },
  "Detail Tanggal": {
    EN: "Details for Date",
    ES: "Detalles para la Fecha",
    JA: "日付の詳細",
    ZH: "日期详情",
    KO: "날짜 상세"
  },
  "Tidak ada transaksi pada tanggal ini.": {
    EN: "No transactions on this date.",
    ES: "No hay transacciones en esta fecha.",
    JA: "この日付の取引はありません。",
    ZH: "该日期无交易记录。",
    KO: "해당 날짜에 거래 내역이 없습니다."
  },
  "Kas & Rekening": {
    EN: "Cash & Accounts",
    ES: "Efectivo y Cuentas",
    JA: "現金と口座",
    ZH: "现金与账户",
    KO: "현금 및 계좌",
    FR: "Trésorerie et Comptes",
    DE: "Bargeld & Konten",
    AR: "النقد والحسابات"
  },
  "Target Nabung": {
    EN: "Savings Goals",
    ES: "Metas de Ahorro",
    JA: "貯金目標",
    ZH: "储蓄目标",
    KO: "저금 목표",
    FR: "Objectifs d'Épargne",
    DE: "Sparziele",
    AR: "أهداف الادخار"
  },
  "Fokus kumpulkan tabungan & raih target uangmu": {
    EN: "Focus on building savings & reach your cash target",
    ES: "Concéntrese en acumular ahorros y alcance su meta de efectivo",
    JA: "貯金を増やし、目標額を達成することに集中します",
    ZH: "专注于积累储蓄并达到您的现金目标",
    KO: "저축을 늘리고 목표 금액 달성에 집중하세요",
    FR: "Concentrez-vous sur l'accumulation d'épargne et atteignez votre objectif",
    DE: "Fokus auf den Aufbau von Ersparnissen & Erreichen Ihres Sparziels",
    AR: "تركز على زيادة المدخرات وتحقيق هدفك المالي"
  },
  "Tambah Target": {
    EN: "Add Goal",
    ES: "Añadir Meta",
    JA: "目標を追加",
    ZH: "添加目标",
    KO: "목표 추가",
    FR: "Ajouter un Objectif",
    DE: "Ziel hinzufügen",
    AR: "إضافة هدف"
  },
  "Total Progres Nabung": {
    EN: "Total Savings Progress",
    ES: "Progreso Total de Ahorro",
    JA: "総貯金進捗状況",
    ZH: "总储蓄进度",
    KO: "총 저축 진행 상황",
    FR: "Progression Totale de l'Épargne",
    DE: "Gesamter Sparfortschritt",
    AR: "إجمالي التقدم في الادخار"
  },
  "Target Tercapai": {
    EN: "Goal Achieved",
    ES: "Meta Alcanzada",
    JA: "目標達成",
    ZH: "目标已达成",
    KO: "목표 달성",
    FR: "Objectif Atteint",
    DE: "Ziel erreicht",
    AR: "تم تحقيق الهدف"
  },
  "Buat Target Nabung Baru": {
    EN: "Create New Savings Goal",
    ES: "Crear Nueva Meta de Ahorro",
    JA: "新しい貯金目標を作成する",
    ZH: "创建新储蓄目标",
    KO: "새로운 저금 목표 설정",
    FR: "Créer un Nouvel Objectif d'Épargne",
    DE: "Neues Sparziel erstellen",
    AR: "إنشاء هدف ادخار جديد"
  },
  "Nama Target Tabungan": {
    EN: "Savings Goal Name",
    ES: "Nombre de la Meta",
    JA: "貯金目標名",
    ZH: "储蓄目标名称",
    KO: "저금 목표 이름",
    FR: "Nom de l'Objectif d'Épargne",
    DE: "Name des Sparziels",
    AR: "اسم هدف الادخار"
  },
  "Contoh: Tabungan Liburan, Uang Pangkal, Laptop": {
    EN: "e.g., Vacation Savings, Down Payment, Laptop",
    ES: "Ej: Ahorro para Vacaciones, Enganche, Laptop",
    JA: "例：旅行貯金、頭金、パソコン",
    ZH: "例如：假期储蓄、首付款、电脑",
    KO: "예: 휴가 저축, 보증금, 노트북",
    FR: "ex. Épargne Vacances, Apport, Ordinateur",
    DE: "z.B. Urlaubskasse, Anzahlung, Laptop",
    AR: "مثال: مدخرات الإجازة، الدفعة الأولى، لابتوب"
  },
  "Simpan Target": {
    EN: "Save Goal",
    ES: "Guardar Meta",
    JA: "目標を保存",
    ZH: "保存目标",
    KO: "목표 저장",
    FR: "Enregistrer l'Objectif",
    DE: "Ziel speichern",
    AR: "حفظ الهدف"
  },
  "Setor Uang ke": {
    EN: "Deposit Money to",
    ES: "Depositar Dinero en",
    JA: "にお金を入金する",
    ZH: "存入资金到",
    KO: "에 돈 저금하기",
    FR: "Déposer de l'Argent sur",
    DE: "Geld einzahlen auf",
    AR: "إيداع الأموال في"
  },
  "Tutup": {
    EN: "Close",
    ES: "Cerrar",
    JA: "閉じる",
    ZH: "关闭",
    KO: "닫기",
    FR: "Fermer",
    DE: "Schließen",
    AR: "إغلاق"
  },
  "Nominal Setoran (Rp)": {
    EN: "Deposit Amount",
    ES: "Monto de Depósito",
    JA: "入金額",
    ZH: "存入金额",
    KO: "저금액",
    FR: "Montant du Dépôt",
    DE: "Einzahlungsbetrag",
    AR: "مبلغ الإيداع"
  },
  "Konfirmasi Setor": {
    EN: "Confirm Deposit",
    ES: "Confirmar Depósito",
    JA: "入金を確認",
    ZH: "确认存入",
    KO: "저금 확인",
    FR: "Confirmer le Dépôt",
    DE: "Einzahlung bestätigen",
    AR: "تأكيد الإيداع"
  },
  "Belum ada target nabung": {
    EN: "No savings goals yet",
    ES: "Aún no hay metas de ahorro",
    JA: "貯金目標がまだありません",
    ZH: "暂无储蓄目标",
    KO: "설정된 저금 목표가 없습니다",
    FR: "Pas encore d'objectifs d'épargne",
    DE: "Noch keine Sparziele vorhanden",
    AR: "لا توجد أهداف ادخار بعد"
  },
  "Klik tombol \"+ Tambah Target\" untuk memulai impian baru.": {
    EN: "Click the \"+ Add Goal\" button to start a new dream.",
    ES: "Haga clic en el botón \"+ Añadir Meta\" para comenzar un nuevo sueño.",
    JA: "「+ 目標を追加」ボタンをクリックして、新しい夢を始めましょう。",
    ZH: "点击 \"+ 添加目标\" 按钮开启全新梦想。",
    KO: "새로운 꿈을 시작하려면 \"+ 목표 추가\" 버튼을 누르세요.",
    FR: "Cliquez sur le bouton \"+ Ajouter un Objectif\" pour commencer un nouveau rêve.",
    DE: "Klicken Sie auf den Button \"+ Ziel hinzufügen\", um einen neuen Traum zu starten.",
    AR: "انقر فوق الزر \"+ إضافة هدف\" لبدء حلم جديد."
  },
  "TARGET TERCAPAI! 🎉": {
    EN: "GOAL ACHIEVED! 🎉",
    ES: "¡META ALCANZADA! 🎉",
    JA: "目標達成！ 🎉",
    ZH: "目标已达成！ 🎉",
    KO: "목표 달성! 🎉",
    FR: "OBJECTIF ATTEINT ! 🎉",
    DE: "ZIEL ERREICHT! 🎉",
    AR: "تم تحقيق الهدف! 🎉"
  },
  "Progres Terkumpul": {
    EN: "Saved Progress",
    ES: "Progreso Acumulado",
    JA: "貯蓄進捗状況",
    ZH: "储蓄进度",
    KO: "저축 진행 상황",
    FR: "Progression Épargnée",
    DE: "Sparfortschritt",
    AR: "التقدم المحرز"
  },
  "Terkumpul:": {
    EN: "Saved:",
    ES: "Acumulado:",
    JA: "貯蓄額:",
    ZH: "已储蓄:",
    KO: "모인 금액:",
    FR: "Épargné :",
    DE: "Gespart:",
    AR: "المجمع:"
  },
  "Target:": {
    EN: "Target:",
    ES: "Objetivo:",
    JA: "目標:",
    ZH: "目标:",
    KO: "목표:",
    FR: "Cible :",
    DE: "Ziel:",
    AR: "الهدف:"
  },
  "Statistik & Analisis": {
    EN: "Statistics & Analysis",
    ES: "Estadísticas y Análisis",
    JA: "統計と分析",
    ZH: "统计与分析",
    KO: "통계 및 분석",
    FR: "Statistiques et Analyses",
    DE: "Statistiken & Analysen",
    AR: "الإحصاءات والتحليل"
  },
  "Visualisasi arus kas & pola pengeluaran": {
    EN: "Visualization of cash flow & spending patterns",
    ES: "Visualización del flujo de caja y patrones de gasto",
    JA: "キャッシュフローと支出パターンの可視化",
    ZH: "现金流与消费模式可视化",
    KO: "현금 흐름 및 지출 패턴 시각화",
    FR: "Visualisation des flux de trésorerie et des d'épargnes",
    DE: "Visualisierung von Cashflow & Konsumverhalten",
    AR: "رسم بياني للتدفقات النقدية وأنماط الإنفاق"
  },
  "Arus kas Anda berada pada kondisi sangat sehat dengan rasio tabungan di atas 30%.": {
    EN: "Your cash flow is in a very healthy state with a savings ratio above 30%.",
    ES: "Su flujo de caja está en un estado muy saludable con una tasa de ahorro superior al 30%.",
    JA: "貯蓄率が30％を超えており、キャッシュフローは非常に健全な状態です。",
    ZH: "您的现金流处于非常健康的状态，储蓄率在30%以上。",
    KO: "저축률이 30%를 초과하여 현금 흐름이 매우 건강한 상태입니다.",
    FR: "Votre flux de trésorerie est très sain avec un taux d'épargne supérieur à 30%.",
    DE: "Ihr Cashflow ist in einem sehr gesunden Zustand mit einer Sparquote von über 30%.",
    AR: "التدفق النقدي لديك في حالة صحية للغاية مع نسبة ادخار تزيد عن 30%."
  },
  "Arus Kas Bulanan": {
    EN: "Monthly Cash Flow",
    ES: "Flujo de Caja Mensual",
    JA: "月次キャッシュフロー",
    ZH: "月度现金流",
    KO: "월간 현금 흐름",
    FR: "Flux de Trésorerie Mensuel",
    DE: "Monatlicher Cashflow",
    AR: "التدفق الندقي الشهري"
  },
  "Distribusi Pengeluaran": {
    EN: "Expense Distribution",
    ES: "Distribución de Gastos",
    JA: "支出の内訳",
    ZH: "支出分布",
    KO: "지출 분포",
    FR: "Distribution des Dépenses",
    DE: "Ausgabenverteilung",
    AR: "توزيع المصروفات"
  },
  "Saran Hemat AI FZ Savings": {
    EN: "FZ Savings AI Saving Advice",
    ES: "Consejo de Ahorro de IA de FZ Savings",
    JA: "FZ Savings AI 節約のアドバイス",
    ZH: "FZ Savings AI 储蓄建议",
    KO: "FZ Savings AI 저축 조언",
    FR: "Conseil d'Épargne IA de FZ Savings",
    DE: "FZ Savings KI-Spartipp",
    AR: "نصيحة الادخار الذكية من FZ Savings"
  },
  "Pengeluaran untuk kategori Makan & Minum merupakan yang terbesar bulan ini. Jika dialokasikan 15% lebih hemat, Anda bisa mempercepat pencapaian target tabungan Anda hingga 2 minggu lebih awal.": {
    EN: "Spending in the Food & Drink category is the largest this month. If you allocate 15% more savings, you can accelerate your savings goal by up to 2 weeks earlier.",
    ES: "El gasto en la categoría Alimentos y Bebidas es el mayor este mes. Si destina un 15% más al ahorro, puede acelerar su meta de ahorro hasta 2 semanas antes.",
    JA: "今月は「飲食」カテゴリーの支出が最大です。もし15％節約できれば、貯金目標の達成を最大2週間早めることができます。",
    ZH: "本月餐饮类支出最大。如果能多节省15%的预算，您的储蓄目标可以提前最多2周实现。",
    KO: "이번 달 '식음료' 카테고리 지출이 가장 큽니다. 15%만 더 저축하면 저금 목표 달성을 최대 2주 앞당길 수 있습니다.",
    FR: "Les d'épargnes dans la catégorie Nourriture & Boisson sont les plus importantes ce mois-ci. En économisant 15% de plus, vous pouvez accélérer votre objectif d'épargne jusqu'à 2 semaines plus tôt.",
    DE: "Die Ausgaben in der Kategorie Essen & Trinken sind diesen Monat am höchsten. Wenn Sie 15% mehr sparen, können Sie Ihr Sparziel bis zu 2 Wochen früher erreichen.",
    AR: "الإنفاق في فئة الطعام والشراب هو الأكبر هذا الشهر. إذا قمت بتوفير 15% إضافية، يمكنك تسريع هدف الادخار الخاص بك بمقدار أسبوعين قبل الموعد المحدد."
  },
  "Kendalikan batas pengeluaran kategori setiap bulan": {
    EN: "Control category spending limits each month",
    ES: "Controle los límites de gasto de categorías cada mes",
    JA: "毎月のカテゴリー別支出制限をコントロールします",
    ZH: "控制每月各分类的支出上限",
    KO: "매월 카테고리별 지출 한도를 제어하세요",
    FR: "Contrôlez les limites de dépenses par catégorie chaque mois",
    DE: "Monatliche Ausgabenlimits pro Kategorie kontrollieren",
    AR: "التحكم في حدود الإنفاق للفئات كل شهر"
  },
  "Atur Anggaran": {
    EN: "Set Budget",
    ES: "Definir Presupuesto",
    JA: "予算を設定",
    ZH: "设置预算",
    KO: "예산 설정",
    FR: "Définir le Budget",
    DE: "Budget festlegen",
    AR: "تعيين الميزانية"
  },
  "Set Batas Anggaran Kategori": {
    EN: "Set Category Budget Limit",
    ES: "Definir Límite de Presupuesto de Categoría",
    JA: "カテゴリー別の予算制限を設定する",
    ZH: "设置分类预算上限",
    KO: "카테고리별 예산 한도 설정",
    FR: "Définir la Limite Budgétaire de la Catégorie",
    DE: "Ausgabenlimit pro Kategorie festlegen",
    AR: "تعيين حد ميزانية الفئة"
  },
  "Kategori Pengeluaran": {
    EN: "Expense Category",
    ES: "Categoría de Gasto",
    JA: "支出カテゴリー",
    ZH: "支出分类",
    KO: "지출 카테고리",
    FR: "Catégorie de Dépense",
    DE: "Ausgabenkategorie",
    AR: "فئة المصروفات"
  },
  "Simpan Batas": {
    EN: "Save Limit",
    ES: "Guardar Límite",
    JA: "制限を保存",
    ZH: "保存限制",
    KO: "한도 저장",
    FR: "Enregistrer la Limite",
    DE: "Limit speichern",
    AR: "حفظ الحد"
  },
  "Batas Bulanan": {
    EN: "Monthly Limit",
    ES: "Límite Mensual",
    JA: "月間制限",
    ZH: "每月限额",
    KO: "월간 한도",
    FR: "Limite Mensuelle",
    DE: "Monatliches Limit",
    AR: "الحد الشهري"
  },
  "Terpakai": {
    EN: "Spent",
    ES: "Gastado",
    JA: "支出済",
    ZH: "已用",
    KO: "사용액",
    FR: "Dépensé",
    DE: "Ausgegeben",
    AR: "المستهلك"
  },
  "Tersisa": {
    EN: "Remaining",
    ES: "Restante",
    JA: "残り",
    ZH: "剩余",
    KO: "남은 금액",
    FR: "Restant",
    DE: "Verbleibend",
    AR: "المتبقي"
  },
  "Anggaran Terlampaui!": {
    EN: "Budget Exceeded!",
    ES: "¡Presupuesto Excedido!",
    JA: "予算超過！",
    ZH: "超出预算！",
    KO: "예산 초과!",
    FR: "Budget Dépassé !",
    DE: "Budget überschritten!",
    AR: "تجاوزت الميزانية!"
  },
  "Sangat Aman": {
    EN: "Very Safe",
    ES: "Muy Seguro",
    JA: "安全圏",
    ZH: "非常安全",
    KO: "안전함",
    FR: "Très Sûr",
    DE: "Sehr sicher",
    AR: "آمن جداً"
  },
  "Mendekati Batas": {
    EN: "Near Limit",
    ES: "Cerca del Límite",
    JA: "上限間近",
    ZH: "接近上限",
    KO: "한도 임박",
    FR: "Proche de la Limite",
    DE: "Nahe am Limit",
    AR: "قريب من الحد"
  },
  "Nama Tagihan": {
    EN: "Bill Name",
    ES: "Nombre de la Factura",
    JA: "請求書名",
    ZH: "账单名称",
    KO: "청구 이름",
    FR: "Nom de la Facture",
    DE: "Rechnungsname",
    AR: "اسم الفاتورة"
  },
  "Total Tagihan (Rp)": {
    EN: "Total Bill Amount",
    ES: "Monto Total de la Factura",
    JA: "請求合計金額",
    ZH: "总账单金额",
    KO: "총 청구 금액",
    FR: "Montant Total de la Facture",
    DE: "Gesamtrechnungsbetrag",
    AR: "إجمالي الفاتورة"
  },
  "Daftar Teman Patungan": {
    EN: "Participants List",
    ES: "Lista de Participantes",
    JA: "参加者リスト",
    ZH: "参与分摊人员名单",
    KO: "정산 참가자 목록",
    FR: "Liste des Participants",
    DE: "Teilnehmerliste",
    AR: "قائمة المشاركين"
  },
  "Tambah Teman": {
    EN: "Add Friend",
    ES: "Añadir Amigo",
    JA: "友達を追加",
    ZH: "添加好友",
    KO: "친구 추가",
    FR: "Ajouter un Ami",
    DE: "Freund hinzufügen",
    AR: "إضافة صديق"
  },
  "Hasil Pembagian Tagihan": {
    EN: "Bill Split Results",
    ES: "Resultados de División de Factura",
    JA: "割り勘結果",
    ZH: "分账结果",
    KO: "더치페이 정산 결과",
    FR: "Résultats de la Répartition",
    DE: "Aufteilungsergebnisse",
    AR: "نتائج تقسيم الفاتورة"
  },
  "Rata-rata Per Orang": {
    EN: "Average Per Person",
    ES: "Promedio Por Persona",
    JA: "一人当たりの平均額",
    ZH: "人均费用",
    KO: "1인당 평균액",
    FR: "Moyenne Par Personne",
    DE: "Durchschnitt pro Person",
    AR: "المعدل لكل شخص"
  },
  "Total Piutang (Orang Utang Ke Kita)": {
    EN: "Total Receivables (Others Owe Us)",
    ES: "Cobros Totales (Nos Deben)",
    JA: "未回収合計 (他人が自分に借りている分)",
    ZH: "应收款总额 (他人欠我)",
    KO: "받을 돈 총액 (타인이 나에게 진 빚)",
    FR: "Créances Totales (On nous doit)",
    DE: "Gesamtforderungen (Andere schulden uns)",
    AR: "إجمالي المستحقات (آخرون يدينون لنا)"
  },
  "Total Hutang (Kita Utang Ke Orang)": {
    EN: "Total Debt (We Owe Others)",
    ES: "Deudas Totales (Debemos)",
    JA: "借入合計 (自分が他人に借りている分)",
    ZH: "债务总额 (我欠他人)",
    KO: "갚을 돈 총액 (내가 타인에게 진 빚)",
    FR: "Dettes Totales (Nous devons)",
    DE: "Gesamtschulden (Wir schulden anderen)",
    AR: "إجمالي الديون (نحن ندين لآخرين)"
  },
  "Tambah Utang / Piutang": {
    EN: "Add Debt / Receivable",
    ES: "Añadir Deuda / Cobro",
    JA: "借入・貸出を追加",
    ZH: "新增债务/应收款",
    KO: "빚/채권 추가",
    FR: "Ajouter Dette / Créance",
    DE: "Schuld / Forderung hinzufügen",
    AR: "إضافة دين / مستحق"
  },
  "Nama Rekan": {
    EN: "Friend's Name",
    ES: "Nombre del Amigo",
    JA: "相手の名前",
    ZH: "联系人姓名",
    KO: "상대방 이름",
    FR: "Nom de l'Ami",
    DE: "Name des Freundes",
    AR: "اسم الصديق"
  },
  "Tipe Catatan": {
    EN: "Record Type",
    ES: "Tipo de Registro",
    JA: "記録タイプ",
    ZH: "记录类型",
    KO: "기록 유형",
    FR: "Type d'Enregistrement",
    DE: "Erfassungsart",
    AR: "نوع السجل"
  },
  "Piutang (Dia Ngutang)": {
    EN: "Receivable (They Owe Me)",
    ES: "Cobro (Me Deben)",
    JA: "貸出金 (相手が自分に借りている)",
    ZH: "应收款 (他们欠我)",
    KO: "받을 돈 (상대방이 빌려감)",
    FR: "Créance (On me doit)",
    DE: "Forderung (Andere schulden mir)",
    AR: "مستحق (هم يدينون لي)"
  },
  "Hutang (Saya Ngutang)": {
    EN: "Debt (I Owe Them)",
    ES: "Deuda (Debo)",
    JA: "借入金 (自分が相手に借りている)",
    ZH: "债务 (我欠他们)",
    KO: "갚을 돈 (내가 빌림)",
    FR: "Dette (Je dois)",
    DE: "Schuld (Ich schulde ihnen)",
    AR: "دين (أنا أدين لهم)"
  },
  "Tanggal Jatuh Tempo": {
    EN: "Due Date",
    ES: "Fecha de Vencimiento",
    JA: "返済期日",
    ZH: "截止日期",
    KO: "정산 기일",
    FR: "Date d'Échéance",
    DE: "Fälligkeitsdatum",
    AR: "تاريخ الاستحقاق"
  },
  "Catatan Tambahan": {
    EN: "Additional Notes",
    ES: "Notas Adicionales",
    JA: "追加のメモ",
    ZH: "备注信息",
    KO: "추가 메모",
    FR: "Notes Complémentaires",
    DE: "Zusätzliche Notizen",
    AR: "ملاحظات إضافية"
  },
  "Simpan Catatan": {
    EN: "Save Record",
    ES: "Guardar Registro",
    JA: "記録を保存",
    ZH: "保存记录",
    KO: "기록 저장",
    FR: "Enregistrer le Scribe",
    DE: "Eintrag speichern",
    AR: "حفظ السجل"
  },
  "Daftar Utang & Piutang": {
    EN: "Debt & Receivables List",
    ES: "Lista de Deudas y Cobros",
    JA: "借入・貸出一覧",
    ZH: "债务与应收款列表",
    KO: "빚 및 채권 목록",
    FR: "Liste des Dettes et Créances",
    DE: "Schulden- & Forderungsliste",
    AR: "قائمة الديون والمستحقات"
  },
  "Lunas": {
    EN: "Paid",
    ES: "Pagado",
    JA: "完済",
    ZH: "已结清",
    KO: "상환 완료",
    FR: "Payé",
    DE: "Bezahlt",
    AR: "تم السداد"
  },
  "Belum Lunas": {
    EN: "Unpaid",
    ES: "Pendiente",
    JA: "未返済",
    ZH: "未结清",
    KO: "미상환",
    FR: "Non Payé",
    DE: "Offen",
    AR: "لم يسدد"
  },
  "Pilih Jenis Laporan": {
    EN: "Select Report Type",
    ES: "Seleccionar Tipo de Informe",
    JA: "レポートの種類を選択",
    ZH: "选择报告类型",
    KO: "보고서 유형 선택",
    FR: "Sélectionner le Type de Rapport",
    DE: "Berichtstyp auswählen",
    AR: "حدد نوع التقرير"
  },
  "Laporan Ringkas Aset (Summary)": {
    EN: "Asset Summary Report",
    ES: "Resumen de Activos",
    JA: "資産概要レポート",
    ZH: "资产摘要报告",
    KO: "자산 요약 보고서",
    FR: "Rapport Sommaire des Actifs",
    DE: "Vermögensübersicht (Zusammenfassung)",
    AR: "تقرير ملخص الأصول"
  },
  "Mutasi Seluruh Transaksi (Full)": {
    EN: "Full Transaction Statement",
    ES: "Estado de Transacciones Completo",
    JA: "全取引明細書",
    ZH: "全量交易明细账单",
    KO: "전체 거래 내역서",
    FR: "Relevé Complet des Transactions",
    DE: "Vollständiger Transaktionsauszug",
    AR: "كشف معاملات كامل"
  },
  "Format Ekspor": {
    EN: "Export Format",
    ES: "Formato de Exportación",
    JA: "出力形式",
    ZH: "导出格式",
    KO: "내보내기 형식",
    FR: "Format d'Exportation",
    DE: "Exportformat",
    AR: "صيغة التصدير"
  },
  "Unduh Laporan": {
    EN: "Download Report",
    ES: "Descargar Informe",
    JA: "レポートをダウンロード",
    ZH: "下载报告",
    KO: "보고서 다운로드",
    FR: "Télécharger le Rapport",
    DE: "Bericht herunterladen",
    AR: "تحميل التقرير"
  },
  "Pratinjau Laporan Finansial": {
    EN: "Financial Report Preview",
    ES: "Vista Previa del Informe",
    JA: "財務レポートのプレビュー",
    ZH: "财务报告预览",
    KO: "재무 보고서 미리보기",
    FR: "Aperçu du Rapport Financier",
    DE: "Vorschau des Finanzberichts",
    AR: "معاينة التقرير المالي"
  },
  "Total Tagihan Aktif": {
    EN: "Total Active Bills",
    ES: "Total de Facturas Activas",
    JA: "アクティブな請求合計",
    ZH: "未缴账单总额",
    KO: "활성 공과금 합계",
    FR: "Total des Factures Actives",
    DE: "Aktive Rechnungen gesamt",
    AR: "إجمالي الفواتير النشطة"
  },
  "Atur Tagihan Berulang": {
    EN: "Set Recurring Bill",
    ES: "Configurar Factura Recurrente",
    JA: "定期請求を設定する",
    ZH: "设置周期账单",
    KO: "정기 청구 공과금 설정",
    FR: "Définir la Facture Récurrente",
    DE: "Wiederkehrende Rechnung einrichten",
    AR: "إعداد فاتورة متكررة"
  },
  "Nama Tagihan / Langganan": {
    EN: "Bill / Subscription Name",
    ES: "Nombre de Factura / Suscripción",
    JA: "請求・サブスク名",
    ZH: "账单/订阅名称",
    KO: "요금/구독 명칭",
    FR: "Nom de la Facture / Abonnement",
    DE: "Rechnungs- / Abonnementsname",
    AR: "اسم الفاتورة / الاشتراك"
  },
  "Nominal Tagihan (Rp)": {
    EN: "Bill Amount",
    ES: "Monto de la Factura",
    JA: "請求金額",
    ZH: "账单金额",
    KO: "청구 금액",
    FR: "Montant de la Facture",
    DE: "Rechnungsbetrag",
    AR: "مبلغ الفاتورة"
  },
  "Frekuensi Pembayaran": {
    EN: "Payment Frequency",
    ES: "Frecuencia de Pago",
    JA: "お支払い頻度",
    ZH: "支付周期",
    KO: "납부 주기",
    FR: "Fréquence de Paiement",
    DE: "Zahlungshäufigkeit",
    AR: "تكرار الدفع"
  },
  "Rekening Sumber": {
    EN: "Source Account",
    ES: "Cuenta de Origen",
    JA: "引き落とし口座",
    ZH: "支付账户",
    KO: "출금 계좌",
    FR: "Compte Source",
    DE: "Quellkonto",
    AR: "الحساب المصدر"
  },
  "Simpan Aturan": {
    EN: "Save Rule",
    ES: "Guardar Regla",
    JA: "ルールを保存",
    ZH: "保存规则",
    KO: "규칙 저장",
    FR: "Enregistrer la Règle",
    DE: "Regel speichern",
    AR: "حفظ القاعدة"
  },
  "Harian": {
    EN: "Daily",
    ES: "Diario",
    JA: "毎日",
    ZH: "每日",
    KO: "매일",
    FR: "Quotidien",
    DE: "Täglich",
    AR: "يومي"
  },
  "Mingguan": {
    EN: "Weekly",
    ES: "Semanal",
    JA: "毎週",
    ZH: "每周",
    KO: "매주",
    FR: "Hebdomadaire",
    DE: "Wöchentlich",
    AR: "أسبوعي"
  },
  "Bulanan": {
    EN: "Monthly",
    ES: "Mensual",
    JA: "毎月",
    ZH: "每月",
    KO: "매월",
    FR: "Mensuel",
    DE: "Monatlich",
    AR: "شهري"
  },
  "Belum ada anggaran bulanan diatur.": {
    EN: "No monthly budget configured yet.",
    ES: "Aún no se ha configurado ningún presupuesto mensual.",
    JA: "月間予算はまだ設定されていません。",
    ZH: "暂无配置的每月预算限制。",
    KO: "아직 설정된 월간 예산이 없습니다.",
    FR: "Aucun budget mensuel configuré pour le moment.",
    DE: "Noch kein monatliches Budget eingerichtet.",
    AR: "لم يتم تكوين ميزانية شهرية بعد."
  },
  "Kondisi keuangan luar biasa stabil dengan porsi menabung yang konsisten.": {
    EN: "Financial condition is exceptionally stable with a consistent savings portion.",
    ES: "La condición financiera es excepcionalmente estable con una porción de ahorro constante.",
    JA: "一貫した貯蓄部分により、財務状況は非常に安定しています。",
    ZH: "财务状况异常稳定，储蓄比例保持一致。",
    KO: "일관된 저축 비율로 재정 상태가 매우 안정적입니다.",
    FR: "La situation financière est exceptionnellement stable avec une part d'épargne constante.",
    DE: "Die finanzielle Situation ist außergewöhnlich stabil mit einer konsistenten Sparquote.",
    AR: "الوضع المالي مستقر بشكل استثنائي مع نسبة ادخار ثابتة."
  },
  "Auto-Save & Tagihan Otomatis ⚡": {
    EN: "Auto-Save & Automatic Bills ⚡",
    ES: "Ahorro Automático y Facturas ⚡",
    JA: "自動保存と自動請求 ⚡",
    ZH: "自动保存和自动账单 ⚡",
    KO: "자동 저축 및 공과금 자동화 ⚡",
    FR: "Épargne Auto & Factures Automatiques ⚡",
    DE: "Automatisches Sparen & Rechnungen ⚡",
    AR: "الادخار التلقائي والفواتير التلقائية ⚡"
  },
  "Jadwalkan transfer rutin & pembayaran tagihan tanpa lupa": {
    EN: "Schedule regular transfers & bill payments automatically",
    ES: "Programa transferencias regulares y pagos de facturas automáticamente",
    JA: "定期的な振込と請求書の支払いを自動的にスケジュールします",
    ZH: "自动安排定期转账和账单支付",
    KO: "정기 이체 및 공과금 납부를 자동화하세요",
    FR: "Planifiez des virements réguliers et le paiement de factures automatiquement",
    DE: "Planen Sie regelmäßige Überweisungen und Rechnungszahlungen automatisch",
    AR: "جدولة التحويلات المنتظمة ودفع الفواتير تلقائيًا"
  },
  "Tambah Jadwal": {
    EN: "Add Schedule",
    ES: "Añadir Horario",
    JA: "スケジュールを追加",
    ZH: "添加计划",
    KO: "일정 추가",
    FR: "Ajouter un Calendrier",
    DE: "Zeitplan hinzufügen",
    AR: "إضافة جدول"
  },
  "Buat Aturan Otomatis Baru": {
    EN: "Create New Auto Rule",
    ES: "Crear Nueva Regla Automática",
    JA: "新しい自動ルールを作成する",
    ZH: "创建新自动规则",
    KO: "새로운 자동 규칙 설정",
    FR: "Créer une Nouvelle Règle Automatique",
    DE: "Neue automatische Regel erstellen",
    AR: "إنشاء قاعدة تلقائية جديدة"
  },
  "Nama Aturan / Tagihan": {
    EN: "Rule / Bill Name",
    ES: "Nombre de la Regla / Factura",
    JA: "ルール・請求名",
    ZH: "规则/账单名称",
    KO: "규칙/청구 이름",
    FR: "Nom de la Règle / Facture",
    DE: "Regel- / Rechnungsname",
    AR: "اسم القاعدة / الفاتورة"
  },
  "Contoh: Nabung Rutin / Bayar Wifi": {
    EN: "e.g., Regular Savings / Pay Wifi",
    ES: "Ej: Ahorro Regular / Pagar Wifi",
    JA: "例：定期貯蓄 / Wifiの支払い",
    ZH: "例如：定期储蓄/支付Wifi",
    KO: "예: 정기 저금 / 와이파이 요금",
    FR: "ex. Épargne Régulière / Payer le Wifi",
    DE: "z.B. Regelmäßiges Sparen / Wifi bezahlen",
    AR: "مثال: الادخار المنتظم / دفع الواي فاي"
  },
  "Nominal (Rp)": {
    EN: "Amount",
    ES: "Monto",
    JA: "金額",
    ZH: "金额",
    KO: "금액",
    FR: "Montant",
    DE: "Betrag",
    AR: "المبلغ"
  },
  "Frekuensi": {
    EN: "Frequency",
    ES: "Frecuencia",
    JA: "頻度",
    ZH: "频率",
    KO: "주기",
    FR: "Fréquence",
    DE: "Häufigkeit",
    AR: "التكرار"
  },
  "Simpan Jadwal": {
    EN: "Save Schedule",
    ES: "Guardar Horario",
    JA: "スケジュールを保存",
    ZH: "保存计划",
    KO: "일정 저장",
    FR: "Enregistrer le Calendrier",
    DE: "Zeitplan speichern",
    AR: "حفظ الجدول"
  },
  "Belum ada aturan otomatis yang dibuat.": {
    EN: "No automatic rules created yet.",
    ES: "Aún no se han creado reglas automáticas.",
    JA: "自動ルールはまだ作成されていません。",
    ZH: "尚未创建任何自动规则。",
    KO: "아직 생성된 자동 규칙이 없습니다.",
    FR: "Aucune règle automatique n'a encore été créée.",
    DE: "Noch keine automatischen Regeln erstellt.",
    AR: "لم يتم إنشاء قواعد تلقائية بعد."
  },
  "Bulan": {
    EN: "Month",
    ES: "Mes",
    JA: "月",
    ZH: "月",
    KO: "월",
    FR: "Mois",
    DE: "Monat",
    AR: "شهر"
  },
  "Minggu": {
    EN: "Week",
    ES: "Semana",
    JA: "週",
    ZH: "周",
    KO: "주",
    FR: "Semaine",
    DE: "Woche",
    AR: "أسبوع"
  },
  "Hari": {
    EN: "Day",
    ES: "Día",
    JA: "日",
    ZH: "日",
    KO: "일",
    FR: "Jour",
    DE: "Tag",
    AR: "يوم"
  },
  "Eksekusi berikutnya:": {
    EN: "Next execution:",
    ES: "Siguiente ejecución:",
    JA: "次回実行：",
    ZH: "下次执行：",
    KO: "다음 실행일:",
    FR: "Prochaine exécution :",
    DE: "Nächste Ausführung:",
    AR: "التنفيذ التالي:"
  },
  "Widget Layar Utama HP": {
    EN: "Home Screen Widget",
    ES: "Widget de Pantalla de Inicio",
    JA: "ホーム画面ウィジェット",
    ZH: "主屏幕小部件",
    KO: "홈 화면 위젯",
    FR: "Widget d'Écran d'Accueil",
    DE: "Startbildschirm-Widget",
    AR: "أداة الشاشة الرئيسية"
  },
  "OCR Struk Scanner Cam": {
    EN: "OCR Receipt Scanner Cam",
    ES: "Cámara de Escáner de Recibos OCR",
    JA: "OCRレシートスキャナー",
    ZH: "OCR收据扫描相机",
    KO: "OCR 영수증 스캐너 카메라",
    FR: "Scanner de Reçus OCR",
    DE: "OCR-Belegscanner-Kamera",
    AR: "كاميرا قارئ الفواتير OCR"
  },
  "Mulai Ulang Splash Screen": {
    EN: "Restart Splash Screen",
    ES: "Reiniciar Pantalla de Inicio",
    JA: "スプラッシュ画面の再起動",
    ZH: "重启启动画面",
    KO: "시작 화면 재시작",
    FR: "Redémarrer l'Écran d'Accueil",
    DE: "Begrüßungsbildschirm neu starten",
    AR: "إعادة تشغيل شاشة الترحيب"
  },
  "Cari Data": {
    EN: "Search Data",
    ES: "Buscar Datos",
    JA: "データを検索",
    ZH: "搜索数据",
    KO: "데이터 검색",
    FR: "Rechercher des Données",
    DE: "Daten suchen",
    AR: "بحث البيانات"
  },
  "Notifikasi": {
    EN: "Notifications",
    ES: "Notificaciones",
    JA: "通知",
    ZH: "通知",
    KO: "알림",
    FR: "Notifications",
    DE: "Benachrichtigungen",
    AR: "الإشعارات"
  },
  "Ganti Tema": {
    EN: "Change Theme",
    ES: "Cambiar Tema",
    JA: "テーマを変更",
    ZH: "更改主题",
    KO: "테마 변경",
    FR: "Changer le Thème",
    DE: "Thema ändern",
    AR: "تغيير المظهر"
  },
  "Kunci Layar": {
    EN: "Lock Screen",
    ES: "Bloquear Pantalla",
    JA: "画面을 락",
    ZH: "锁屏",
    KO: "화면 잠금",
    FR: "Verrouiller l'Écran",
    DE: "Bildschirm sperren",
    AR: "قفل الشاشة"
  },
  "Tabungan": {
    EN: "Savings",
    ES: "Ahorros",
    JA: "貯蓄",
    ZH: "储蓄",
    KO: "저축",
    FR: "Épargne",
    DE: "Sparen",
    AR: "المدخرات"
  },
  "Sangat Sehat 🎉": {
    EN: "Excellent Health 🎉",
    ES: "Excelente Salud 🎉",
    JA: "非常に良好 🎉",
    ZH: "非常健康 🎉",
    KO: "매우 건강함 🎉",
    FR: "Excellente Santé 🎉",
    DE: "Hervorragende Gesundheit 🎉",
    AR: "صحة ممتازة 🎉"
  },
  "Sehat & Stabil 👍": {
    EN: "Healthy & Stable 👍",
    ES: "Saludable y Estable 👍",
    JA: "健全で安定 👍",
    ZH: "健康且稳定 👍",
    KO: "건강하고 안정적 👍",
    FR: "Sain et Stable 👍",
    DE: "Gesund & Stabil 👍",
    AR: "صحي ومستقر 👍"
  },
  "Perlu Ditingkatkan 💪": {
    EN: "Needs Improvement 💪",
    ES: "Necesita Mejora 💪",
    JA: "要改善 💪",
    ZH: "需要改进 💪",
    KO: "개선 필요 💪",
    FR: "Besoin d'Amélioration 💪",
    DE: "Verbesserungswürdig 💪",
    AR: "بحاجة لتحسين 💪"
  },
  "Tabungan Kamu": {
    EN: "Your Savings",
    ES: "Tus Ahorros",
    JA: "あなたの貯蓄",
    ZH: "您的储蓄",
    KO: "귀하의 저축",
    FR: "Votre Épargne",
    DE: "Ihre Ersparnisse",
    AR: "مدخراتك"
  },
  "Buat Tabungan": {
    EN: "Create Savings Goal",
    ES: "Crear Meta de Ahorro",
    JA: "貯金目標を作成",
    ZH: "创建储蓄目标",
    KO: "저축 목표 생성",
    FR: "Créer un Objectif d'Épargne",
    DE: "Sparziel erstellen",
    AR: "إنشاء هدف ادخار"
  },
  "Saldo Terkumpul": {
    EN: "Collected Balance",
    ES: "Saldo Acumulado",
    JA: "収集された残高",
    ZH: "已收集余额",
    KO: "수집된 잔액",
    FR: "Solde Collecté",
    DE: "Gesammeltes Guthaben",
    AR: "الرصيد المجمع"
  },
  "Setor ke Tabungan Ini": {
    EN: "Deposit into This Savings",
    ES: "Depositar en este Ahorro",
    JA: "この貯蓄に入金する",
    ZH: "存入此储蓄",
    KO: "이 저축에 입금",
    FR: "Déposer sur cette Épargne",
    DE: "Auf dieses Sparkonto einzahlen",
    AR: "إيداع في هذه المدخرات"
  },
  "Setor Tabungan Cepat": {
    EN: "Quick Savings Deposit",
    ES: "Depósito de Ahorro Rápido",
    JA: "クイック貯金入金",
    ZH: "快速储蓄存款",
    KO: "빠른 저축 입금",
    FR: "Dépôt d'Épargne Rapide",
    DE: "Schnelle Einzahlung auf Sparkonto",
    AR: "إيداع ادخار سريع"
  },
  "Tambah saldo celengan tabungan kamu dengan mudah": {
    EN: "Add balance to your savings piggy bank easily",
    ES: "Agrega saldo a tu alcancía de ahorros fácilmente",
    JA: "貯金箱に残高を簡単に追加できます",
    ZH: "轻松向您的储蓄存钱罐添加余额",
    KO: "저금통에 잔액을 쉽게 추가하세요",
    FR: "Ajoutez facilement du solde à votre tirelire",
    DE: "Fügen Sie Ihrem Sparschwein ganz einfach Guthaben hinzu",
    AR: "أضف رصيدًا إلى حصالتك بسهولة"
  },
  "Setor Sekarang": {
    EN: "Deposit Now",
    ES: "Depositar Ahora",
    JA: "今すぐ入金",
    ZH: "现在存款",
    KO: "지금 입금",
    FR: "Déposer Maintenant",
    DE: "Jetzt einzahlen",
    AR: "إيداع الآن"
  },
  "Nominal Setor Instant:": {
    EN: "Instant Deposit Amount:",
    ES: "Monto de Depósito Instantáneo:",
    JA: "即時入金額：",
    ZH: "即时存款金额：",
    KO: "즉시 입금 금액:",
    FR: "Montant du Dépôt Instantané :",
    DE: "Sofortiger Einzahlungsbetrag:",
    AR: "مبلغ الإيداع الفوري:"
  },
  "Deadline:": {
    EN: "Deadline:",
    ES: "Fecha límite:",
    JA: "期限：",
    ZH: "截止日期:",
    KO: "마감일:",
    FR: "Date limite :",
    DE: "Frist:",
    AR: "الموعد النهائي:"
  },
  "Pantau & setor tabungan langsung dari Widget": {
    EN: "Monitor & deposit savings directly from the Widget",
    ES: "Supervisa y deposita ahorros directamente desde el Widget",
    JA: "ウィジェットから直接貯蓄を監視および預け入れ",
    ZH: "直接从组件监控和存入储蓄",
    KO: "위젯에서 직접 저축을 모니터링하고 예금하세요",
    FR: "Surveillez et déposez de l'épargne directement depuis le Widget",
    DE: "Überwachen und zahlen Sie Ersparnisse direkt über das Widget ein",
    AR: "مراقبة وإيداع المدخرات مباشرة من الأداة"
  },
  "Gaya Tampilan Widget:": {
    EN: "Widget Display Style:",
    ES: "Estilo de Visualización del Widget:",
    JA: "ウィジェットの表示スタイル：",
    ZH: "小部件显示样式：",
    KO: "위젯 표시 스타일:",
    FR: "Style d'Affichage du Widget :",
    DE: "Widget-Anzeigestil:",
    AR: "نمط عرض الأداة:"
  },
  "Total Tabungan": {
    EN: "Total Savings",
    ES: "Ahorros Totales",
    JA: "合計貯蓄",
    ZH: "总储蓄",
    KO: "총 저축액",
    FR: "Épargne Totale",
    DE: "Ersparnisse insgesamt",
    AR: "إجمالي المدخرات"
  },
  "Widget Progres Nabung": {
    EN: "Savings Progress Widget",
    ES: "Widget de Progreso de Ahorro",
    JA: "貯蓄進行状況ウィジェット",
    ZH: "储蓄进度小部件",
    KO: "저축 진행 상황 위젯",
    FR: "Widget de Progression de l'Épargne",
    DE: "Sparfortschritts-Widget",
    AR: "أداة تقدم الادخار"
  },
  "Target Terkumpul": {
    EN: "Saved Target",
    ES: "Meta Guardada",
    JA: "貯蓄目標",
    ZH: "已存目标",
    KO: "저축 목표액",
    FR: "Cible Épargnée",
    DE: "Gespartes Ziel",
    AR: "الهدف المحفوظ"
  },
  "Nabung Rp50rb Direct": {
    EN: "Deposit $50 Direct",
    ES: "Depositar $50 Directo",
    JA: "直接50を貯金する",
    ZH: "直接存入 50",
    KO: "직접 50 입금",
    FR: "Déposer 50 Directement",
    DE: "Direkt 50 einzahlen",
    AR: "إidاع 50 مباشرة"
  },
  "Ringkasan Tabungan HP": {
    EN: "Mobile Savings Summary",
    ES: "Resumen de Ahorros Móviles",
    JA: "モバイル貯蓄の概要",
    ZH: "移动储蓄摘要",
    KO: "모바일 저축 요약",
    FR: "Résumé de l'Épargne Mobile",
    DE: "Mobile Ersparnisübersicht",
    AR: "ملخص الادخار على الهاتف"
  },
  "Terhubung Aplikasi Real-time": {
    EN: "Connected to Real-time App",
    ES: "Conectado a la Aplicación en Tiempo Real",
    JA: "リアルタイムアプリに接続",
    ZH: "连接到实时应用",
    KO: "실시간 앱에 연결됨",
    FR: "Connecté à l'Application en Temps Réel",
    DE: "Mit der Echtzeit-App verbunden",
    AR: "متصل بالتطبيق في الوقت الفعلي"
  },
  "Saldo Gabungan Tabungan": {
    EN: "Combined Savings Balance",
    ES: "Saldo de Ahorros Combinado",
    JA: "合計貯蓄残高",
    ZH: "组合储蓄余额",
    KO: "결합된 저축 잔액",
    FR: "Solde d'Épargne Combiné",
    DE: "Kombiniertes Sparguthaben",
    AR: "رصيد الادخار المشترك"
  },
  "Target Teratas:": {
    EN: "Top Goals:",
    ES: "Metas Principales:",
    JA: "上位の目標：",
    ZH: "首要目标：",
    KO: "주요 목표:",
    FR: "Principaux Objectifs :",
    DE: "Top-Ziele:",
    AR: "أعلى الأهداف:"
  },
  "Cara Tambahkan ke HP (Android & iOS)": {
    EN: "How to Add to Phone (Android & iOS)",
    ES: "Cómo Agregar al Teléfono (Android e iOS)",
    JA: "スマホへの追加方法（Android & iOS）",
    ZH: "如何添加到手机 (Android & iOS)",
    KO: "휴대전화에 추가하는 방법 (Android & iOS)",
    FR: "Comment l'Ajouter au Téléphone (Android & iOS)",
    DE: "So fügen Sie es zum Telefon hinzu (Android & iOS)",
    AR: "كيفية الإضافة إلى الهاتف (Android & iOS)"
  },
  "Tekan lama layar utama HP Anda > pilih \"Widget\" > cari FZ Savings > pilih ukuran widget yang Anda sukai. Widget memperbarui saldo secara real-time.": {
    EN: "Long press your home screen > select \"Widgets\" > search for FZ Savings > select your preferred widget size. The widget updates balances in real-time.",
    ES: "Mantenga presionada la pantalla de inicio > seleccione \"Widgets\" > busque FZ Savings > seleccione el tamaño de widget que prefiera. El widget actualiza los saldos en tiempo real.",
    JA: "ホーム画面を長押し ＞ 「ウィジェット」を選択 ＞ FZ Savingsを検索 ＞ お好みのウィジェットサイズを選択します。ウィジェットは残高をリアルタイムで更新します。",
    ZH: "长按主屏幕 > 选择“小部件” > 搜索 FZ Savings > 选择您喜欢的小部件尺寸。小部件会实时更新余额。",
    KO: "홈 화면을 길게 누르고 > \"위젯\"을 선택 > FZ Savings를 검색 > 원하는 위젯 크기를 선택하십시오. 위젯은 잔액을 실시간으로 업데이트합니다.",
    FR: "Appuyez longuement sur votre écran d'accueil > sélectionnez « Widgets » > recherchez FZ Savings > sélectionnez la taille de widget préférée. Le widget met à jour les soldes en temps réel.",
    DE: "Drücken Sie lange auf Ihren Startbildschirm > wählen Sie „Widgets“ > suchen Sie nach FZ Savings > wählen Sie Ihre bevorzugte Widget-Größe. Das Widget aktualisiert die Guthaben in Echtzeit.",
    AR: "اضغط مع الاستمرار على الشاشة الرئيسية > اختر \"الأدوات\" > ابحث عن FZ Savings > حدد حجم الأداة المفضل لديك. تقوم الأداة بتحديث الأرصدة في الوقت الفعلي."
  },
  "Selesai Pratinjau Widget": {
    EN: "Finish Widget Preview",
    ES: "Finalizar Vista Previa del Widget",
    JA: "ウィジェットのプレビューを終了",
    ZH: "完成小部件预览",
    KO: "위젯 미리보기 완료",
    FR: "Terminer l'Aperçu du Widget",
    DE: "Widget-Vorschau beenden",
    AR: "إنهاء معاينة الأداة"
  },
  "Disinkronkan": {
    EN: "Synced",
    ES: "Sincronizado",
    JA: "同期済み",
    ZH: "已同步",
    KO: "동기화됨",
    FR: "Synchronisé",
    DE: "Synchronisiert",
    AR: "تمت المزامنة"
  },
  "Gaya Navigasi Liquid Glass": {
    EN: "Liquid Glass Navigation Style",
    ES: "Estilo de Navegación de Vidrio Líquido",
    JA: "リキッドガラスナビゲーションスタイル",
    ZH: "液体玻璃导航样式",
    KO: "액체 유리 탐색 스타일",
    FR: "Style de Navigation Verre Liquide",
    DE: "Flüssigglas-Navigationsstil",
    AR: "نمط التنقل الزجاجي السائل"
  },
  "Aktifkan efek visual gel mika premium & transisi cair elastis": {
    EN: "Enable premium mica gel visual effects & elastic liquid transitions",
    ES: "Activar efectos visuales de gel de mica premium y transiciones líquidas elásticas",
    JA: "プレミアムマイカゲル視覚効果と弾性液体遷移を有効にする",
    ZH: "启用高级云母凝胶视觉效果和弹性液体过渡",
    KO: "프리미엄 운모 겔 시각 효과 및 탄성 액체 전환 활성화",
    FR: "Activer les effets visuels de gel de mica premium et les transitions liquides élastiques",
    DE: "Aktivieren Sie Premium-Glimmergel-Visuelleffekte und elastische Flüssigkeitsübergänge",
    AR: "تمكين تأثيرات هلام الميكا المرئية الفاخرة وانتقالات السائل المرنة"
  },
  "Minimalis Klasik (Lebih Ringan)": {
    EN: "Classic Minimalist (Lighter)",
    ES: "Minimalista Clásico (Más Ligero)",
    JA: "クラシックミニマリスト（軽量）",
    ZH: "经典极简 (更轻量)",
    KO: "클래식 미니멀리스트 (가벼움)",
    FR: "Minimaliste Classique (Plus Léger)",
    DE: "Klassischer Minimalismus (Leichter)",
    AR: "كلاسيكي بسيط (أخف)"
  },
  "Menggunakan navigasi bawah flat standar yang simpel & hemat memori": {
    EN: "Uses standard flat bottom navigation that is simple & memory efficient",
    ES: "Usa navegación de fondo plano estándar que es simple y eficiente en memoria",
    JA: "シンプルでメモリ効率の良い標準的なフラットボトムナビゲーションを使用します",
    ZH: "使用简单且节省内存的标准扁平底部导航",
    KO: "간단하고 메모리 효율적인 표준 평면 하단 탐색을 사용합니다",
    FR: "Utilise une navigation inférieure plate standard, simple et économe en mémoire",
    DE: "Verwendet eine standardmäßige flache Bodennavigation, die einfach und speichereffizient ist",
    AR: "يستخدم شريط التنقل السفلي المسطح القياسي البسيط والفعال في استهلاك الذاكرة"
  }
};

export const translateText = (text: string, lang?: string): string => {
  const code = (lang || 'ID').toUpperCase();
  if (code === 'ID') return text;
  
  const translationsForText = uiTranslations[text];
  if (translationsForText) {
    return translationsForText[code] || translationsForText['EN'] || text;
  }
  return text;
};

export const getTranslation = (lang?: string) => {
  const code = (lang || 'ID').toUpperCase();
  const dict = translations[code as AppLanguage] || translations['ID'];
  const fallbackEN = translations['EN'] || dict;
  const fallbackID = translations['ID'] || dict;

  return new Proxy(dict, {
    get(target, prop) {
      if (prop in target) {
        const val = (target as any)[prop];
        if (val !== undefined && val !== null) {
          return val;
        }
      }
      if (prop in fallbackEN) {
        const val = (fallbackEN as any)[prop];
        if (val !== undefined && val !== null) {
          return val;
        }
      }
      return (fallbackID as any)[prop];
    }
  }) as TranslationDictionary & Record<string, string>;
};
