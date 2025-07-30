import mongoose from 'mongoose';
import logger from '../../logger';
import { DatabaseConfig } from '../../../config/envVar';

mongoose.set('strictQuery', false);
const connectDB = async () => {
  try {
    const db = await mongoose.connect(DatabaseConfig.uri as string, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    logger.info(`MongoDB Database Connected with Host: ${db.connection.host}`);
  } catch (error: any) {
    logger.error(`Connection Error => ${error.message}`);
    // Wait and retry connection
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
