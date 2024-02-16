import express, { Router } from 'express';
import {
  getAllEnvelopes,
  getEnvelope,
  createEnvelope,
  updateEnvelope,
  deleteEnvelope,
  transferEnvelopeBalance,
  getEnvelopeTransactions,
  addEnvelopeTransaction,
} from '../controllers/envelope.controller';

const router: Router = express.Router();

router.get('/', getAllEnvelopes);

router.get('/:id', getEnvelope);

router.post('/', createEnvelope);

router.patch('/:id', updateEnvelope);

router.delete('/:id', deleteEnvelope);

router.get('/:id/transactions', getEnvelopeTransactions);

router.post('/:id/transactions', addEnvelopeTransaction);

router.post('/:fromId/transfer/:toId', transferEnvelopeBalance);

export default router;
