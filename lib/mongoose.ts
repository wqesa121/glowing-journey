import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Missing MONGO_URI environment variable');
}

let cached: any = globalThis as any;

if (!cached.mongoose) {
  cached.mongoose = { conn: null, promise: null };
}

async function connectMongoose() {
  if (cached.mongoose && cached.mongoose.conn) {
    return cached.mongoose.conn;
  }

  // Try primary MONGO_URI first
  if (!cached.mongoose.promise) {
    cached.mongoose.promise = mongoose.connect(MONGO_URI!).then((mongooseInstance) => mongooseInstance);
  }

  try {
    cached.mongoose.conn = await cached.mongoose.promise;
    return cached.mongoose.conn;
  } catch (err: any) {
    console.error('Mongoose initial connection error:', err && err.message ? err.message : err);

    // If the error is DNS SRV related (common on some Windows/DNS setups),
    // allow an optional non-SRV fallback via MONGO_NON_SRV env var.
    const nonSrv = process.env.MONGO_NON_SRV;
    const isSrvDnsError = err && (err.code === 'ECONNREFUSED' || err.syscall === 'querySrv');

    if (isSrvDnsError && nonSrv) {
      console.info('Attempting fallback to MONGO_NON_SRV...');
      // Replace the cached promise with a new attempt using non-SRV string
      cached.mongoose.promise = mongoose.connect(nonSrv!).then((mongooseInstance) => mongooseInstance);
      cached.mongoose.conn = await cached.mongoose.promise;
      return cached.mongoose.conn;
    }

    // Otherwise rethrow so the server can fail loudly for debugging
    throw err;
  }
}

export default connectMongoose;
