import React from 'react'
import { Input } from '../ui/input'
import Image from 'next/image'
import { CurrenciesList } from '@/data/CurrenciesList'

interface Receive {
    amount: string
}

export default function Receive({amount}: Receive) {
    return (
        <div className='bg-white border p-4 rounded-[15px] mt-5'>
            <div className="flex justify-between space-y-2">
                <h1 className='text-gray-400'>Receive</h1>
                <Image
                    src="/copy-svgrepo-com.svg"
                    alt="Copy icon"
                    width={24}
                    height={24}
                />
            </div>
            <Input
                value={amount}
                className='!h-14 bg-[#eaf4fd] shadow-none border-none'
                readOnly />
        </div>
    )
}
