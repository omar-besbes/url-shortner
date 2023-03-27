import {Inter} from 'next/font/google'
import styles from './page.module.css'
import {Metadata} from "next";

const inter = Inter({subsets: ['latin']});
export const metadata: Metadata = {
    title: 'URL Shortner'
}

export default function Home() {
    return (
        <main className={styles.main}>
            <div/>

            <div className={`${styles.center} ${styles.description} flex flex-col gap-5`}>
                <h1 className="text-2xl font-bold">SHORTEN URL</h1>
                <input placeholder="https://example.com" className="w-full" type="url"/>
                <button>
                    Shorten!
                </button>
            </div>

            <div/>
        </main>
    )
}
