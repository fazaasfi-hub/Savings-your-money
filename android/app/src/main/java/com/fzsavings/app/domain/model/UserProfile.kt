package com.fzsavings.app.domain.model

data class UserProfile(
    val name: String,
    val email: String,
    val avatarUrl: String?,
    val totalSavings: Double
)
