import { MongoClient, type MongoClientOptions } from 'mongodb';

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error('Please define the MONGO_URI environment variable inside .env');
}

const options: MongoClientOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  let cached = globalThis as typeof globalThis & { _mongoClientPromise?: Promise<MongoClient> };
  if (!cached._mongoClientPromise) {
    client = new MongoClient(uri, options);
    cached._mongoClientPromise = client.connect().catch((err) => {
      console.error('Mongo initial connect error (dev cached):', err);
      throw err;
    });
  }
  clientPromise = cached._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect().catch((err) => {
    console.error('Mongo initial connect error:', err);
    throw err;
  });
}

export default clientPromise;
