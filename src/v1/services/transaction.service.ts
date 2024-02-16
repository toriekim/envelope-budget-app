import { prisma } from '../../server';
import { HTTP404Error } from '../../utils/httpErrors';
import { getEnvelope } from './envelope.service';

export const getAllTransactions = async () => {
  const transactions = await prisma.transaction.findMany({});
  if (transactions.length < 1) {
    throw new HTTP404Error(`No transactions found`);
  }
  return transactions;
};

export const getTransactionById = async (transactionId: number) => {
  const transaction = await prisma.transaction.findUnique({
    where: { id: transactionId },
  });

  if (!transaction) {
    throw new HTTP404Error(`Transaction with id ${transactionId} not found`);
  }

  return transaction;
};

export const updateTransaction = async (
  transactionId: number,
  description: string,
  amount: number
) => {
  const transaction = await getTransactionById(transactionId);
  const envelope = await getEnvelope(transaction.envelopeId);

  const [, updatedTransaction] = await prisma.$transaction([
    prisma.envelope.update({
      where: { id: transaction.envelopeId },
      data: {
        budget: envelope.budget + transaction.amount - amount,
      },
    }),
    prisma.transaction.update({
      where: { id: transactionId },
      data: {
        description,
        amount,
      },
      include: { envelope: true },
    }),
  ]);

  return updatedTransaction;
};

export const deleteTransaction = async (transactionId: number) => {
  const transaction = await getTransactionById(transactionId);

  const [updatedEnvelope, deleted] = await prisma.$transaction([
    prisma.envelope.update({
      where: { id: transaction.envelopeId },
      data: {
        budget: {
          increment: transaction.amount,
        },
      },
    }),
    prisma.transaction.delete({
      where: { id: transactionId },
      select: {
        description: true,
        amount: true,
      },
    }),
  ]);
  return { updatedEnvelope, deleted };
};
