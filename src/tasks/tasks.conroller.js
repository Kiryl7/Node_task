const express = require('express')
const validateBody = require('../helpers/validation.body')
const tasks = express.Router()
const { saveTask, getOneTask, delTask, updateTask, getTasks } = require("./tasks.service")
const { ErrorHandler, handleError } = require("../helpers/error")

tasks.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const one = await getOneTask(parseInt(id))
        res.status(200)
        res.send(one)
    } catch (error) {
        throw new ErrorHandler(404, "Error get element.")
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
        const obj = await saveTask(task)
        res.status(201)
        res.send(obj)
    } catch (error) {
        throw new ErrorHandler(404, "Task does't save(")
    }  
})

tasks.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        await delTask(parseInt(id))
        res.status(200)
        res.send("This elem has been deleted, you can't backup his.")
    } catch (error) {
        throw new ErrorHandler(404, "This object cannot been deleted.")
    }
})

tasks.patch('/:id', async (req, res) => {
    const id = req.params.id
    const task = req.body
    try {
        const one = await updateTask(parseInt(id), task)
        res.send(one)
    } catch (error) {
        throw new ErrorHandler(404, "Error data update")
    }
})

module.exports = tasks