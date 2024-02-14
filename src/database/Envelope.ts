import { Envelope, EnvelopeToInsert, NewEnvelope } from '../types';
import DB from './db.json';
import { createId, getIdxById, saveToDatabase } from './utils';

export const getAllEnvelopes = () => {
  try {
    return DB.envelopes;
  } catch (err) {
    throw { status: 500, message: err };
  }
};

export const getEnvelope = (id: number) => {
  try {
    const envelope = DB.envelopes.find((envelope) => envelope.id === id);
    if (!envelope) {
      throw {
        status: 400,
        message: `Envelope with id ${id} not found`,
      };
    }
    return envelope;
  } catch (err) {
    throw { status: 500, message: err };
  }
};

export const createNewEnvelope = (newEnvelope: EnvelopeToInsert) => {
  const isAlreadyAdded =
    DB.envelopes.findIndex((envelope) => envelope.title === newEnvelope.title) >
    -1;
  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `Envelope with title ${newEnvelope.title} already exists`,
    };
  }

  try {
    const id = createId(DB);
    DB.envelopes.push({ id, ...newEnvelope });
    saveToDatabase(DB);
    return { id, ...newEnvelope };
  } catch (err) {
    throw { status: 500, message: err };
  }
};

export const updateEnvelope = (id: number, changes: NewEnvelope) => {
  try {
    const isAlreadyAdded =
      DB.envelopes.findIndex((envelope) => envelope.title === changes.title) >
      -1;
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
  } catch (err) {
    throw { status: 500, message: err };
  }
};

export const deleteEnvelope = (id: number) => {
  try {
    const deleteIdx = getIdxById(DB, id);
    if (!deleteIdx) {
      throw { status: 400, message: `Envelope with id ${id} not found` };
    }
    DB.envelopes.splice(deleteIdx, 1);
    saveToDatabase(DB);
    return true;
  } catch (err) {
    throw { status: 500, message: err };
  }
};

export const transferBalance = (
  fromId: number,
  toId: number,
  amount: number
) => {
  try {
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
  } catch (err) {
    throw { status: 500, message: err };
  }
};
