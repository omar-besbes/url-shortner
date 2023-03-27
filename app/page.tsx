import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { Shorten } from '@/app/shorten';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
	title: 'URL Shortner',
};

export default async function Home() {
	return (
		<main className='min-h-screen flex flex-col justify-between items-center p-24'>
			<div />

			<Shorten />

			<div />
		</main>
	);
}
