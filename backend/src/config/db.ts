import { MONGO_URI } from '#constants/env.js';
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');
  } catch (error) {
    console.error('Could not connect to database', error);
    process.exit(1);
  }
};

export default connectDB;
