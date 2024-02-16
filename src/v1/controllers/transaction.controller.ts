import { NextFunction, Request, Response } from 'express';
import * as transactionService from '../services/transaction.service';

export const getAllTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allTransactions = await transactionService.getAllTransactions();
    res.status(200).send({ status: 'success', data: allTransactions });
  } catch (err) {
    next(err);
  }
};

export const getTransactionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const transaction = await transactionService.getTransactionById(
      parseInt(id)
    );
    res.status(200).send({ status: 'success', data: transaction });
  } catch (err) {
    next(err);
  }
};

export const updateTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { description, amount } = req.body;

    const updatedTransaction = await transactionService.updateTransaction(
      parseInt(id),
      description,
      parseInt(amount)
    );
    res.status(201).send({ status: 'success', data: updatedTransaction });
  } catch (err) {
    next(err);
  }
};

export const deleteTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await transactionService.deleteTransaction(parseInt(id));
    res.status(201).send({ status: 'success', data: result });
  } catch (err) {
    next(err);
  }
};
