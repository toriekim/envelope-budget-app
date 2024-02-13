import { Request, Response } from 'express';
import * as envelopeService from '../services/envelope.service';

export const getAllEnvelopes = (req: Request, res: Response) => {
  const allEnvelopes = envelopeService.getAllEnvelopes();
  res.send({ status: 'OK', data: allEnvelopes });
};

export const getEnvelope = (req: Request, res: Response) => {
  const envelope = envelopeService.getEnvelope();
  res.send('Get an existing envelope');
};

export const createEnvelope = (req: Request, res: Response) => {
  const createdEnvelope = envelopeService.createEnvelope();
  res.send('Create a new envelope');
};

export const updateEnvelope = (req: Request, res: Response) => {
  const updatedEnvelope = envelopeService.updateEnvelope();
  res.send('Update an existing envelope');
};

export const deleteEnvelope = (req: Request, res: Response) => {
  envelopeService.deleteEnvelope();
  res.send('Delete an existing envelope');
};
