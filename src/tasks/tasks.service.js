const { getAll, getById, delById, update, save } = require("./tasks.repository")

const getTasks = async () => {
    try {
        return await getAll()
    } catch (error) {
        console.log(error)
        throw error
    }
}

const getOneTask = async (id) => {
    try {
        return await getById(id)
    } catch (error) {
        console.log(error)
        throw error
    }
}

const saveTask = async (task) => {
    try {
        return await save(task)
    } catch(error) {
        console.log(error)
        throw error
    }
}

const delTask = async (id) => {
    try {
        return await delById(id)
    } catch (error) {
        throw error
    }
}

const updateTask = async (id, task) => {
    try {
        return await update(id, task)
    } catch (error) {
        throw error
    }

}

module.exports = { getOneTask, saveTask, delTask, updateTask, getTasks }
