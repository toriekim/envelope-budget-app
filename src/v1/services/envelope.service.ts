import * as Envelope from '../../database/Envelope';
import { NewEnvelope } from '../../types';

export const getAllEnvelopes = () => {
  const allEnvelopes = Envelope.getAllEnvelopes();
  return allEnvelopes;
};

export const getEnvelope = (envelopeId: number) => {
  const envelope = Envelope.getEnvelope(envelopeId);
  return envelope;
};

export const createEnvelope = (newEnvelope: NewEnvelope) => {
  const envelopeToCreate = {
    ...newEnvelope,
    createdAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
    updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
  };
  const createdEnvelop = Envelope.createNewEnvelope(envelopeToCreate);
  return createdEnvelop;
};

export const updateEnvelope = (envelopeId: number, changes: NewEnvelope) => {
  const updatedEnvelope = Envelope.updateEnvelope(envelopeId, changes);
  return updatedEnvelope;
};

export const deleteEnvelope = (envelopeId: number) => {
  Envelope.deleteEnvelope(envelopeId);
};
