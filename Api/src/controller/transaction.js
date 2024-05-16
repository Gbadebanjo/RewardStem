import express from 'express';
import User from '../models/users.js';
import Reward from '../models/rewards.js';
import Transaction from '../models/transactions.js';

const router = express.Router();

export const newTransaction = async (req, res) => {
  const userId = req.userId;

  const { distanceTravelled, tripAmount } = req.body;

  const cashBackRate = 0.005;
  const milesPointsRate = 0.005;

  try {
    const userId = req.userId;
    // Fetch all transactions for the user
    const userTransactions = await Transaction.find({ userId: userId });

    // Calculate the total balance up to the current transaction
    const totalBalance = userTransactions.reduce((sum, transaction) => sum + transaction.tripAmount, 0) + Number(tripAmount);

    // Calculate the total distance travelled up to the current transaction
    const totalDistanceTravelled = userTransactions.reduce((sum, transaction) => sum + transaction.distanceTravelled, 0) + Number(distanceTravelled);

    // Create a new transaction
    const newTransaction = await Transaction.create({
      userId,
      distanceTravelled,
      tripAmount,
      totalBalance,
      totalDistanceTravelled
    });

    // Calculate cash back and miles points
    const cashBack = tripAmount * cashBackRate;
    const milesPoints = distanceTravelled * milesPointsRate;
    // Create a new reward
    const newReward = await Reward.create({
      userId,
      transactionId: newTransaction._id,
      cashBack,
      milesPoints
    });

        // Reward is linked to the transaction
        newTransaction.rewards.push(newReward._id);
        await newTransaction.save();

            // Fetch all rewards for the user
    const userRewards = await Reward.find({ userId: userId });

    // Calculate the total cash back and miles points up to the current transaction
    const totalCashBack = userRewards.reduce((sum, reward) => sum + reward.cashBack, 0) + cashBack;
    const totalMilesPoints = userRewards.reduce((sum, reward) => sum + reward.milesPoints, 0) + milesPoints;

    return res.status(200).json({
      status: 200,
      message: 'Transaction and reward created successfully',
      transaction: newTransaction,
      reward: newReward,
      totalCashBack,
      totalMilesPoints
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 500,
      message: 'An error occurred while creating the transaction and reward'
    });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const userId = req.userId;

    const transactions = await Transaction.find({ userId: userId }).populate({
      path: 'rewards',
      model: 'Reward',
      match: { userId: userId }, // Only populate rewards that belong to the user
      select: 'cashBack milesPoints -_id'
    });

    return res.status(200).json({
      status: 200,
      message: 'Transactions retrieved successfully',
      transactions: transactions
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 500,
      message: 'An error occurred while retrieving the transactions'
    });
  }
};

export default router;