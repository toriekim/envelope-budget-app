import express, { Router } from 'express';
import {
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transaction.controller';

const router: Router = express.Router();

router.get('/', getAllTransactions);

router.get('/:id', getTransactionById);

router.put('/:id', updateTransaction);

router.delete('/:id', deleteTransaction);

export default router;
