import request from 'supertest'
import { app } from '../../../app'

const endPointUrl = '/tasks/'
const nonExistingId = '666d5fff43c07ecf11f77'
const newTask = { title: 'element', description: 'NewEl' }
const nonValidTask = { title: 'element', description: 'badEl', cat: 'YellowCat' }
let newTaskId

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
describe('POST', () => {
  it('POST should return status code: 200', async () => {
    const response = await request(app)
      .post(endPointUrl)
      .send(newTask)
    expect(response.statusCode).toBe(200)
    expect(response.body.title).toBe(newTask.title)
    expect(response.body.description).toBe(newTask.description)
    newTaskId = response.body._id
  })
  it('POST task with non-Valid data', async () => {
    const responce = await request(app).post(endPointUrl).send(nonValidTask)
    expect(responce.statusCode).toBe(404)
  })
})
describe('HTTP DELETE', () => {
  it('DELETE should return status code: 200', async () => {
    const delEl = 40
    const beforeRes = await request(app).get(endPointUrl + delEl)
    expect(beforeRes.statusCode).toBe(200)
    const res = await request(app)
      .delete(endPointUrl + delEl)
      .send()
    expect(res.statusCode).toBe(200)
    const afterRes = await request(app).get(endPointUrl + delEl)
    expect(afterRes.statusCode).toBe(404)
  })
  it('DELETE non-existent data', async () => {
    const res = await request(app)
      .delete(endPointUrl + 35)
      .send()
      expect(res.statusCode).toBe(404)
  })
})
