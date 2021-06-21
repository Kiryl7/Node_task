const express = require('express')
const tasks = require('./tasks/tasks.conroller')
const { ErrorHandler, handleError } = require("./helpers/error")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/error', (req, res) => {
    throw new ErrorHandler(500, 'Internal server error');
})

app.use('/tasks', tasks)

app.use((err, req, res, next) => {
    handleError(err, res)
})

module.exports =  app 