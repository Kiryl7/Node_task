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
    const mockError = {
      message: 'mock error',
    }
    spyGetAll.mockImplementationOnce(() => Promise.reject(mockError)) // возможно здесь Promise.reject({mockError}) //generate an error here
    const expectedTasks = await getTasks()
    expect(expectedTasks).toBe(mockError.message) //check here that returned error message
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
    const expected = 'Task with id: 2 not found'

    spyGetById.mockImplementation(() => Promise.resolve(mockTaskResult))
    const received = await getOneTask(2)
    expect(spyGetById).toHaveBeenCalled()
    expect(received).toEqual(expected)
  })
  test('should return an error message after an error occur', async () => {
    const mockError = {
      message: 'test case error',
    }
    spyGetById.mockImplementationOnce(() => Promise.reject(mockError))
    const expectedTask = await getOneTask(1)
    expect(expectedTask).toBe(mockError.message)
  })
})

describe('task.service: delTask', () => {
  const spyDelById = jest.spyOn(tasksRepository, 'delById')
  test('should delete one task, used ID', async () => {
    const mockTask = { id: 1, title: 'element', description: 'first element' }

    spyDelById.mockImplementation(() => Promise.resolve(mockTask))
    const expectedTask = await delTask(1)
    expect(spyDelById).toHaveBeenCalled()
    expect(expectedTask).toEqual(mockTask)
  })
  test('should return message when task not found', async () => {
    const mockTaskResult = {id: 100, title: 'element', description: 'magick el'}
    const expected = `Task with id: 100 not found`

    spyDelById.mockImplementation(() => Promise.resolve(mockTaskResult))
    const received = await getOneTask(100)
    expect(spyDelById).toHaveBeenCalled()
    expect(received).toEqual(expected)
  })
  test('should return an error message after an error occur', async () => {
    const mockError = {
      message: 'test case error',
    }
    spyDelById.mockImplementationOnce(() => Promise.reject(mockError))
    const expectedTask = await delTask(1)
    expect(expectedTask).toBe(mockError.message)
  })
})

describe('task.service: update', () => {
  const spyUpdate = jest.spyOn(tasksRepository, 'update')
  test('should update tasks', async () => {
    const mockTask = { id: 1, title: 'element', description: 'updated el' }

    spyUpdate.mockImplementation(() => Promise.resolve(mockTask)) // export.default<any>????
    const expectedTask = await updateTask(1, { id: 1, title: 'element', description: 'updated el' })
    expect(spyUpdate).toHaveBeenCalled()
    expect(expectedTask).toEqual(mockTask)
  })
  test('should return message when task not found', async () => {
    const mockTaskResult = {id: 100, title: 'element', description: 'magick el'}
    const expected = `Task with id: 100 not found`

    spyUpdate.mockImplementation(() => Promise.resolve(mockTaskResult))
    const received = await getOneTask(100)
    expect(spyUpdate).toHaveBeenCalled()
    expect(received).toEqual(expected)
  })
  test('should return an error message after a error occur', async () => {
    const mockError = { message: 'Test case Error!' }

    spyUpdate.mockImplementationOnce(() => Promise.reject(mockError))
    const expectedTask = await updateTask(1, { id: 1, title: 'element', description: 'updated el' })
    expect(expectedTask).toBe(mockError.message)
  })
})

describe('task.service: save', () => {
  const spySave = jest.spyOn(tasksRepository, 'save')
  test('should save tasks', async () => {
    const mockTask = { id: 1, title: 'element', description: 'saved el' }

    spySave.mockImplementation(() => Promise.resolve(mockTask))
    const expectedTask = await saveTask({ id: 1, title: 'element', description: 'saved el' })
    expect(spySave).toHaveBeenCalled()
    expect(expectedTask).toEqual(mockTask)
  })
  test('should return message when task not found', async () => {
    const mockTaskResult = {id: 100, title: 'element', description: 'magick el'}
    const expected = `Task with id: 100 not found`

    spySave.mockImplementation(() => Promise.resolve(mockTaskResult))
    const received = await getOneTask(100)
    expect(spySave).toHaveBeenCalled()
    expect(received).toEqual(expected)
  })
  test('should return an error message after a error occur', async () => {
    const mockError = { message: 'Error save test' }

    spySave.mockImplementationOnce(() => Promise.reject(mockError))
    const expectedTask = await saveTask({ id: 1, title: 'element', description: 'saved el' })
    expect(expectedTask).toBe(mockError.message)
  })
})
