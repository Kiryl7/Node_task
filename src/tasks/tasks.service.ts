import { getAll, getById, delById, update, save } from "./tasks.repository"

const getTasks = async () => {
    try {
        return await getAll()
    } catch (error) {
        console.log(error)
        throw error
    }
}

const getOneTask = async (id: Number) => {
    try {
        return await getById(id)
    } catch (error) {
        console.log(error)
        throw error
    }
}

const saveTask = async (task: Object) => {
    try {
        return await save(task)
    } catch(error) {
        console.log(error)
        throw error
    }
}

const delTask = async (id: Number) => {
    try {
        return await delById(id)
    } catch (error) {
        throw error
    }
}

const updateTask = async (id: Number, task: Object) => {
    try {
        return await update(id, task)
    } catch (error) {
        throw error
    }
}

export { getOneTask, saveTask, delTask, updateTask, getTasks }
