import React from 'react'

export default function TopNumbers({ value }: { value: number }) {
  return (
    <div className='w-11 h-14 border border-gray-200 p-1 px-5 rounded-xl flex items-center justify-center'>
        {value}
    </div>
  )
}
