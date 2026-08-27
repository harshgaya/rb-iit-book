import { MongoClient } from "mongodb";

// Cached connection so Next.js serverless functions reuse the same
// MongoClient across warm invocations instead of reconnecting every request.
// In dev, stash it on `global` so hot-reload doesn't open new connections.

const uri = process.env.MONGO_URI;
const options = {
  maxPoolSize: 10,
  connectTimeoutMS: 10000,
  serverSelectionTimeoutMS: 10000,
};

let client;
let clientPromise;

if (!uri) {
  throw new Error("Missing MONGO_URI environment variable");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDb() {
  const client = await clientPromise;
  return client.db(); // uses the DB name from the URI
}

export default clientPromise;
