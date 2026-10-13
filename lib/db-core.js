import mongoose from "mongoose";

const globalWithMongoose = globalThis;

if (!globalWithMongoose.learnindMongoose) {
  globalWithMongoose.learnindMongoose = { connection: null, promise: null };
}

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  const cache = globalWithMongoose.learnindMongoose;
  if (cache.connection?.readyState === 1) return cache.connection;

  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
    });
  }

  try {
    const connection = await cache.promise;
    cache.connection = connection.connection;
    return cache.connection;
  } catch (error) {
    cache.promise = null;
    throw error;
  }
}
