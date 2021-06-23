const express = require('express')
const validateBody = require('../helpers/validation.body')
const { saveTask, getOneTask, delTask, updateTask, getTasks } = require("./tasks.service")
const { ErrorHandler } = require("../helpers/error")

const tasks = express.Router()

tasks.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const task = await getOneTask(parseInt(id))
        res.status(200)
        res.json(task)
    } catch (error) {
        throw new ErrorHandler(404, "Task not found")
    }
})

tasks.get('/', async (req, res) => {
    const tasks = await getTasks()
    if (tasks) {
        res.status(200)
        res.json(tasks)
    } else {
        throw new ErrorHandler(404, "Tasks not found.")
    }
})

tasks.post('/', validateBody, async (req, res) => {
    const task = req.body
    try {
        const savedTask = await saveTask(task)
        res.status(201)
        res.send(savedTask)
    } catch (error) {
        throw new ErrorHandler(404, "Task does't save(")
    }  
})

tasks.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        await delTask(parseInt(id))
        res.status(204)
        res.send("Can not delete task")
    } catch (error) {
        throw new ErrorHandler(404, "This object cannot been deleted.")
    }
})

tasks.patch('/:id', async (req, res) => {
    const id = req.params.id
    const task = req.body
    try {
        const updatedTask = await updateTask(parseInt(id), task)
        res.status(200)
        res.json(updatedTask)
    } catch (error) {
        throw new ErrorHandler(404, "Task can not be updated")
    }
})

module.exports = tasks