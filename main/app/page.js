'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  const params = new URLSearchParams()
  params.set('q', query)
  params.set('category', category)

  const handleSearch = () => {
    router.push(`/search?${params.toString()}`)
    console.log(category, query)
  }
  return (
    <div className='h-[100%] bg-[#10141d] text-white'>
      <header className='flex p-3 border-b border-gray-200 dark:border-gray-800 justify-between items-center bg-white dark:bg-gray-900 sticky top-0 z-40 transition-colors'>
        <div className='flex items-center gap-3 cursor-pointer hover:opacity-80 transition'>
          <Image
            src="/logo.svg"
            alt="Meowgle logo"
            width={40}
            height={40}
            priority
          />
          <p className='font-bold text-lg text-gray-900 dark:text-white'>Meowgle</p>
        </div>
        <nav className='flex gap-8 text-sm items-center '>
          <Link href={'#'} className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition font-medium'>About</Link>
          <Link href={'#'} className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition font-medium'>Docs</Link>
          <button className='border rounded-2xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition font-medium p-3'>LogIn/SignUp</button>
        </nav>
      </header>

      <main className='relative isolate flex min-h-[calc(100vh-9rem)] flex-1 overflow-hidden bg-[#111722] px-4 py-8 text-white sm:px-8 sm:py-10 lg:px-12 lg:py-12'>
        <div className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'>
          <div className='absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl sm:h-[28rem] sm:w-[28rem]' />
          <div className='absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-sky-500/10 blur-3xl' />
          <div className='absolute inset-x-0 top-0 h-px bg-cyan-300/20' />
          <div className='absolute left-8 top-20 hidden select-none font-mono text-[12px] leading-8 text-slate-700/60 lg:block'>
            <p>const search = async (query) =&gt; {'{'}</p>
            <p className='pl-5'>return await index.find(query)</p>
            <p>{'}'}</p>
            <p className='mt-5'>Docker compose for MERN stack</p>
            <p>Java vs Kotlin 2024</p>
            <p>Best frontend framework?</p>
          </div>
          <div className='absolute right-10 top-20 hidden select-none font-mono text-[13px] leading-10 text-slate-700/60 lg:block'>
            <p>Hunt Down Code. Instantly.</p>
            <p>How to center a div?</p>
            <p>if (indexed) {'{'}</p>
            <p className='pl-5'>build faster with Meowsearch</p>
            <p>{'}'}</p>
            <p className='mt-5'>npm install --save search</p>
            <p>return indexed_results</p>
          </div>
        </div>

        <div className='mx-auto flex w-full max-w-5xl flex-col'>
          <div className='text-center'>
            <p className='mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-300/70 sm:text-xs'>Search the developer web</p>
            <h1 className='text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl'>Hunt Down Code. Instantly.</h1>
            <div className='mx-auto mt-7 flex max-w-3xl items-center gap-3 rounded-2xl border-2 border-cyan-400 bg-slate-900/80 px-4 py-3 text-left shadow-[0_0_22px_rgba(34,211,238,0.35),inset_0_0_24px_rgba(15,23,42,0.8)] sm:gap-4 sm:px-5 sm:py-4'>
              <span className='text-3xl leading-none text-slate-400 sm:text-4xl' aria-hidden='true'>⌕</span>
              <div className='w-full'>
                <p className='truncate text-base text-slate-300 sm:text-xl'>Ask Meowsearch anything...</p>
                <input onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch()
                  }
                }} className='p-2 w-full max-w-100 mt-1 truncate text-xs text-slate-500 sm:text-base border-0' value={query} onChange={(e) => (setQuery(e.target.value))} placeholder='e.g. &quot;python list to dict&quot; or &quot;react hooks examples&quot;' />
              </div>
            </div>
            <div className='mt-3 flex flex-wrap justify-center gap-1 text-xs text-slate-200 sm:gap-3 sm:text-sm'>
              {['⌘ All', '◉ GitHub', '▤ StackOverflow', '● HackerNews', '▣ Dev.io'].map((source, index) => {
                let isActive = category===source
                return(
                <button
                  className={`${isActive?'border-2':''} rounded-lg px-2 py-2 transition sm:px-3 ${index === 0 ? 'bg-slate-700 text-white shadow-inner' : 'hover:bg-slate-800 hover:text-cyan-200'}`}
                  key={source}
                  type='button'
                  onClick={() => {
                    setCategory(source)
                  }}
                >
                  {source}

                </button>
)})}
            </div>
          </div>

          <div className='mt-8 grid items-end gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.9fr)]'>
            <div className='space-y-2.5'>
              {[['◈', 'How to center a div?', 'GitHub'], ['◉', 'Docker compose for MERN stack', 'GitHub'], ['▤', 'Java vs Kotlin 2024', 'StackOverflow'], ['●', 'Best frontend framework?', 'Reddit']].map(([icon, title, source]) => (
                <div key={title} className='flex min-h-12 items-center gap-3 rounded-xl border border-slate-600/70 bg-slate-800/60 px-3 py-2.5 shadow-lg backdrop-blur-sm transition hover:border-cyan-400/70 hover:bg-slate-800 sm:px-4'>
                  <span className='grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-lg text-slate-900'>{icon}</span>
                  <p className='min-w-0 flex-1 truncate text-sm text-slate-100 sm:text-base'>{title}</p>
                  <span className='hidden text-xs text-slate-500 sm:block'>{source}</span>
                  <span className='shrink-0 text-[10px] text-slate-500 sm:text-xs'>◷ days ago</span>
                </div>
              ))}
            </div>
            <div className='relative hidden h-64 overflow-hidden lg:block'>
              <div className='absolute bottom-0 right-5 h-52 w-52 rotate-[-18deg] rounded-[45%_55%_45%_55%] border-4 border-cyan-200/80 shadow-[0_0_28px_rgba(103,232,249,0.45)]' />
              <div className='absolute bottom-20 right-32 h-24 w-24 rounded-full border-4 border-cyan-200/70 shadow-[0_0_22px_rgba(103,232,249,0.35)]' />
              <Image src='/logo.svg' alt='' width={140} height={140} className='absolute bottom-12 right-24 opacity-100 rounded-full' />
              <div className='absolute bottom-0 right-0 h-1 w-4/5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent' />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default page