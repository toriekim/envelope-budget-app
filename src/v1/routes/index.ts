import { Router } from 'express';
import envelopeRouter from './envelope.route';

const routes = Router();

routes.use('/envelopes', envelopeRouter);

export default routes;
