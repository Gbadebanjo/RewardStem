import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toHexString(),
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  totalBalance: {
    type: Number,
    default: 0,
    required: true,
  },
  distanceTravelled: {
    type: Number,
    required: true,
  },
  tripAmount: {
    type: Number,
    required: true,
  },
  totalDistanceTravelled: {  // New field
    type: Number,
    default: 0,
    required: true,
  },
  rewards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reward'
  }]
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;