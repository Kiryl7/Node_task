arr = [
    {
        id: 0,
        title: "#",
        description: 'first element'
    },
    {
        id: 1,
        title: "$",
        description: 'second element'
    }
]

const { getAll, getById, delObjById, update, saveObj } = require("./tasks.repository")
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
        return await saveObj(task)
    } catch(error) {
        console.log(error)
        throw error
    }
}

const delTask = async (id) => { //delTask
    try {
        return await delObjById(id)
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
