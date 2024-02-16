import { prisma } from '../../server';
import { NewEnvelope, UpdateEnvelope } from '../../types';
import { HTTP400Error, HTTP404Error } from '../../utils/httpErrors';

export const getAllEnvelopes = async () => {
  const allEnvelopes = await prisma.envelope.findMany({
    include: {
      transactions: true,
    },
  });
  return allEnvelopes;
};

export const getEnvelope = async (envelopeId: number) => {
  const envelope = await prisma.envelope.findUnique({
    where: { id: envelopeId },
  });

  if (!envelope) {
    throw new HTTP404Error(`Envelope with id ${envelopeId} not found`);
  }
  return envelope;
};

export const createEnvelope = async (newEnvelope: NewEnvelope) => {
  const createdEnvelope = await prisma.envelope.create({ data: newEnvelope });
  return createdEnvelope;
};

export const updateEnvelope = async (
  envelopeId: number,
  changes: UpdateEnvelope
) => {
  const updatedEnvelope = await prisma.envelope.update({
    where: {
      id: envelopeId,
    },
    data: changes,
  });
  return updatedEnvelope;
};

export const deleteEnvelope = async (envelopeId: number) => {
  const deletedEnvelope = await prisma.envelope.delete({
    where: { id: envelopeId },
    select: { id: true, title: true },
  });
  return deletedEnvelope;
};

export const transferBalance = async (
  fromId: number,
  toId: number,
  amount: number
) => {
  const originEnv = await getEnvelope(fromId);
  const destinationEnv = await getEnvelope(toId);

  if (originEnv.budget < amount) {
    throw new HTTP400Error(`Amount to transfer exceeds envelope budget funds`);
  }

  const updateOrigin = prisma.envelope.update({
    where: {
      id: fromId,
    },
    data: {
      budget: originEnv.budget - amount,
      transactions: {
        create: {
          description: `Transfer TO ${destinationEnv.title}`,
          amount,
          isTransfer: true,
        },
      },
    },
  });

  const updateDestination = prisma.envelope.update({
    where: {
      id: toId,
    },
    data: {
      budget: destinationEnv.budget + amount,
      transactions: {
        create: {
          description: `Transfer FROM ${originEnv.title}`,
          amount,
          isTransfer: true,
        },
      },
    },
  });

  const [updatedOrigin, updatedDestination] = await prisma.$transaction([
    updateOrigin,
    updateDestination,
  ]);

  return { updatedOrigin, updatedDestination };
};

export const getEnvelopeTransactions = async (envelopeId: number) => {
  const transactions = await prisma.transaction.findMany({
    where: { envelopeId },
  });

  if (!transactions) {
    throw new HTTP404Error(`No envelope information found`);
  }

  return transactions;
};

export const addEnvelopeTransaction = async (
  envelopeId: number,
  description: string,
  amount: number
) => {
  const createTransaction = prisma.transaction.create({
    data: { description, amount, envelopeId },
  });

  const updateEnvelope = prisma.envelope.update({
    where: { id: envelopeId },
    data: {
      budget: {
        decrement: amount,
      },
    },
  });

  const results = await prisma.$transaction([
    createTransaction,
    updateEnvelope,
  ]);

  return results;
};
