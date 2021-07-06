import express from 'express';
import { tasks as taskRoute } from './tasks/tasks.conroller';
import { ErrorHandler, handleError } from './helpers/error';

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/error', (req, res) => {
  throw new ErrorHandler(500, 'Internal server error');
});

app.use('/tasks', taskRoute);

app.use((err, req, res, next) => {
  handleError(err, res);
});
