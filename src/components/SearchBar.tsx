import React from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { twMerge } from 'tailwind-merge'

type Props = {
    className?: string,
    [key: string]: any
}

function SearchBar({
    className,
    ...props
}: Props) {
    return (
        <div className={twMerge('md:w-[40%] w-[80%] flex items-center gap-3 justify-center text-black mt-6', className)}>
            <PiMagnifyingGlass size={30} className='text-gray-500' />
            <input
            className='w-full h-full p-2.5 m-0 rounded placeholder:text-gray-400 border-[1px] border-gray-400 bg-white dark:bg-secondary-color dark:text-white text-sm dark:border-transparent shadow-none focus:ring-0 focus:outline-none dark:focus:border-gray-400 focus:border-black'
            placeholder='Search Here...'
            {...props}
            />
        </div>
    )
}

export default SearchBar