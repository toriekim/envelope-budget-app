import express, { Router } from 'express';
import {
  getAllEnvelopes,
  getEnvelope,
  createEnvelope,
  updateEnvelope,
  deleteEnvelope,
} from '../controllers/envelope.controller';

const router: Router = express.Router();

router.get('/', getAllEnvelopes);

router.get('/:envelopeId', getEnvelope);

router.post('/', createEnvelope);

router.patch('/:envelopeId', updateEnvelope);

router.delete('/:envelopeId', deleteEnvelope);

export default router;
