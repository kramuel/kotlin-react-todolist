package com.samuel.kotreact

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class KotReactApplication

fun main(args: Array<String>) {
	runApplication<KotReactApplication>(*args)
}
