import express from 'express'
import { Task } from '../tasks/tasks.repository'

const buildResponse = (result: Task | Task[] | string | number, res: express.Response): void => {
  res.status(200)
  res.json(result)
}

export { buildResponse }
