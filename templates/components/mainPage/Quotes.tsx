"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { CurrenciesList } from '@/data/CurrenciesList'
import Image from 'next/image'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { LineChart, Line, XAxis, YAxis } from 'recharts'

interface CryptoPrices {
    [key: string]: number;
}

export default function Quotes() {
    const [prices, setPrices] = useState<CryptoPrices>({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const newList = CurrenciesList.slice(0, 6)

    // Generate mock historical data for charts - memoized to prevent regeneration on every render
    const generateMockData = useMemo(() => {
        return (currentPrice: number, symbol: string) => {
            const data = []
            const basePrice = currentPrice || 1000 // fallback price
            
            // Use symbol as seed for consistent random data
            const seed = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
            const seededRandom = (index: number) => {
                const x = Math.sin(seed + index) * 10000
                return x - Math.floor(x)
            }
            
            for (let i = 23; i >= 0; i--) {
                // Create more dramatic price variations (±15% with some trending)
                const timeProgress = (23 - i) / 23
                const trendFactor = Math.sin(timeProgress * Math.PI * 2) * 0.1
                const randomFactor = (seededRandom(i) - 0.5) * 0.3
                const variation = trendFactor + randomFactor
                
                const price = basePrice * (1 + variation)
                data.push({
                    time: `${i}h`,
                    price: Math.max(basePrice * 0.7, price), // ensure minimum price
                    symbol
                })
            }
            return data
        }
    }, [])

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
                    <div className="w-36 h-full">
                        <MiniChart
                            data={generateMockData(prices[item.short], item.short)}
                            symbol={item.short}
                            currentPrice={prices[item.short]}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

interface MiniChartProps {
    data: Array<{ time: string; price: number; symbol: string }>
    symbol: string
    currentPrice?: number
}

function MiniChart({ data, symbol, currentPrice }: MiniChartProps) {
    if (!data.length || !currentPrice) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded">
                <span className="text-xs text-gray-400">No data</span>
            </div>
        )
    }

    // Determine if price is trending up or down
    const firstPrice = data[0]?.price || 0
    const lastPrice = data[data.length - 1]?.price || 0
    const isPositive = lastPrice >= firstPrice

    const chartConfig = {
        price: {
            label: "Price",
            color: isPositive ? "#10b981" : "#ef4444", // green for up, red for down
        },
    }

    // Calculate price range for proper scaling
    const prices = data.map(d => d.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const padding = (maxPrice - minPrice) * 0.1 // 10% padding

    return (
        <ChartContainer config={chartConfig} className="h-full w-full">
            <LineChart
                data={data}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
                <YAxis
                    hide
                    domain={[minPrice - padding, maxPrice + padding]}
                />
                <XAxis hide />
                <Line
                    type="monotone"
                    dataKey="price"
                    stroke={`var(--color-price)`}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 3, stroke: `var(--color-price)`, strokeWidth: 2 }}
                />
                <ChartTooltip
                    content={
                        <ChartTooltipContent
                            formatter={(value) => [
                                `$${Number(value).toFixed(4)}`,
                                symbol.toUpperCase()
                            ]}
                            labelFormatter={(label) => `${label} ago`}
                        />
                    }
                />
            </LineChart>
        </ChartContainer>
    )
}
