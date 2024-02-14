/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import v1Routes from './v1/routes';
import * as ErrorHandler from './utils/ErrorHandlers';
import { HTTP403Error } from './utils/httpErrors';
import { ErrorWithCode } from './types';

// Init prisma client
export const prisma = new PrismaClient();

// Init express
const app: Express = express();

// Add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add APIs
app.use('/api/v1', v1Routes);

// Add API error handlers
// 404 (Not Found) errors
app.use((req: Request, res: Response) => {
  ErrorHandler.notFoundError();
});

// Client errors
app.use(
  (err: ErrorWithCode, req: Request, res: Response, next: NextFunction) => {
    if (err.code == 'EBADCSRFTOKEN') {
      err = new HTTP403Error();
    }
    ErrorHandler.clientError(err, res, next);
  }
);

// Server errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  ErrorHandler.serverError(err, res, next);
});

export default app;
