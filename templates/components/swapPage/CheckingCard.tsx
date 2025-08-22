"use client"

import React from 'react'

export default function CheckingCard() {
    return (
        <div className='bg-[#eaf4fd] p-6 rounded-[15px] text-center'>
            <div className="mb-4">
                <h1 className='text-2xl font-bold text-blue-600 mb-2'>Wait, we're checking it</h1>
                <p className='text-gray-600'>Please wait while we verify your payment...</p>
            </div>
            
            
            {/* Alternative loading animation with dots */}
            <div className="flex justify-center space-x-1 mb-4">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            
            <p className='text-sm text-gray-500'>This may take a few moments</p>
        </div>
    )
}