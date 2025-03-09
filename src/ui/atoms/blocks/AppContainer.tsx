import React from 'react'
interface AppContainerProps {
    children: React.ReactNode;
    lgChildrenWidth?: string
    wrap?: boolean 
    reverseCol?: boolean
    align?: string
    lgAlign?: string
    className?: string
}

export default function AppContainer({
    children,
    lgChildrenWidth = '*:lg:w-1/2',
    wrap = false,
    reverseCol = true,
    align = 'text-center',
    lgAlign = 'lg:text-start',
    className = ''
} : AppContainerProps) {
  return (
    <div className={`flex ${reverseCol? 'flex-col-reverse' : 'flex-col'} lg:flex-row *:w-full ${lgChildrenWidth} container ${align} ${lgAlign} ${wrap ? 'flex-wrap' : 'flex-nowrap'} ${className}`}>
      {children}
    </div>
  )
}