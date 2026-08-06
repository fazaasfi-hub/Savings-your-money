package com.fzsavings.app.domain.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "category_budgets")
data class CategoryBudget(
    @PrimaryKey val id: String,
    val categoryId: String,
    val limitAmount: Double,
    val spentAmount: Double,
    val period: String // "BULANAN", "MINGGUAN"
)
