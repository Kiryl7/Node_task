import { Pool } from 'pg'
import { getAll, getById, delById, update, save } from '../tasks.repository'

jest.mock('pg', () => {
  const mockPool = {
    query: jest.fn(),
  }
  return { Pool: jest.fn(() => mockPool) }
})

describe('getAll', () => {
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
})
