import express from 'express'
import { validateBody } from '../helpers/validation.body' 
import { saveTask, getOneTask, delTask, updateTask, getTasks } from "./tasks.service" 
import { ErrorHandler } from "../helpers/error"  
import { buildResponse } from "../helpers/buildResponce"  
import { Task } from "./tasks.repository"

export const tasks = express.Router()

tasks.get('/:id', async (req: express.Request, res: express.Response) => {
    const id = req.params.id
    try {
        const task = await getOneTask(parseInt(id))
        buildResponse(task, res)
    } catch (error) {
        throw new ErrorHandler(404, "Task not found")
    }
})

tasks.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const tasks = await getTasks()
        buildResponse(tasks, res)
    } catch (error11) {
        throw new ErrorHandler(404, "Tasks not found.")
    }
})

tasks.post('/', validateBody, async (req: express.Request, res: express.Response) => {
    const task = req.body
    try {
        const savedTask = await saveTask(task)
        buildResponse(savedTask, res)
    } catch (error) {
        throw new ErrorHandler(404, "Task does't save(")
    }  
})

tasks.delete('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id
        const deletedTask = await delTask(parseInt(id))
        buildResponse(deletedTask, res)
    } catch (error) {
        throw new ErrorHandler(404, "This object cannot been deleted.")
    }
})

tasks.patch('/:id', async (req: express.Request, res: express.Response) => {
    const id = req.params.id
    const task = req.body
    try {
        const updatedTask = await updateTask(parseInt(id), task)
        buildResponse(updatedTask, res)
    } catch (error) {
        throw new ErrorHandler(404, "Task can not be updated")
    }
})

