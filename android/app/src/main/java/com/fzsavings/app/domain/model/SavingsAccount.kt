package com.fzsavings.app.domain.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "savings_accounts")
data class SavingsAccount(
    @PrimaryKey val id: String,
    val name: String,
    val balance: Double,
    val colorHex: String,
    val type: String, // e.g. "UTAMA", "DOMPET", "INVESTASI"
    val accountNumber: String,
    val bankName: String
)
