import React from 'react'

interface H2Props {
    text: string
}
export default function H2({text}: H2Props) {
  return (
    <h2 
                className={`font-cairo 
                text-foreground-title text-2xl font-bold leading-[25px] 
                border-t-2 border-b-2 py-4 my-6
                before:inline-block before:w-[10px] before:h-[10px] before:bg-secondary before:rounded-full before:align-middle before:me-3
                after:inline-block after:w-[10px] after:h-[10px] after:bg-secondary after:rounded-full after:align-middle after:ms-3`}>{text}</h2>
  )
}
