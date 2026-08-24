import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <header className='flex p-4 border-b border-gray-200 dark:border-gray-800 justify-between items-center bg-white dark:bg-gray-900 sticky top-0 z-40 transition-colors'>
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
        <nav className='flex gap-8 text-sm'>
          <Link href={'#'} className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition font-medium'>About</Link>
          <Link href={'#'} className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition font-medium'>Docs</Link>
          <Link href={'#'} className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition font-medium'>GitHub</Link>
          <Link href={'#'} className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition font-medium'>LinkedIn</Link>
          <Link href={'#'} className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition font-medium'>Instagram</Link>
        </nav>
      </header>
    </div>
  )
}

export default page