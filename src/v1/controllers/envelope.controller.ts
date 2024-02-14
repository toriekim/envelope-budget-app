import { Request, Response } from 'express';
import * as envelopeService from '../services/envelope.service';

export const getAllEnvelopes = (req: Request, res: Response) => {
  const allEnvelopes = envelopeService.getAllEnvelopes();
  res.status(200).send({ status: 'OK', data: allEnvelopes });
};

export const getEnvelope = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return;

  const envelope = envelopeService.getEnvelope(parseInt(id));
  res.status(200).send({ status: 'OK', data: envelope });
};

export const createEnvelope = (req: Request, res: Response) => {
  const { title, budget } = req.body;
  if (!title || !budget) return;

  const newEnvelope = {
    title,
    budget,
  };
  const createdEnvelope = envelopeService.createEnvelope(newEnvelope);

  res.status(201).send({ status: 'OK', data: createdEnvelope });
};

export const updateEnvelope = (req: Request, res: Response) => {
  const {
    body,
    params: { id },
  } = req;
  if (!id) return;

  const updatedEnvelope = envelopeService.updateEnvelope(parseInt(id), body);
  res.status(200).send({ status: 'OK', data: updatedEnvelope });
};

export const deleteEnvelope = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return;
  envelopeService.deleteEnvelope(parseInt(id));
  res.status(204).send({ status: 'OK' });
};
