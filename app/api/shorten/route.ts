import { NextResponse } from 'next/server';

interface bitly {
	long_url: string;
	domain: string;
	group_guid?: string;
}

export async function POST(request: Request) {
	const originalURL: string = await request.json().then((data) => data.url);
	const body = JSON.stringify({
		long_url: originalURL,
		domain: process.env.BITLY_DOMAIN,
	} as bitly);

	console.log(process.env.BITLY_ACCESS_TOKEN);

	const newURL: string = await fetch(process.env.BITLY_ENDPOINT, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${process.env.BITLY_ACCESS_TOKEN}`,
		},
		body,
	}).then((response) => response.json())
		.then((data) => data.link);

	return NextResponse.json({ url: newURL });
}
