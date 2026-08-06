package com.fzsavings.app.domain.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "transactions")
data class Transaction(
    @PrimaryKey val id: String,
    val title: String,
    val amount: Double,
    val type: String, // "INCOME", "EXPENSE", "TRANSFER"
    val categoryId: String,
    val accountId: String,
    val targetAccountId: String?,
    val date: String,
    val time: String,
    val notes: String?,
    val isDeleted: Boolean = false,
    val deletedAt: String? = null
)
