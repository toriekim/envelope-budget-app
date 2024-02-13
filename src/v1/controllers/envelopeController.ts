import { Request, Response } from 'express';

export const getAllEnvelopes = (req: Request, res: Response) => {
  res.send('Get all envelopes');
};

export const getOneEnvelope = (req: Request, res: Response) => {
  res.send('Get an existing envelope');
};

export const createNewEnvelope = (req: Request, res: Response) => {
  res.send('Create a new envelope');
};

export const updateOneEnvelope = (req: Request, res: Response) => {
  res.send('Update an existing envelope');
};

export const deleteOneEnvelope = (req: Request, res: Response) => {
  res.send('Delete an existing envelope');
};
