const express = require('express')
const validateBody = require('../helpers/validation.body')
const tasks = express.Router()
const { save, getOne, del, update, getTasks } = require("./tasks.service")
const { ErrorHandler, handleError } = require("../helpers/error")

tasks.get('/:id', (req, res) => {
    const id = req.params.id
    try {
        const one = getOne(parseInt(id))
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

tasks.post('/', validateBody, (req, res) => {
    const task = req.body
    const obj = save(task)
    res.status(201)
    res.send(obj)
})

tasks.delete('/:id', (req, res) => { //добавить красивые сообщеньки)
    try {
        const id = req.params.id
        const obj = del(parseInt(id))
        res.status(200)
        res.send(obj)
    } catch (error) {
        throw new ErrorHandler(404, "This object cannot been deleted.")
    }
})

tasks.patch('/:id', (req, res) => {
    const id = req.params.id
    const task = req.body
    try {
        const one = update(parseInt(id), task)
        res.send(one)
    } catch (error) {
        throw new ErrorHandler(404, "Error data update")
    }
})

module.exports = tasks