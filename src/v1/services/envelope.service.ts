/* eslint-disable no-useless-catch */
import { prisma } from '../../server';
import { NewEnvelope, UpdateEnvelope } from '../../types';
import { HTTP404Error } from '../../utils/httpErrors';

export const getAllEnvelopes = async () => {
  try {
    const allEnvelopes = await prisma.envelope.findMany();
    return allEnvelopes;
  } catch (err) {
    throw err;
  }
};

export const getEnvelope = async (envelopeId: number) => {
  try {
    const envelope = await prisma.envelope.findUnique({
      where: { id: envelopeId },
    });

    if (!envelope) {
      throw new HTTP404Error(`Envelope with id ${envelopeId} not found`);
    }
    return envelope;
  } catch (err) {
    throw err;
  }
};

export const createEnvelope = async (newEnvelope: NewEnvelope) => {
  try {
    const createdEnvelope = await prisma.envelope.create({ data: newEnvelope });
    return createdEnvelope;
  } catch (err) {
    throw err;
  }
};

export const updateEnvelope = async (
  envelopeId: number,
  changes: UpdateEnvelope
) => {
  try {
    const updatedEnvelope = await prisma.envelope.update({
      where: {
        id: envelopeId,
      },
      data: changes,
    });
    return updatedEnvelope;
  } catch (err) {
    throw err;
  }
};

export const deleteEnvelope = async (envelopeId: number) => {
  try {
    const deletedEnvelope = await prisma.envelope.delete({
      where: { id: envelopeId },
      select: { id: true, title: true },
    });
    return deletedEnvelope;
  } catch (err) {
    throw err;
  }
};

export const transferBalance = async (
  fromId: number,
  toId: number,
  amount: number
) => {
  try {
    const originEnv = await getEnvelope(fromId);
    const destinationEnv = await getEnvelope(toId);

    if (!originEnv || !destinationEnv) {
      throw new HTTP404Error(`Envelope with id ${fromId} or ${toId} not found`);
    }

    if (originEnv.budget < amount) {
      throw {
        status: 400,
        message: 'Amount to transfer exceeds envelope budget funds',
      };
    }

    const updatedOrigin = await updateEnvelope(fromId, {
      budget: originEnv.budget - amount,
    });
    const updatedDestination = await updateEnvelope(toId, {
      budget: destinationEnv.budget + amount,
    });
    return { updatedOrigin, updatedDestination };
  } catch (err) {
    throw err;
  }
};
