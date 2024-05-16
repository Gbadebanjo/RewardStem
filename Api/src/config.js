import mongoose from 'mongoose';
import { config } from 'dotenv';

config(); // Load environment variables from .env file

const uri = process.env.MONGO_URL || '';

async function connectDB() {
  try {
    if (!uri) {
      throw new Error('MongoDB connection string is not defined.');
    }
    await mongoose.connect(uri);
    console.log('Db connected');
  } catch (err) {
    console.error('db connection failed');
    console.error(err);
  }
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export default connectDB;