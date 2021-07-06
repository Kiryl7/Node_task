import * as tasksRepository from '../tasks.repository';
import { getTasks } from '../tasks.service';

describe('tasks.service', () => {
  const spyGetAll = jest.spyOn(tasksRepository, 'getAll'); // mock getAll function from repo
  test('should return all tasks', async () => {
    const mockTasks = [
      { id: 1, title: 'title1', description: 'description1'},
      { id: 2, title: 'title2', description: 'description2'},
    ];
    
    spyGetAll.mockImplementation(() => Promise.resolve(mockTasks));//mock returned value
    const expetedTasks = await getTasks();
    expect(spyGetAll).toHaveBeenCalled(); //check that our spy function getAll was called
    expect(expetedTasks).toEqual(mockTasks); // check that our spy function getAll was returned expected mock result
  });
  test('should return an error message after an error occur', async () => {
    const mockError = {
      message: 'mock error',
    }
    spyGetAll.mockImplementationOnce(() => Promise.reject(mockError)); // возможно здесь Promise.reject({mockError}) //generate an error here
    const expectedTasks = await getTasks();
    expect(expectedTasks).toBe(mockError.message); //check here that returned error message
  });
});