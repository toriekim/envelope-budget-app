/**
 * @swagger
 * tags:
 *   name: Envelopes
 *   description: API to manage budget envelopes
 * components:
 *   schemas:
 *     Envelope:
 *       type: object
 *       required:
 *         - title
 *         - budget
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the envelope.
 *         title:
 *           type: string
 *           description: The unique title of the envelope.
 *         budget:
 *           type: integer
 *           description: How much is the budget?
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date of the record creation.
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date of the record update.
 *       example:
 *          id: 1
 *          title: Groceries
 *          budget: 300
 *          createdAt: 2024-02-16 06:12:15.048
 */
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

/**
 * @swagger
 * /api/v1/envelopes:
 *   get:
 *     summary: Get all envelopes
 *     produces:
 *       - application/json
 *     tags:
 *       - Envelopes
 *     responses:
 *       "200":
 *         description: Returns a list of all envelopes
 */
router.get('/', getAllEnvelopes);

/**
 * @swagger
 * /api/v1/envelopes/{id}:
 *    get:
 *      summary: Get an envelope by its ID
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: envelope id
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "200":
 *          description: Returns an envelope along with its data
 *        "404":
 *          description: Envelope not found
 *        "500":
 *          description: Internal server error
 */
router.get('/:id', getEnvelope);

/**
 * @swagger
 * /api/v1/envelopes:
 *    post:
 *      summary: Creates a new envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      requestBody:
 *        description: Data for new envelope
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                budget:
 *                  type: integer
 *              example:
 *                title: Utilities
 *                budget: 300
 *      responses:
 *        "201":
 *          description: Returns created envelope
 *        "500":
 *          description: Internal server error
 */
router.post('/', createEnvelope);

/**
 * @swagger
 * /api/v1/envelopes/{id}:
 *    patch:
 *      summary: Updates an existing envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: envelope ID
 *          type: integer
 *          required: true
 *          example: 1
 *      requestBody:
 *        description: Data for new envelope
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                budget:
 *                  type: integer
 *              example:
 *                title: Utilities
 *                budget: 300
 *      responses:
 *        "201":
 *          description: Returns updated envelope
 *        "404":
 *          description: Envelope not found
 *        "500":
 *          description: Internal server error
 */
router.patch('/:id', updateEnvelope);

/**
 * @swagger
 * /api/v1/envelopes/{id}:
 *    delete:
 *      summary: Deletes an individual envelope
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Envelope ID to delete
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "204":
 *          description: Envelope deleted
 *        "500":
 *          description: Internal server error
 *        "404":
 *          description: Envelope not found
 */
router.delete('/:id', deleteEnvelope);

/**
 * @swagger
 * /api/v1/envelopes/{id}/transactions:
 *    get:
 *      summary: Get envelope transactions by ID
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: envelope id
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "200":
 *          description: Returns a an envelope along with its data
 *        "404":
 *          description: Envelope not found
 *        "500":
 *          description: Internal server error
 */
router.get('/:id/transactions', getEnvelopeTransactions);

/**
 * @swagger
 * /api/v1/envelopes/{id}/transactions:
 *    post:
 *      summary: Creates a new envelope transaction
 *      produces:
 *        - application/json
 *      tags:
 *        - Envelopes
 *      parameters:
 *        - in: path
 *          name: id
 *          description: envelope id
 *          type: integer
 *          required: true
 *          example: 1
 *      requestBody:
 *        description: Data for new envelope transaction
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                amount:
 *                  type: integer
 *              example:
 *                title: Pizza
 *                amount: 15
 *      responses:
 *        "201":
 *          description: Returns created envelope
 *        "500":
 *          description: Internal server error
 */
router.post('/:id/transactions', addEnvelopeTransaction);

router.post('/:fromId/transfer/:toId', transferEnvelopeBalance);

export default router;
