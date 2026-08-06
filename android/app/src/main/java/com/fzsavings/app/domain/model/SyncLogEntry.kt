package com.fzsavings.app.domain.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "sync_logs")
data class SyncLogEntry(
    @PrimaryKey val id: String,
    val walletName: String,
    val timestamp: String,
    val status: String, // "SUCCESS", "FAILED"
    val importedCount: Int,
    val duplicateCount: Int,
    val message: String
)
