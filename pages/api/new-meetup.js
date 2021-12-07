import { MongoClient } from 'mongodb';

async function handler(req, res) {
	if (req.method === 'POST') {
		const data = req.body;
		const { title, description, address, image } = data;

		const client = await MongoClient.connect(process.env.DB_CONFIG)
		const db = client.db();

		const meetupsCollection = db.collection('meetups');
		const result = await meetupsCollection.insertOne({
			title, description, image, address
		})

		client.close();

		res.status(200).json({
			result
		})
	}
}

export default handler;
