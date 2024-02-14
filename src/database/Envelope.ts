import { Envelope, EnvelopeToInsert, NewEnvelope } from '../types';
import { HTTP400Error, HTTP404Error } from '../utils/httpErrors';
import DB from './db.json';
import { createId, getIdxById, saveToDatabase } from './utils';

export const getAllEnvelopes = () => {
  return DB.envelopes;
};

export const getEnvelope = (id: number) => {
  const envelope = DB.envelopes.find((envelope) => envelope.id === id);
  if (!envelope) {
    throw new HTTP404Error(`Envelope with id ${id} not found`);
  }
  return envelope;
};

export const createNewEnvelope = (newEnvelope: EnvelopeToInsert) => {
  const isAlreadyAdded =
    DB.envelopes.findIndex((envelope) => envelope.title === newEnvelope.title) >
    -1;
  if (isAlreadyAdded) {
    throw new HTTP400Error(
      `Envelope with title ${newEnvelope.title} already exists`
    );
  }

  const id = createId(DB);
  DB.envelopes.push({ id, ...newEnvelope });
  saveToDatabase(DB);
  return { id, ...newEnvelope };
};

export const updateEnvelope = (id: number, changes: NewEnvelope) => {
  const isAlreadyAdded =
    DB.envelopes.findIndex((envelope) => envelope.title === changes.title) > -1;
  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `Envelope with title ${changes.title} already exists`,
    };
  }

  const updateIdx = getIdxById(DB, id);
  if (!updateIdx) {
    throw { status: 400, message: `Envelope with id ${id} not found` };
  }

  const updatedEnvelope: Envelope = {
    ...DB.envelopes[updateIdx],
    ...changes,
    updatedAt: new Date().toLocaleDateString('en-US', { timeZone: 'UTC' }),
  };
  DB.envelopes[updateIdx] = updatedEnvelope;
  saveToDatabase(DB);
  return updatedEnvelope;
};

export const deleteEnvelope = (id: number) => {
  const deleteIdx = getIdxById(DB, id);
  if (!deleteIdx) {
    throw { status: 400, message: `Envelope with id ${id} not found` };
  }
  DB.envelopes.splice(deleteIdx, 1);
  saveToDatabase(DB);
  return true;
};

export const transferBalance = (
  fromId: number,
  toId: number,
  amount: number
) => {
  const originEnv = getEnvelope(fromId);
  const destinationEnv = getEnvelope(toId);

  if (!originEnv || !destinationEnv) {
    throw {
      status: 404,
      message: 'Envelope not found',
    };
  }

  if (originEnv.budget < amount) {
    throw {
      status: 400,
      message: 'Amount to transfer exceeds envelope budget funds',
    };
  }

  originEnv.budget -= amount;
  destinationEnv.budget += amount;
  saveToDatabase(DB);
  return { originEnv, destinationEnv };
};
