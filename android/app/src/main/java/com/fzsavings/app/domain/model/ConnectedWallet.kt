package com.fzsavings.app.domain.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "connected_wallets")
data class ConnectedWallet(
    @PrimaryKey val id: String,
    val name: String,
    val balance: Double,
    val lastSync: String,
    val type: String, // "BANK_API", "E_WALLET"
    val isNotificationListenerActive: Boolean = true
)
