import { MongoClient } from "mongodb";

export const connectToMongoDb = async () => {
	const client = await MongoClient.connect(process.env.DB_CONFIG)
	const db = client.db();

	return {
		db,
		client
	}
}
