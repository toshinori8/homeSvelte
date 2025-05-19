import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('public/database.json');

export async function GET({ url }) {
	const action = url.searchParams.get('action');

	if (action === 'read') {
		if (fs.existsSync(filePath)) {
			const data = fs.readFileSync(filePath, 'utf8');
			return new Response(data, {
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			});
		} else {
			return json({ error: 'File not found' });
		}
	}

	return json({ error: 'Unknown or missing action' });
}

export async function POST({ request, url }) {
	const action = url.searchParams.get('action');

	if (action === 'write') {
		const { data } = await request.json();
		try {
			fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
			return json({ status: 'success' });
		} catch (e) {
			return json({ error: 'Failed to write to file' });
		}
	}

	return json({ error: 'Unknown or missing action' });
}
