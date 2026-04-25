import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

let cached = global as any;

if (!cached._mongoose) {
  cached._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached._mongoose.conn) return cached._mongoose.conn;

  if (!cached._mongoose.promise) {
    cached._mongoose.promise = mongoose.connect(MONGO_URI).then((m) => m);
  }

  cached._mongoose.conn = await cached._mongoose.promise;
  return cached._mongoose.conn;
}