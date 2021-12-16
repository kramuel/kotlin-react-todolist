package com.samuel.kotreact.model

data class TodoTask (
    val id: Int,
    val task: String,
    var done: Boolean,
)