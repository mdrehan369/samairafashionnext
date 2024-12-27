import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
    children: React.ReactNode
    className?: string,
    [key: string]: any
}

function Button({
    children,
    className = '',
    ...props
}: Props) {
    return (
        <button
        className={twMerge('bg-secondary-color text-primary-color hover:bg-opacity-80 disabled:bg-opacity-50 border-secondary-color rounded py-4 px-6 hover:bg-transparent transition-colors duration-300 shadow-black text-lg font-medium border-2', className)}
        {...props}>
            {children}
        </button>
    )
}

export default Button