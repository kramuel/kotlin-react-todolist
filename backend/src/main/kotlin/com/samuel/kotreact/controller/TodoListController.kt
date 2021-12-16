package com.samuel.kotreact.controller

import com.samuel.kotreact.exception.TodoTaskNotFoundException
import com.samuel.kotreact.model.TodoTask
import net.minidev.json.JSONObject
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RequestMapping("/api")
@RestController
class TodoListController {

    private val todoTasks = mutableListOf(
        TodoTask(1, "Köpa häst", false),
        TodoTask(2, "Finns det läsk", true),
        TodoTask(3, "Tomtebloss", false),
        TodoTask(4, "Gunga", false)
    )

    @GetMapping("/todos")
    fun getAllTodoTasks() = todoTasks

    @PostMapping("/todos")
    @ResponseStatus(HttpStatus.CREATED)
    fun newTodoTask(@RequestBody todoTask: TodoTask): ResponseEntity<TodoTask> {
        val maxId = todoTasks.maxOfOrNull { it.id } ?: 0
        val nextId = maxId +1
        val newTodoTask = TodoTask(id = nextId, task = todoTask.task, done = todoTask.done)
        todoTasks.add(newTodoTask)
        return ResponseEntity.ok(newTodoTask)
    }

    @GetMapping("/todos/{id}")
    fun getTodoTaskById(@PathVariable id: Int) : TodoTask {
        val task = todoTasks.firstOrNull { it.id == id }

        return task ?: throw TodoTaskNotFoundException()

    }

    @PutMapping("/todos/{id}")
    fun updateTodoTaskById(@PathVariable id: Int,
                           @RequestBody incTodoTask: TodoTask) : TodoTask {

        val taskToUpdate = todoTasks.firstOrNull {it.id == id }
            ?.copy(id = incTodoTask.id, task = incTodoTask.task, done = incTodoTask.done)

        return taskToUpdate ?: throw TodoTaskNotFoundException()

    }


    @DeleteMapping("/todos/{id}")
    fun deleteTodoTask(@RequestParam id: Int): Unit {

        val toDelete = todoTasks.firstOrNull { it.id == id }
        if (todoTasks.removeIf { toDelete != null } )
            throw TodoTaskNotFoundException()
    }

}