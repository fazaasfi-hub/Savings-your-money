# FZ Savings — 100% Native Android Application (Jetpack Compose + Kotlin)

A modern, high-performance native Android personal finance & savings tracking application built with **100% Kotlin**, **Jetpack Compose**, **Room Database**, and **MVVM Clean Architecture**.

---

## 📱 Features & Highlights

- **100% Native Android Code** (Zero WebViews inside the native app execution path).
- **Jetpack Compose UI**: Material Design 3, fluid animations, custom charts, dynamic light & dark theme support.
- **Offline First**: Instant Room database persistence for transaction logs, target goals, and user profiles.
- **Clean Architecture**: Standard Android layered layout (`domain`, `data`, `presentation`, `ui`).
- **Interactive Dashboards**: Monthly analytics, income vs. expense tracking, financial target indicators, and CSV export support.

---

## 📁 Source Code Directory Structure

All native Kotlin & Jetpack Compose source files are organized cleanly:

```
android/app/src/main/java/com/fzsavings/app/
├── MainActivity.kt                      # Main Activity & Compose Theme Entry Point
├── data/
│   ├── local/
│   │   ├── SavingsDao.kt               # Room DAO for transactions & target goals
│   │   └── SavingsDatabase.kt          # Room SQLite Database setup
│   └── repository/
│       └── SavingsRepositoryImpl.kt    # Repository implementation with Flow & Coroutines
├── domain/
│   ├── model/
│   │   └── SavingsModels.kt            # Data classes (Transaction, Goal, UserProfile, Stats)
│   └── repository/
│       └── SavingsRepository.kt        # Repository contract interface
├── presentation/
│   └── viewmodel/
│       └── SavingsViewModel.kt         # StateFlow & Coroutines business logic manager
└── ui/
    ├── navigation/
    │   ├── NavRoute.kt                 # Screen route definitions
    │   └── AppNavigation.kt            # NavHost graph controller
    ├── screens/
    │   ├── SplashScreen.kt             # Native animated splash screen
    │   ├── OnboardingScreen.kt         # Welcome slides & intro flow
    │   ├── LoginRegisterScreen.kt      # Native user auth UI
    │   └── DashboardScreen.kt          # Comprehensive finance dashboard, charts, transactions & goals
    └── theme/
        ├── Color.kt                    # Brand palette & color schemes
        ├── Theme.kt                    # Material3 Theme configuration
        └── Type.kt                     # Typography styles
```

---

## 🛠️ How to Build the APK in Android Studio

1. **Clone this repository**:
   ```bash
   git clone <your-github-repo-url>
   ```
2. **Open in Android Studio**:
   - Launch **Android Studio** (Ladybug / Jellyfish / Hedgehog or newer recommended).
   - Select **Open** and select the root directory of this repository (or the `android/` folder).
   - Android Studio will automatically sync the Gradle files and download dependencies.
3. **Build APK**:
   - Go to **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**.
   - Or run in terminal:
     ```bash
     cd android
     ./gradlew assembleDebug
     ```
   - The generated debug APK will be located at:
     `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🔒 Tech Stack Summary

- **Language**: Kotlin 1.9+
- **UI Framework**: Jetpack Compose (Material3)
- **Database**: Room Persistence Library
- **Architecture**: MVVM + Clean Architecture + StateFlow
- **Navigation**: Jetpack Navigation Compose
