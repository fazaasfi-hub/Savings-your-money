package com.fzsavings.app.domain.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "wishlists")
data class Wishlist(
    @PrimaryKey val id: String,
    val title: String,
    val price: Double,
    val savedAmount: Double,
    val url: String?,
    val priority: String // "TINGGI", "SEDANG", "RENDAH"
)
