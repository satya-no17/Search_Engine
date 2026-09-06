import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Results({ results, category, query }) {
    return (
        <div>
            <div className='flex gap-8 p-3 w-full'>
                <p>AI mode</p>
                <Link href={`/search?q=${query}&category=all`}><p className={category === 'all' ? 'text-blue-500 cursor-pointer' : 'cursor-pointer'}> All</p></Link>
                <Link href={`/search?q=${query}&category=github`}><p className={category === 'github' ? 'text-blue-500 cursor-pointer' : 'cursor-pointer'}> Github</p></Link>
                <Link href={`/search?q=${query}&category=devto`}><p className={category === 'devto' ? 'text-blue-500 cursor-pointer' : 'cursor-pointer'}> Dev.to</p></Link>
                <Link href={`/search?q=${query}&category=hackernews`}><p className={category === 'hackernews' ? 'text-blue-500 cursor-pointer' : 'cursor-pointer'}> HackerNews</p></Link>
                <Link href={`/search?q=${query}&category=stackoverflow`}><p className={category === 'stackoverflow' ? 'text-blue-500 cursor-pointer' : 'cursor-pointer'}> StackOverflow</p></Link>
                <Link href={`/search?q=${query}&category=reddit`}><p className={category === 'reddit' ? 'text-blue-500 cursor-pointer' : 'cursor-pointer'}> Reddit</p></Link>
            </div>
            <ul>
                {results.map((result) => (
                    <Link href={result?.url || "#"} className="block px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors" key={result._id}>
                        <div className="flex gap-2 item-center p-3">
                            <Image
                                src={`/${result.source}.png`}
                                alt="logo"
                                width={30}
                                height={30}
                                className="rounded-full"
                            />
                            <div>
                                <h2>{result.source}</h2>
                                <p className="text-xs">{result.url}</p>
                            </div>
                        </div>
                        <h2>{result.title}</h2>
                        <p>{result.url}</p>
                    </Link>
                ))}
            </ul>
        </div>
    )
}