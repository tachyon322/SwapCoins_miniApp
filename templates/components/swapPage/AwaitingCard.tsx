"use client"

import React, { useState, useEffect } from 'react'
import { Input } from '../ui/input'
import Image from 'next/image'
import { CurrenciesList } from '@/data/CurrenciesList'
import { Button } from '../ui/button'
import Link from 'next/link'

interface AwaitingCardProps {
    currency: string;
    amount: string;
    wallet: string;
}

export default function AwaitingCard({ currency, amount, wallet }: AwaitingCardProps) {
    // Find the currency data
    const currencyData = CurrenciesList.find(c => c.name === currency);

    // Get wallet address (placeholder for now)
    const walletAddress = currencyData?.wallet || 'Enter your wallet address';

    // Timer state
    const [timeLeft, setTimeLeft] = useState(1200); // 10 minutes in seconds
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0) {
            setIsExpired(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    if (isExpired) {
        return (
            <div className='bg-[#eaf4fd] p-4 rounded-[15px] text-center'>
                <h1 className='text-2xl text-red-500 mb-4'>Time expired</h1>
                <Link href={"/"}>
                    <Button
                        className='w-full !h-12 bg-blue-500 hover:bg-blue-600 shadow-none'
                    >
                        OK
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className='bg-[#eaf4fd] p-4 rounded-[15px]'>
            <div className="flex justify-between space-y-2">
                <h1 className='text-gray-400'>Send {amount} {currencyData?.short || currency}</h1>
                <Image
                    src="/copy-svgrepo-com.svg"
                    alt="Copy icon"
                    width={24}
                    height={24}
                />
            </div>
            <Input
                value={walletAddress}
                className='!h-14 bg-white shadow-none border-none'
                readOnly />

            <div className="flex flex-col mt-3">
                <div className="flex justify-between items-center">
                    <h1 className='text-gray-400'>Time left</h1>
                    <div className="bg-white p-2 rounded-xl">QR-code</div>
                </div>
                <h1 className='text-4xl font-bold text-blue-400'>{formatTime(timeLeft)}</h1>
            </div>

            <div className="mt-12">
                <h1 className='text-gray-400'>Status</h1>
                <h1>Awaiting pay</h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="15 75 170 50" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%" }}>
                    <circle fill="#3390EC" stroke="#3390EC" strokeWidth="2" r="15" cx="35" cy="100">
                        <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0"></animate>
                    </circle>
                    <circle fill="#3390EC" stroke="#3390EC" strokeWidth="2" opacity=".8" r="15" cx="35" cy="100">
                        <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0.05"></animate>
                    </circle>
                    <circle fill="#3390EC" stroke="#3390EC" strokeWidth="2" opacity=".6" r="15" cx="35" cy="100">
                        <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".1"></animate>
                    </circle>
                    <circle fill="#3390EC" stroke="#3390EC" strokeWidth="2" opacity=".4" r="15" cx="35" cy="100">
                        <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".15"></animate>
                    </circle>
                    <circle fill="#3390EC" stroke="#3390EC" strokeWidth="2" opacity=".2" r="15" cx="35" cy="100">
                        <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".2"></animate>
                    </circle>
                </svg>
            </div>
        </div>
    )
}
