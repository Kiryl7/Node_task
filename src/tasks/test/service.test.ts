import { Error } from 'mongoose'
import * as tasksRepository from '../tasks.repository'
import { getTasks, getOneTask, delTask, updateTask, saveTask } from '../tasks.service'

describe('tasks.service: getTasks', () => {
  const spyGetAll = jest.spyOn(tasksRepository, 'getAll') // mock getAll function from repo
  test('should return all tasks', async () => {
    const mockTasks = [
      { id: 1, title: 'title1', description: 'description1' },
      { id: 2, title: 'title2', description: 'description2' },
    ]

    spyGetAll.mockImplementation(() => Promise.resolve(mockTasks)) //mock returned value
    const expetedTasks = await getTasks()
    expect(spyGetAll).toHaveBeenCalled() //check that our spy function getAll was called
    expect(expetedTasks).toEqual(mockTasks) // check that our spy function getAll was returned expected mock result
  })
  test('should return an error message after an error occur', async () => {
    const mockError = 'mock error'
    spyGetAll.mockImplementationOnce(() => Promise.reject(mockError)) // возможно здесь Promise.reject({mockError}) //generate an error here
    const expectedTasks = await getTasks()
    expect(expectedTasks).toBe(mockError) //check here that returned error message
  })
})

describe('task.service: getById', () => {
  const spyGetById = jest.spyOn(tasksRepository, 'getById')
  test('should return one task, used ID', async () => {
    const mockTask = { id: 1, title: 'element', description: 'first element' }

    spyGetById.mockImplementation(() => Promise.resolve([mockTask]))
    const expectedTask = await getOneTask(1)
    expect(spyGetById).toHaveBeenCalled()
    expect(expectedTask).toEqual(mockTask)
  })
  test('should return message when task not found', async () => {
    const mockTaskResult = []
    const expected = 'object'

    spyGetById.mockImplementation(() => Promise.resolve(mockTaskResult))
    const received = await getOneTask(2)
    expect(spyGetById).toHaveBeenCalled()
    expect(typeof received).toEqual(expected)
  })
  test('should return an error message after an error occur', async () => {
    const mockError = 'test case error'
    spyGetById.mockImplementationOnce(() => Promise.reject(mockError))
    const expectedTask = await getOneTask(1)
    expect(expectedTask).toBe(mockError)
  })
})

describe('task.service: delTask', () => {
  const spyDelById = jest.spyOn(tasksRepository, 'delById')
  test('should delete one task, used ID', async () => {
    const mockTask = 1

    spyDelById.mockImplementation(() => Promise.resolve(mockTask))
    const expectedTask = await delTask(1)
    expect(spyDelById).toHaveBeenCalled()
    expect(expectedTask).toEqual(mockTask)
  })
  test('should return message when task not found', async () => {
    const mockTaskResult = 666
    const expected = 'object'

    spyDelById.mockImplementation(() => Promise.resolve(mockTaskResult))
    const received = await getOneTask(666)
    expect(spyDelById).toHaveBeenCalled()
    expect(typeof received).toEqual(expected)
  })
  test('should return an error message after an error occur', async () => {
    const mockError = 'test case error'
    spyDelById.mockImplementationOnce(() => Promise.reject(mockError))
    const expectedTask = await delTask(1)
    expect(expectedTask).toBe(mockError)
  })
})

describe('task.service: update', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  const spyUpdate = jest.spyOn(tasksRepository, 'update')
  test('should update tasks', async () => {
    const mockTask = { id: 1, title: 'element', description: 'updated el' }

    spyUpdate.mockImplementation(() => Promise.resolve(mockTask)) // export.default<any>????
    const expectedTask = await updateTask(1, { id: 1, title: 'element', description: 'updated el' })
    expect(spyUpdate).toHaveBeenCalled()
    expect(expectedTask).toEqual(mockTask)
  })
  test('should return message when task not found', async () => {
    const mockTaskResult = { id: 100, title: 'element', description: 'magick el' }

    spyUpdate.mockImplementation(() => Promise.resolve(mockTaskResult))
    const received = await updateTask(100, mockTaskResult)
    expect(spyUpdate).toHaveBeenCalled()
    expect(received).toEqual(mockTaskResult)
  })
  test('should return an error message after a error occur', async () => {
    const mockError = 'Test case Error!'

    spyUpdate.mockImplementationOnce(() => Promise.reject(mockError))
    const expectedTask = await updateTask(1, { id: 1, title: 'element', description: 'updated el' })
    expect(expectedTask).toBe(mockError)
  })
})

describe('task.service: save', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  const spySave = jest.spyOn(tasksRepository, 'save')
  test('should save tasks', async () => {
    const mockTask = { id: 1, title: 'element', description: 'saved el' }

    spySave.mockImplementation(() => Promise.resolve(mockTask))
    const expectedTask = await saveTask({ id: 1, title: 'element', description: 'saved el' })
    console.log(expectedTask)
    expect(spySave).toHaveBeenCalled()
    expect(expectedTask).toEqual(mockTask)
  })
  test('should return message when task save', async () => {
    const mockTaskResult = { id: 100, title: 'element', description: 'magick el' }

    spySave.mockImplementation(() => Promise.resolve(mockTaskResult))
    const received = await saveTask(mockTaskResult)
    expect(spySave).toHaveBeenCalled()
    expect(received).toEqual(mockTaskResult)
  })
  test('should return an error message after a error occur', async () => {
    const mockError = 'Error save test'
    spySave.mockImplementationOnce(() => Promise.reject(mockError))
    const expectedTask = await saveTask({ id: 1, title: 'element', description: 'saved el' })
    expect(expectedTask).toBe(mockError)
  })
})
