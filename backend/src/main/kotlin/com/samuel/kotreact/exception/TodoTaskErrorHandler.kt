package com.samuel.kotreact.exception

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import javax.servlet.http.HttpServletRequest

@ControllerAdvice
class TodoTaskErrorHandler {

    @ExceptionHandler(TodoTaskNotFoundException::class)
    fun handleTodoTaskNotFoundException(
        servletRequest: HttpServletRequest,
        exception: Exception
    ): ResponseEntity<String> {
        return ResponseEntity("TodoTask not found", HttpStatus.NOT_FOUND)
    }
}