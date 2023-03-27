export const mutation = async (url: string): Promise<string> => {
	return await fetch('/api/shorten', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
		body: JSON.stringify({ url }),
	}).then(response => response.json())
		.then((data) => data.url);
};