import { pool } from '../database'

export interface Task {
  id: number
  title: string
  description: string
}

const getAll = async (): Promise<Array<Task> | null> => {
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
    return rows
  } catch (error) {
    console.log(error)
    return null
  }
}

const delById = async (id: number): Promise<number> => {
  const client = await pool.connect()
  let result
  try {
    await client.query('BEGIN')
    const query = 'DELETE FROM education.task WHERE id = $1'
    result = await client.query(query, [id]) //rowCount > 0 = true
    await client.query('COMMIT')
  } catch (error) {
    //console.log(`Rolling back delete task for: ${id}, Error: ${error}`)
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
  return result.rowCount
}

const update = async (id: number, task: Task): Promise<Task> => {
  const client = await pool.connect()
  const { title, description } = task
  try {
    await client.query('BEGIN')
    const query = `UPDATE education.task SET title = $1, description = $2 WHERE ID = ${id}`
    await client.query(query, [title, description])
    await client.query('COMMIT')
  } catch (error) {
    //console.log(`Rolling back update task for: ${id}, ${task}, Error: ${error}`)
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
  return task
}

const save = async (task: Task): Promise<Task> => {
  const client = await pool.connect()
  const { title, description } = task
  try {
    await client.query('BEGIN')
    const query = `INSERT INTO education.task (title, description) VALUES ($1, $2)`
    await client.query(query, [title, description])
    await client.query('COMMIT')
  } catch (error) {
    //console.log(`Rolling back saveObj task for: ${task}, Error: ${error}`)
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
  return task
}

export { getAll, getById, delById, update, save }
