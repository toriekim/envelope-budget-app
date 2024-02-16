import { Router } from 'express';
import envelopeRouter from './envelope.route';
import transactionRouter from './transaction.route';

const routes = Router();

routes.use('/envelopes', envelopeRouter);
routes.use('/transactions', transactionRouter);

export default routes;
