import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className='border-t border-gray-200 dark:border-gray-800 py-4 px-4 bg-white dark:bg-gray-900 transition-colors'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Created by <Link href={'#'} className='hover:underline text-gray-900 dark:text-white'>@satya</Link>
                </p>
                <div className='flex gap-6 text-sm'>
                    <Link href={'#'} className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition'>About</Link>
                    <Link href={'#'} className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition'>Docs</Link>
                    <Link href={'#'} className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition'>GitHub</Link>
                    <Link href={'#'} className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition'>LinkedIn</Link>
                    <Link href={'#'} className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition'>Instagram</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer