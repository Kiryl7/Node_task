import { Pool } from 'pg'
import { getAll, getById, delById, update, save } from '../tasks.repository'

jest.mock('pg', () => {
  const mockPool = {
    query: jest.fn(),
  }
  return { Pool: jest.fn(() => mockPool) }
})

describe('repository methods', () => {
  let pool
  beforeEach(() => {
    pool = new Pool()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  const mockTasks = []
  test('should return arr', async () => {
    pool.query.mockResolvedValue({ rowCount: 0, rows: [] })
    const expected = await getAll()
    expect(pool.query).toBeCalled()
    expect(expected).toEqual(mockTasks)
  })
  test('should return one task', async () => {
    pool.query.mockResolvedValue({ rowCountL: 0, rows: [] })
    const expected = await getById(1)
    expect(pool.query).toBeCalled()
    expect(expected).toEqual(mockTasks)
  })
  test('should delete task by ID', async () => { 
      const client = await pool.connect()
      pool.query.mockResolvedValue({rowCount: 0, rows: [] }) //fix pool.query to pool.client
      const expected = await delById(1)
      expect(pool.query).toBeCalled()
      expect(expected).toEqual(mockTasks)
  })
})
