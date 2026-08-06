package com.fzsavings.app.domain.model

data class AppSettings(
    val isDarkMode: Boolean = true,
    val isPasscodeEnabled: Boolean = false,
    val currency: String = "IDR",
    val notificationsEnabled: Boolean = true
)
