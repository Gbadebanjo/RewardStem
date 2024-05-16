import express from "express";
import { authenticate, validateTransaction } from '../utility/middlewares.js';
import { newTransaction, getTransactions } from '../controller/transaction.js';

const router = express.Router();

router.use(authenticate);
router.post('/new/', validateTransaction, newTransaction);
router.get('/all-transactions', getTransactions);

// Error handling middleware
router.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ error: err.message });
});

export default router;
