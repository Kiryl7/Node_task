//import { when } from 'jest-when'
import { Pool } from 'pg'
import { getAll, getById, delById, update, save } from '../tasks.repository'

const mockClient = {
  query: jest.fn(),
  release: jest.fn(),
}

jest.mock('pg', () => {
  const mockPool = {
    connect: jest.fn(() => mockClient),
    query: jest.fn(),
  }
  return { Pool: jest.fn(() => mockPool) }
})

describe('repository methods', () => {
  let pool
  beforeEach(async () => {
    pool = new Pool()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  const mockTasks = []
  describe('getAll', () => {
    test('should return arr', async () => {
      pool.query.mockResolvedValue({ rowCount: 0, rows: [] })
      const expected = await getAll()
      expect(pool.query).toBeCalled()
      expect(expected).toEqual(mockTasks)
    })
  })
  describe('getByID', () => {
    test('should return one task', async () => {
      pool.query.mockResolvedValue({ rowCountL: 0, rows: [] })
      const expected = await getById(1)
      expect(pool.query).toBeCalled()
      expect(expected).toEqual(mockTasks)
    })
  })
  test('delByID', async () => {
    const client = await pool.connect()
    client.query.mockResolvedValueOnce({ rows: [], rowCount: 0 })
    await delById(1)
    expect(client.query).toHaveBeenCalledWith('BEGIN')
    expect(client.query).toHaveBeenCalledWith('DELETE FROM education.task WHERE id = $1', [1])
    expect(client.query).toHaveBeenCalledWith('COMMIT')
    expect(client.release).toBeCalled()
  })

  test('update', async () => {
    const client = await pool.connect()
    client.query.mockResolvedValueOnce({ rows: [], rowCount: 0 })
    await update(1, { id: 1, title: 'element', description: 'testEl' })
    expect(client.query).toHaveBeenCalledWith('BEGIN')
    expect(client.query).toHaveBeenCalledWith('UPDATE education.task SET title = $1, description = $2 WHERE ID = 1', ['element', 'testEl'])
    expect(client.query).toHaveBeenCalledWith('COMMIT')
    expect(client.release).toBeCalled()
  })
  test('save', async () => {
    const client = await pool.connect()
    client.query.mockResolvedValueOnce({ rows: [], rowCount: 0 })
    await save({ id: 1, title: 'element', description: 'testEl' })
    expect(client.query).toHaveBeenCalledWith('BEGIN')
    expect(client.query).toHaveBeenCalledWith('INSERT INTO education.task (title, description) VALUES ($1, $2)', ['element', 'testEl'])
    expect(client.query).toHaveBeenCalledWith('COMMIT')
    expect(client.release).toBeCalled()
  })
})
