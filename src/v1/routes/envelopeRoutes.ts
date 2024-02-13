import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Get all envelopes');
});

router.get('/:envelopeId', (req: Request, res: Response) => {
  res.send('Get an existing envelope');
});

router.post('/', (req: Request, res: Response) => {
  res.send('Create a new envelope');
});

router.patch('/:envelopeId', (req: Request, res: Response) => {
  res.send('Update an existing envelope');
});

router.delete('/:envelopeId', (req: Request, res: Response) => {
  res.send('Delete an existing envelope');
});

export default router;
