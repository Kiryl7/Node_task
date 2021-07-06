import express from 'express';
import { ErrorHandler } from '../helpers/error';

const validateBody = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const task = req.body;
  if (!task.id || task.id == null || !task.title || task.title == null || !task.description || task.description == null)
    throw new ErrorHandler(404, 'Invalid req data');
  next();
};

export { validateBody };
