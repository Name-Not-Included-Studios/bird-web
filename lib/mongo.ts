import { Db, MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || "";
const DB_NAME = process.env.DB_NAME || "";

if (!MONGODB_URI) {
	throw new Error("Add db uri to .env");
}

if (!DB_NAME) {
	throw new Error("Add db name to .env");
}

let cachedClient: MongoClient;
let cachedDb: Db;

export const connect = async () => {
	if (cachedClient && cachedDb) {
		return {
			client: cachedClient,
			db: cachedDb,
		};
	}

	let client = new MongoClient(MONGODB_URI);
	await client.connect();
	let db = client.db(DB_NAME);

	cachedClient = client;
	cachedDb = db;

	return {
		client: cachedClient,
		db: cachedDb,
	};
};
