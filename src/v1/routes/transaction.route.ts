/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API to manage the transactions on budget envelopes
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - amount
 *         - description
 *         - isTransfer
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the transaction.
 *         amount:
 *           type: integer
 *           description: How much was the transaction?
 *         description:
 *           type: string
 *           description: What was the transaction for/from?
 *         isTransfer:
 *           type: boolean
 *           description: Was this transaction a transfer between envelopes?
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
 *          amount: 20
 *          description: Target run for pantry items
 *          isTransfer: false
 *          createdAt: 2024-02-16 06:12:15.048
 */
import express, { Router } from 'express';
import {
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transaction.controller';

const router: Router = express.Router();

/**
 * @swagger
 * /api/v1/transactions:
 *    get:
 *      summary: Get all transactions
 *      produces:
 *        - application/json
 *      tags:
 *        - Transactions
 *      responses:
 *        "200":
 *          description: Returns a list of all transactions
 *
 */
router.get('/', getAllTransactions);

/**
 * @swagger
 * /api/v1/transactions/{id}:
 *    get:
 *      summary: Get a transaction by ID
 *      produces:
 *        - application/json
 *      tags:
 *        - Transactions
 *      parameters:
 *        - in: path
 *          name: id
 *          description: transaction id
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "200":
 *          description: Returns a an envelope along with its data
 *        "404":
 *          description: Transaction not found
 *        "500":
 *          description: Internal server error
 */
router.get('/:id', getTransactionById);

/**
 * @swagger
 * /api/v1/transactions/{id}:
 *    put:
 *      summary: Updates an existing transaction
 *      produces:
 *        - application/json
 *      tags:
 *        - Transactions
 *      parameters:
 *        - in: path
 *          name: id
 *          description: transaction ID
 *          type: integer
 *          required: true
 *          example: 1
 *      requestBody:
 *        description: Data for new transaction
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
 *                amount: 20
 *      responses:
 *        "201":
 *          description: Returns updated envelope
 *        "404":
 *          description: Envelope not found
 *        "500":
 *          description: Internal server error
 */
router.put('/:id', updateTransaction);

/**
 * @swagger
 * /api/v1/transactions/{id}:
 *    delete:
 *      summary: Deletes an individual transaction
 *      produces:
 *        - application/json
 *      tags:
 *        - Transactions
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Transaction ID to delete
 *          type: integer
 *          required: true
 *          example: 1
 *      responses:
 *        "204":
 *          description: Transaction deleted
 *        "500":
 *          description: Internal server error
 *        "404":
 *          description: Transaction not found
 */
router.delete('/:id', deleteTransaction);

export default router;
