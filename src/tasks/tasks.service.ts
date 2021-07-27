import { ErrorHandler } from '../helpers/error'
import { getAll, getById, delById, update, save, Task } from './tasks.repository'

const getTasks = async (): Promise<Array<Task> | null> => {
  try {
    const tasks = await getAll()
    if(!tasks) throw new Error
    return tasks
  } catch (error) {
      return error
  }
}

const getOneTask = async (id: number): Promise<Task | string> => {
  try {
    const taskResult = await getById(id)
    if (taskResult.length === 0) throw new Error
    return taskResult[0]
  } catch (error) {
    return error
  }
}

const saveTask = async (task: Task): Promise<Task> => {
  try {
    const savedTask = await save(task)
    if(Object.keys(savedTask).length > 3) throw new Error
    return savedTask
  } catch (error) {
      return error
  }
}

const delTask = async (id: number): Promise<number> => {
  try {
    const task = await delById(id)
    if (task <= 0) throw new Error
    return task
  } catch (error) {
      return error
  }
}

const updateTask = async (id: number, task: Task): Promise<Task | string> => {
  try {
    const taskUpd = await update(id, task)
    if (!taskUpd) throw new Error
    return taskUpd
  } catch (error) {
    console.log(`Task with id: ${id} not found`)
      return error
  }
}

export { getOneTask, saveTask, delTask, updateTask, getTasks }
