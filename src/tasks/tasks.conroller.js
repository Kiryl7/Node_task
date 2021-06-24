const express = require('express')
const validateBody = require('../helpers/validation.body')
const { saveTask, getOneTask, delTask, updateTask, getTasks } = require("./tasks.service")
const { ErrorHandler } = require("../helpers/error")
const statusResponce = require("./task.helpers")

const tasks = express.Router()

tasks.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const task = await getOneTask(parseInt(id))
        statusResponce(task, res)
    } catch (error) {
        throw new ErrorHandler(404, "Task not found")
    }
})

tasks.get('/', async (req, res) => {
    try {
        const tasks = await getTasks()
        statusResponce(tasks, res)
    } catch (error11) {
        throw new ErrorHandler(404, "Tasks not found.")
    }
})

tasks.post('/', validateBody, async (req, res) => {
    const task = req.body
    try {
        const savedTask = await saveTask(task)
        statusResponce(savedTask, res)
    } catch (error) {
        throw new ErrorHandler(404, "Task does't save(")
    }  
})

tasks.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedTask = await delTask(parseInt(id))
        statusResponce(deletedTask, res)
    } catch (error) {
        throw new ErrorHandler(404, "This object cannot been deleted.")
    }
})

tasks.patch('/:id', async (req, res) => {
    const id = req.params.id
    const task = req.body
    try {
        const updatedTask = await updateTask(parseInt(id), task)
        statusResponce(updatedTask, res)
    } catch (error) {
        throw new ErrorHandler(404, "Task can not be updated")
    }
})

module.exports = tasks