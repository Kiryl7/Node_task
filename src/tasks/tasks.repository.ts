import pool from '../database'

export interface Task {
    id: number;
    title: string;
    description: string;
}

const getAll = async (): Promise <Array<Task> | null> => {
    try {
        const queryString = 'SELECT * FROM education.task'
        const { rows } = await pool.query(queryString)
        return rows
    } catch (error) {
        console.trace(error)
        return null
    }
}

const getById = async (id: number): Promise<Array<Task> | null> => {
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

const delById = async (id: number): Promise<Task> => {
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

const update = async (id: number, task: Task): Promise<Task> => {
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
    
const save = async (task: Task): Promise<Task> => {
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

export { getAll, getById, delById, update, save }