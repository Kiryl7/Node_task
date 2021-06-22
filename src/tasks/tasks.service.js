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

const { getAll, getById, delObjById, updateBase, saveObj } = require("./tasks.repository")
const getTasks = async () => {
    try {
        return await getAll()
    } catch (error) {
        console.log(error)
        throw error
    }
}

const getOne = (id) => {
    for (const obj of arr) {
        if (obj.id == id) {
            return obj
        }
    }
}

const save = (obj) => {
    arr.push(obj)
    return obj
}

const del = (id) => { //delTask
    try {
        const findTask = getOne(id)
        arr.splice(arr.indexOf(findTask), 1)
        return findTask
    } catch (error) {
        throw error
    }
}

const update = (id, task) => {
    try {
        const findTask = getOne(id)
        if (!findTask) save(task)
        else {
            if (findTask.id != task.id) findTask.id = task.id
            else if (findTask.title != task.title) findTask.title = task.title
            else if (findTask.description != task.description) findTask.description = task.description
        }
        return findTask
    } catch (error) {
        throw error
    }

}

module.exports = { getOne, save, del, update, getTasks }
