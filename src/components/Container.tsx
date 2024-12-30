import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
    children: React.ReactNode
    className?: string,
    [key: string]: any
}

function Container({
    children, 
    className,
    ...props
}: Props) {
  return (
    <div className={twMerge(`w-[100vw] box-content h-auto relative min-h-[90vh] text-black`, className)} {...props}>
        {children}
    </div>
  )
}

export default Container