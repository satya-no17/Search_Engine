import Results from '@/components/results'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async ({ searchParams }) => {
  const queryData = await searchParams
  const query = queryData.q
  const category = queryData.category
  let results = [];
  try {
    const res = await fetch(`http://localhost:5000/query/search?q=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`, {
      method: 'GET',
      cache: 'no-store'
    })
    const data = await res.json()
    results = Array.isArray(data) ? data : [];
    console.log(results)
  } catch (err) {
    console.error(err)
  }
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-950'>
      <header className='sticky top-0 z-40 flex flex-col gap-3 border-b border-gray-200 bg-white p-3 transition-colors dark:border-gray-800 dark:bg-gray-900 md:flex-row md:items-center md:justify-between'>
        <div className='flex items-center justify-between gap-3 md:justify-start'>
          <div className='flex items-center gap-3 cursor-pointer transition hover:opacity-80'>
            <Image
              src="/logo.svg"
              alt="Meowgle logo"
              width={40}
              height={40}
              priority
            />
            <p className='text-lg font-bold text-gray-900 dark:text-white'>Meowgle</p>
          </div>

          <nav className='flex md:hidden'>
            <button className='border rounded-2xl p-3 text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'>LogIn/SignUp</button>
          </nav>
        </div>

        <div className='w-full md:max-w-xl md:flex-1'>
          <input
            className='w-full rounded-full border border-gray-200 bg-white p-3 text-gray-900 placeholder:text-gray-500 focus:border-gray-400 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:placeholder:text-gray-400'
            placeholder={query || 'Search...'}
            defaultValue={query || ''}
          />
        </div>

        <nav className='hidden md:flex md:items-center md:gap-8'>
          <button className='border rounded-2xl p-3 text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'>LogIn/SignUp</button>
        </nav>
      </header>
      {results.length === 0 ? (
        <div className=''>
          <div className='flex gap-8 p-3 w-full'>
            <p>AI mode</p>
            <Link href={`/search?q=${query}&category=all`}><p className={category === 'all' ? 'text-blue-500 cursor-pointer' : 'cursor-pointer'}> All</p></Link>
            <Link href={`/search?q=${query}&category=github`}><p className={category === 'github' ? 'text-blue-500 cursor-pointer' : 'cursor-pointer'}> Github</p></Link>
            <Link href={`/search?q=${query}&category=devto`}><p className={category === 'devto' ? 'text-blue-500 cursor-pointer' : 'cursor-pointer'}> Dev.to</p></Link>
            <Link href={`/search?q=${query}&category=hackernews`}><p className={category === 'hackernews' ? 'text-blue-500 cursor-pointer' : 'cursor-pointer'}> HackerNews</p></Link>
            <Link href={`/search?q=${query}&category=stackoverflow`}><p className={category === 'stackoverflow' ? 'text-blue-500 cursor-pointer' : 'cursor-pointer'}> StackOverflow</p></Link>
            <Link href={`/search?q=${query}&category=reddit`}><p className={category === 'reddit' ? 'text-blue-500 cursor-pointer' : 'cursor-pointer'}> Reddit</p></Link>
          </div>
          <p className='w-full h-screen flex items-center justify-center text-gray-500 dark:text-gray-400'>No results found</p>
        </div>
      ) : (
        <Results results={results} category={category} query={query} />
      )}
    </div>
  )
}

export default page