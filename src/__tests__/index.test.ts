import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { IUser } from '../models/user.model';
require('dotenv').config();


export let newUserToken: string;
export let newUser: IUser | null;


export let createdUpdatedAt = {
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
};

describe('event app tests', () => {
  beforeAll(async () => {
    let mongoServer: MongoMemoryServer;
    if (mongoose.connection.readyState === 0) {
      try {
        mongoServer = await MongoMemoryServer.create({
          instance: { dbName: 'event-test' },
        });
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
      }
    }
  });

  describe('01 - AUTHENTICATION', () => {
    require('./auth/register.success.test');
    require('./auth/register.failure.test');
    require('./auth/login.success.test');
    require('./auth/login.failure.test');
  });
  describe('02 - USER', () => {
    require('./user/create.success.test');
    require('./user/create.failure.test');
    require('./user/get.success.test');
    require('./user/get.failure.test');
    require('./user/update.success.test');
    require('./user/update.failure.test');
    require('./user/delete.success.test');
    require('./user/delete.failure.test');
    });
  describe('03 - EVENT', () => {
    require('./event/create.success.test');
    require('./event/create.failure.test');
    require('./event/get.success.test');
    require('./event/get.failure.test');
    require('./event/update.success.test');
    require('./event/update.failure.test');
    require('./event/delete.success.test');
    require('./event/delete.failure.test');
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
});
