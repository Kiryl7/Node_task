import { getAll, getById, delById, update, save } from "./tasks.repository"
import { Task } from "./tasks.repository"

const getTasks = async (): Promise <Array<Task> | null> => {
    try {
        return await getAll()
    } catch (error) {
        if (error) {
            return error.message
        }
    }
}

const getOneTask = async (id: number): Promise<Array<Task> | null> => {
    try {
        return await getById(id)
    } catch (error) {
        if (error) {
            return error.message
        }
    }
}

const saveTask = async (task: Task): Promise<Task> => {
    try {
        return await save(task)
    } catch(error) {
        if (error) {
            return error.message
        }
    }
}

const delTask = async (id: number): Promise<Task> => {
    try {
        return await delById(id)
    } catch (error) {
        if (error) {
            return error.message
        }
    }
}

const updateTask = async (id: number, task: Task): Promise<Task> => {
    try {
        return await update(id, task)
    } catch (error) {
        if (error) {
            return error.message
        }
    }
}

export { getOneTask, saveTask, delTask, updateTask, getTasks }
