package com.fzsavings.app.domain.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "goals")
data class Goal(
    @PrimaryKey val id: String,
    val title: String,
    val targetAmount: Double,
    val currentAmount: Double,
    val targetDate: String,
    val status: String, // "BERJALAN", "TERCAPAI", "HAMPIR_SELESAI"
    val colorHex: String
)
