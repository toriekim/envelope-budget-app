/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, NextFunction } from 'express';
import { HTTPClientError, HTTP404Error } from './httpErrors';

export const notFoundError = () => {
  throw new HTTP404Error('Method not found.');
};

export const clientError = (err: Error, res: Response, next: NextFunction) => {
  if (err instanceof HTTPClientError) {
    const { message, statusCode } = err;
    res.status(statusCode).send({ status: 'FAILED', data: { error: message } });
  } else {
    next(err);
  }
};

export const serverError = (err: Error, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'production') {
    res
      .status(500)
      .send({ status: 'FAILED', data: { error: 'Internal Server Error' } });
  } else {
    res.status(500).send({ status: 'FAILED', data: { error: err.stack } });
  }
};
