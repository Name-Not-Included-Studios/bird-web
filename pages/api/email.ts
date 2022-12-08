import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { connect } from '../../lib/mongo';

interface Body {
	email: string;
}

const schema = z.object({
	email: z.string().email(),
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") return;

	let data: Body;

	try {
		data = schema.parse(JSON.parse(req.body));
	} catch (error) {
		return res.status(400).json({ unique: true });
	}

	try {
		let { db } = await connect();

		const exists = await db.collection("emails").findOne({ email: data.email });

		if (exists) return res.status(400).json({ unique: false });

		await db.collection("emails").insertOne(data);

		return res.status(201).json({ unique: true });
	} catch (error) {
		console.log(error);

		return res.status(500).json({ unique: true });
	}
}
