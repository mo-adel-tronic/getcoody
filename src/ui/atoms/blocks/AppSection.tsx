import React from 'react'
interface AppSectionProps {
    children: React.ReactNode,
    withBG?: boolean,
    className?: string
}
export default function AppSection({children, className='', withBG = false} : AppSectionProps) {
  return (
    <section className={`my-8 py-6 ${withBG? 'bg-background shadow-md shadow-slate-300' : ''} ${className}`}>
        {children}
    </section>
  )
}
