import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import v1EnvelopeRouter from './v1/routes/envelope.route';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/v1/envelopes', v1EnvelopeRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
