"use client"

import React, { useState, useEffect } from 'react'
import { CurrenciesList } from '@/data/CurrenciesList'
import Image from 'next/image'

interface CryptoPrices {
    [key: string]: number;
}

export default function Quotes() {
    const [prices, setPrices] = useState<CryptoPrices>({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const newList = CurrenciesList.slice(0, 6)

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                setLoading(true)
                const response = await fetch('http://localhost:5000/api/crypto-prices')
                
                if (!response.ok) {
                    throw new Error('Failed to fetch prices')
                }
                
                const data = await response.json()
                setPrices(data)
                setError(null)
            } catch (err) {
                console.error('Error fetching crypto prices:', err)
                setError('Failed to load prices')
            } finally {
                setLoading(false)
            }
        }

        fetchPrices()
        
        // Обновление инфы каждые 20 секунд
        const interval = setInterval(fetchPrices, 20000)
        
        return () => clearInterval(interval)
    }, [])

    const formatPrice = (price: number): string => {
        if (price >= 1000) {
            return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        } else if (price >= 1) {
            return `$${price.toFixed(2)}`
        } else {
            return `$${price.toFixed(4)}`
        }
    }

    const getPriceDisplay = (symbol: string): string => {
        if (loading) return 'Loading...'
        if (error) return 'Error loading price'
        if (prices[symbol] !== undefined) {
            return formatPrice(prices[symbol])
        }
        return 'Price unavailable'
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Quotes</h1>

            {newList.map((item) => (
                <div key={item.id} className="w-full h-[90px] flex justify-between items-center p-3">
                    <div className="flex">
                        <Image
                            className='mx-2'
                            src={item.img}
                            width={50}
                            height={50}
                            alt='' />
                        <div className="font-bold text-xl">
                            <p>{item.name}</p>
                            <p className={`font-normal ${loading ? 'text-blue-400' : error ? 'text-red-400' : 'text-gray-400'}`}>
                                {getPriceDisplay(item.short)}
                            </p>
                        </div>
                    </div>
                    <div className="w-36 h-full bg-amber-100">Graph</div>
                </div>
            ))}
        </div>
    )
}
