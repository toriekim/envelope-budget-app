import { NextFunction, Request, Response } from 'express';
import * as envelopeService from '../services/envelope.service';

export const getAllEnvelopes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allEnvelopes = await envelopeService.getAllEnvelopes();
    res.status(200).send({ status: 'success', data: allEnvelopes });
  } catch (err) {
    next(err);
  }
};

export const getEnvelope = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: 'FAILED',
        data: { error: "Parameter 'id' cannot be empty" },
      });
    }

    const envelope = await envelopeService.getEnvelope(parseInt(id));
    res.status(200).send({ status: 'success', data: envelope });
  } catch (err) {
    next(err);
  }
};

export const createEnvelope = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, budget } = req.body;

    if (!title || !budget) {
      return res.status(400).send({
        status: 'FAILED',
        data: {
          error:
            "One of the following keys is missing or is empty in req body: 'title', 'budget",
        },
      });
    }

    const newEnvelope = {
      title,
      budget,
    };
    const createdEnvelope = await envelopeService.createEnvelope(newEnvelope);
    res.status(201).send({ status: 'success', data: createdEnvelope });
  } catch (err) {
    next(err);
  }
};

export const updateEnvelope = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body,
      params: { id },
    } = req;

    if (!id) {
      return res.status(400).send({
        status: 'FAILED',
        data: { error: "Parameter 'id' cannot be empty" },
      });
    }

    const updatedEnvelope = await envelopeService.updateEnvelope(
      parseInt(id),
      body
    );
    res.status(200).send({ status: 'success', data: updatedEnvelope });
  } catch (err) {
    next(err);
  }
};

export const deleteEnvelope = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: 'FAILED',
        data: { error: "Parameter 'id' cannot be empty" },
      });
    }

    const deleted = await envelopeService.deleteEnvelope(parseInt(id));
    if (deleted.id) res.status(200).send({ status: 'success', data: deleted });
    else throw new Error();
  } catch (err) {
    next(err);
  }
};

export const getEnvelopeTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const transactions = await envelopeService.getEnvelopeTransactions(
      parseInt(id)
    );
    res.status(200).send({ status: 'success', data: transactions });
  } catch (err) {
    next(err);
  }
};

export const addEnvelopeTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { description, amount } = req.body;

    const result = await envelopeService.addEnvelopeTransaction(
      parseInt(id),
      description,
      parseInt(amount)
    );

    res.status(201).send({ status: 'success', data: result });
  } catch (err) {
    next(err);
  }
};

export const transferEnvelopeBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fromId, toId } = req.params;
    const { amount } = req.body;

    const updatedEnvelopes = await envelopeService.transferBalance(
      parseInt(fromId),
      parseInt(toId),
      amount
    );
    res.status(201).send({ status: 'success', data: updatedEnvelopes });
  } catch (err) {
    next(err);
  }
};
