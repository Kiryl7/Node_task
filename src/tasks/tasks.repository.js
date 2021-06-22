const pool = require('../database')

const getAll = async () => {
    try {
        const queryString = 'SELECT * FROM education.task'
        const result = await pool.query(queryString)
        return result
    } catch (error) {
        console.trace(error)
        throw error
    }
}

const getById = async (id) => {
    try {
        const queryString = `SELECT * FROM education.task WHERE ID = ${id}`
        const { rows } = await pool.query(queryString)
        console.log(rows)
        return rows
    } catch (error) {
        console.log(error)
        return null
    }
}

const delObjById = async (id) => {
    const client = await pool.connect()
    let taskResult
    try {
        await client.query('BEGIN')
        const query = `DELETE FROM education.task WHERE id = $1`,
        taskResult = await client.query(query,[id])
        console.log(taskResult.rowCount) //rowCount > 0 = true
        await client.query('COMMIT')
    } catch (error) {
        console.log(`Rolling back delete task for: ${ id }, Error: ${ error }`)
        await client.query('ROLLBACK')
        throw error
    } finally {
        client.release()
    }
    return taskResult
}

const update = async (id, task) => {
    const client = await pool.connect()
    const { title, description } = task
    let taskResult
    try {
        await client.query('BEGIN')
        const query = `UPDATE education.task SET title = $1, description = $2 WHERE ID = ${id}`
        const taskResult = await client.query(query, [title, description])
        console.log(taskResult.rowCount)
        await client.query('COMMIT')
    } catch (error) {
        console.log(`Rolling back update task for: ${ id }, ${ task }, Error: ${ error }`)
        await client.query('ROLLBACK')
        throw error
    } finally {
        client.release()
    }
    return taskResult    
    }
    
const saveObj = async (task) => {
    const client = await pool.connect()
    const {title, description} = task
    let taskResult
    try {
        await client.query('BEGIN')
        const query = `INSERT INTO education.task (title, description) VALUES ($1, $2)`,
        taskResult = await client.query(query, [title, description])
        console.log(taskResult.rowCount)
        await client.query('COMMIT')
    } catch (error) {
        console.log(`Rolling back saveObj task for: ${task}, Error: ${error}`)
        await client.query('ROLLBACK')
        throw error
    } finally {
        client.release()
    }
    return taskResult
}

module.exports = { getAll, getById, delObjById, update, saveObj }