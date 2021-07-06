import express from 'express'
import { Task } from "../tasks/tasks.repository"

const buildResponse = (task: Task | Task[], res: express.Response) => {
    res.status(200)
    res.json(task)
}

export { buildResponse }