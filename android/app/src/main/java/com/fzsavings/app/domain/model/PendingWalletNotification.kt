package com.fzsavings.app.domain.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "pending_notifications")
data class PendingWalletNotification(
    @PrimaryKey val id: String,
    val walletName: String,
    val merchant: String,
    val amount: Double,
    val type: String, // "EXPENSE", "INCOME"
    val date: String,
    val time: String,
    val suggestedCategoryId: String,
    val status: String // "PENDING", "ACCEPTED", "REJECTED"
)
