import AppLoader from '@/ui/atoms/media/AppLoader'
import React from 'react'
export default function LoadingClassroom() {
  return (
    <div className='flex items-center justify-center h-screen text-4xl font-bold'>
        <AppLoader />
    </div>
  )
}