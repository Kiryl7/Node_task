import express from 'express'
import { buildResponse } from '../helpers/buildResponce'
import { validateBody } from '../helpers/validation.body'
import { saveTask, getOneTask, delTask, updateTask, getTasks } from './tasks.service'

export const tasks = express.Router()

tasks.get('/:id', async (req: express.Request, res: express.Response) => {
  const id = req.params.id
  const task = await getOneTask(parseInt(id))
  try {
    if(Object.keys(task).length === 0) throw new Error
      buildResponse(task, res)
  } catch (error) {
    res.status(404).send('Task not found.')
  }
})

tasks.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const tasks = await getTasks()
    buildResponse(tasks, res)
  } catch (error) {
    res.status(404).send('Tasks not found.')
  }
})

tasks.post('/', validateBody, async (req: express.Request, res: express.Response) => {
  try {
    const task = req.body
    const savedTask = await saveTask(task)
    if (Object.keys(task).length > 2) throw new Error
    else buildResponse(savedTask, res)
  } catch (error) {
    res.status(404).send("Task doesn't save. Your request has invalid data.")
  }
})

tasks.delete('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id
    const deletedTask = await delTask(parseInt(id))
    if (typeof(deletedTask) !== 'number') throw new Error
    buildResponse(`Object with id: ${id} has been deleted.`, res)
  } catch (error) {
    res.status(404).send('This object cannot been deleted.')  
  }
})

tasks.patch('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id
    const task = req.body
    if (Object.keys(task).length > 2) throw new Error
    const updatedTask = await updateTask(parseInt(id), task)
    buildResponse(updatedTask, res)
  } catch (error) {
    res.status(404).send('This object cannot be updated. You send invalid data.')
  }
})
