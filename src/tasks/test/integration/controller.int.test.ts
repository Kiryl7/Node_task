import request from 'supertest'
import { app } from '../../../app'

const endPointUrl = '/tasks/'
const nonExistingId = '666d5fff43c07ecf11f77'

describe('GET, GET/:id', () => {
  it('GET should return status code: 200', async () => {
    const response = await request(app).get(endPointUrl)
    expect(response.statusCode).toBe(200)
  })
  it('GET/:id should return status code: 200', async () => {
      const responce = await request(app).get(endPointUrl + 1)
      expect(responce.statusCode).toBe(200)
  })
  it("GET task by id doesn't exist", async () => {
    const response = await request(app).get(endPointUrl + nonExistingId)
    expect(response.statusCode).toBe(404)
  })
})
