"use client"

import React, { useState } from 'react'
import { Input } from '../ui/input'
import Image from 'next/image'

interface Receive {
    amount: string
}

export default function Receive({amount}: Receive) {
    const [copied, setCopied] = useState(false);

    // Copy to clipboard function
    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };
    return (
        <div className='bg-white border p-4 rounded-[15px] mt-5'>
            <div className="flex justify-between space-y-2">
                <h1 className='text-gray-400'>Receive</h1>
                <div
                    className="cursor-pointer hover:opacity-70 transition-opacity"
                    onClick={() => copyToClipboard(amount)}
                    title={copied ? "Copied!" : "Copy amount"}
                >
                    <Image
                        src="/copy-svgrepo-com.svg"
                        alt="Copy icon"
                        width={24}
                        height={24}
                    />
                </div>
            </div>
            <Input
                value={amount}
                className='!h-14 bg-[#eaf4fd] shadow-none border-none cursor-pointer hover:bg-blue-50 transition-colors'
                readOnly
                onClick={() => copyToClipboard(amount)}
                title={copied ? "Copied!" : "Click to copy amount"}
            />
            {copied && (
                <div className="text-green-600 text-sm mt-1">
                    Copied to clipboard!
                </div>
            )}
        </div>
    )
}
