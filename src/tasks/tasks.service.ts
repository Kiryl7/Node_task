import { getAll, getById, delById, update, save, Task } from './tasks.repository'

const getTasks = async (): Promise<Array<Task> | null> => {
  try {
    return await getAll()
  } catch (error) {
    if (error) {
      return error.message
    }
  }
}

const getOneTask = async (id: number): Promise<Task | string> => {
  try {
    const taskResult = await getById(id)
    if (taskResult.length === 0) return `Task with id: ${id} not found`
    return taskResult[0]
  } catch (error) {
    if (error) {
      return error.message
    }
  }
}

const saveTask = async (task: Task): Promise<Task> => {
  try {
    return await save(task)
  } catch (error) {
    if (error) {
      return error.message
    }
  }
}

const delTask = async (id: number): Promise<string | number> => {
  try {
    const validTask = getById(id)
    const task = await delById(id)
    if (!task && !validTask) return `Task with id: ${id} not found`
    return task
  } catch (error) {
    if (error) {
      return error.message
    }
  }
}

const updateTask = async (id: number, task: Task): Promise<Task | string> => {
  try {
    const taskUpd = await update(id, task)
    if (!taskUpd) return `Task with id: ${id} not found`
    return taskUpd
  } catch (error) {
    if (error) {
      return error.message
    }
  }
}

export { getOneTask, saveTask, delTask, updateTask, getTasks }
