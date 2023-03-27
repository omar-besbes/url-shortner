'use client';

import styles from '@/app/page.module.css';
import { useCallback, useState } from 'react';
import { mutation } from '@/app/mutation';
import { Button, Card, Loading, Note } from '@geist-ui/core';
import { Copy, Link } from '@geist-ui/icons';

export const Shorten = () => {
	const [longURL, setLongURL] = useState<string>();
	const [shortenedURL, setShortenedURL] = useState<string>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>();
	const [isNoteVisible, setNoteVisible] = useState(false);

	const copy = useCallback(async () => {
		if (shortenedURL) {
			await navigator.clipboard.writeText(shortenedURL);
			setNoteVisible(true);
			setTimeout(() => setNoteVisible(false), 1500);
		}
	}, [shortenedURL]);

	const handleClick = useCallback(async () => {
		if (longURL === undefined || longURL === '') {
			setError('You did not input anything');
		} else {
			try {
				new URL(longURL);
				try {
					setLoading(true);
					const url = await mutation(longURL);
					setShortenedURL(url);
				} catch {
					setError('An error occurred. Please, try again.');
				}
			} catch {
				setError('Invalid URL');
			}
		}
		setLoading(false);
		setTimeout(() => setError(undefined), 2000);
	}, [longURL]);

	return (
		<div className={`${styles.center} ${styles.description} flex flex-col gap-5`}>
			<input
				onChange={({ currentTarget: { value } }) => setLongURL(value)}
				placeholder='https://example.com'
				className='w-full'
			/>
			<Button iconRight={<Link />} type='default' onClick={handleClick}>
				Shorten!
			</Button>
			{!loading ?
				<>
					{shortenedURL &&
						<Card>
							<span className='flex gap-12 items-center'>
								<span>{shortenedURL}</span>
								<Copy onClick={copy} className='hover:cursor-pointer' />
							</span>
						</Card>
					}
					<span className='text-red-500'>{error}</span>
				</>
				:
				<Loading> Loading </Loading>
			}
			{isNoteVisible &&
				<Note filled label={false} className='absolute bottom-0 right-0' type='success'>Copied to
					Clipboard!
				</Note>
			}
		</div>
	);
};