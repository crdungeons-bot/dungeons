import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
    tls: true,
    tlsAllowInvalidCertificates: false,
    tlsAllowInvalidHostnames: false,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient> | null = null;

if (process.env.NODE_ENV === 'development') {
    let globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
    };

    if (uri && !globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri, options);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    
    if (globalWithMongo._mongoClientPromise) {
        clientPromise = globalWithMongo._mongoClientPromise;
    }
} else if (uri) {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

// Export a promise that will be resolved at runtime
export default (clientPromise || Promise.reject(new Error('Please add your MongoDB URI to .env*'))) as Promise<MongoClient>;