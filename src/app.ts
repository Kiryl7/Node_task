import express from 'express'
import { ErrorHandler, handleError } from './helpers/error'
import { tasks as taskRoute } from './tasks/tasks.controller'

export const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/error', () => {
  throw new ErrorHandler(500, 'Internal server error')
})

app.use('/tasks', taskRoute)

app.use((err, req: express.Request, res: express.Response) => {
  handleError(err, res)
})
