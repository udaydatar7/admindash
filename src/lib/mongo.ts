// lib/mongo.ts

import mongoose, { ConnectOptions } from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/mydatabase';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

async function connectToMongo() {
  const opts: ConnectOptions = {
    // Add any options here if needed, or leave it empty as default
  };

  try {
    await mongoose.connect(MONGODB_URI, opts);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export default connectToMongo;
