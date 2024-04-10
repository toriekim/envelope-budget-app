import { Router } from 'express';
import envelopeRouter from './envelope.route';
import transactionRouter from './transaction.route';
import docsRouter from './docs.route';

const routes = Router();

routes.use('/docs', docsRouter);
routes.use('/envelopes', envelopeRouter);
routes.use('/transactions', transactionRouter);

export default routes;
