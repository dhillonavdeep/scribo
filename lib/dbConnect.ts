import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Extend the Node.js global object to cache the Mongoose connection
declare global {
  var _mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Use a cached connection to prevent hot-reload issues in development
const globalWithMongoose = global as typeof globalThis & {
  _mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

if (!globalWithMongoose._mongoose) {
  globalWithMongoose._mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
  if (globalWithMongoose._mongoose.conn) {
    return globalWithMongoose._mongoose.conn;
  }

  if (!globalWithMongoose._mongoose.promise) {
    globalWithMongoose._mongoose.promise = mongoose.connect(MONGODB_URI!);

  }

  globalWithMongoose._mongoose.conn = await globalWithMongoose._mongoose.promise;
  return globalWithMongoose._mongoose.conn;
}

export default dbConnect;
