import mongoose from 'mongoose';

const RewardSchema = new mongoose.Schema({
  rewardId: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toHexString(),
  },
  userId: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  cashBack: {
    type: Number,
    required: true,
  },
  milesPoints: {
    type: Number,
    required: true,
  },
});

const Reward = mongoose.model('Reward', RewardSchema);

export default Reward;