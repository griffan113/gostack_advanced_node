import('dotenv').then((f) => f.config());

import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';

import routes from './routes';
import uploadConfig from '../../../config/upload';
import AppError from '../../errors/AppError';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
const port = process.env.PORT || 3333;

app.use(cors({ origin: ['http://localhost:3000'] }));

app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ error: 'error', message: err.message });
    }

    console.error(err);

    return response
      .status(500)
      .json({ status: 'error', message: 'Internal Server Error' });
  }
);

app.listen(port, () => {
  console.log('Server running on port: ' + port);
});
