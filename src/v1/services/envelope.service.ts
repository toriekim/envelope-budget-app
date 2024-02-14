/* eslint-disable no-useless-catch */
import * as Envelope from '../../database/Envelope';
import { NewEnvelope } from '../../types';

export const getAllEnvelopes = () => {
  try {
    const allEnvelopes = Envelope.getAllEnvelopes();
    return allEnvelopes;
  } catch (err) {
    throw err;
  }
};

export const getEnvelope = (envelopeId: number) => {
  try {
    const envelope = Envelope.getEnvelope(envelopeId);
    return envelope;
  } catch (err) {
    throw err;
  }
};

export const createEnvelope = (newEnvelope: NewEnvelope) => {
  try {
    const envelopeToCreate = {
      ...newEnvelope,
      createdAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
      updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
    };
    const createdEnvelop = Envelope.createNewEnvelope(envelopeToCreate);
    return createdEnvelop;
  } catch (err) {
    throw err;
  }
};

export const updateEnvelope = (envelopeId: number, changes: NewEnvelope) => {
  try {
    const updatedEnvelope = Envelope.updateEnvelope(envelopeId, changes);
    return updatedEnvelope;
  } catch (err) {
    throw err;
  }
};

export const deleteEnvelope = (envelopeId: number) => {
  try {
    return Envelope.deleteEnvelope(envelopeId);
  } catch (err) {
    throw err;
  }
};

export const transferBalance = (
  fromId: number,
  toId: number,
  amount: number
) => {
  try {
    const updatedEnvelopes = Envelope.transferBalance(fromId, toId, amount);
    return updatedEnvelopes;
  } catch (err) {
    throw err;
  }
};
