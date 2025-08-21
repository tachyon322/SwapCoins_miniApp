"use client"

import React, { useState, useEffect } from 'react'
import { CurrenciesList } from '@/data/CurrenciesList'
import CheckMark from '@/public/check-mark-circle-2-svgrepo-com.svg';
import TimeIcon from '@/public/time-svgrepo-com.svg';

interface Transaction {
    id: string
    currency: typeof CurrenciesList[0]
    amount: number
    status: 'success' | 'pending'
}

const generateRandomTransaction = (): Transaction => {
    const randomCurrency = CurrenciesList[Math.floor(Math.random() * CurrenciesList.length)]
    const randomAmount = Math.random() * (1000 - 0.01) + 0.01
    const randomStatus: 'success' | 'pending' = Math.random() > 0.2 ? 'success' : 'pending'

    return {
        id: Math.random().toString(36).substr(2, 9),
        currency: randomCurrency,
        amount: parseFloat(randomAmount.toFixed(2)),
        status: randomStatus
    }
}

export default function LastTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        // Генерация транзакций
        const initialTransactions = Array.from({ length: 5 }, generateRandomTransaction)
        setTransactions(initialTransactions)

        // новая транзакция выполняется каждые 6 секунд
        const interval = setInterval(() => {
            setTransactions(prevTransactions => {
                const newTransaction = generateRandomTransaction()
                const updatedTransactions = [newTransaction, ...prevTransactions]

                // Keep only the latest 9 transactions
                return updatedTransactions.slice(0, 9)
            })
        }, 6000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className='w-full mx-auto p-4'>
            <h1 className='text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white'>
                Last Transactions
            </h1>

            <div className='space-y-3'>
                {transactions.map((transaction, index) => (
                    <React.Fragment key={transaction.id}>
                        <div
                            className={`flex items-center justify-between py-4 rounded-lg transition-all duration-200 ${
                                index === 0
                                    ? 'dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                        >
                            {/* Статус слева */}
                            <div className='flex-shrink-0'>
                                <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${
                                    transaction.status === 'success'
                                        ? ' text-blue-400 font-bold '
                                        : '  font-bold'
                                }`}>
                                    <img
                                        src={transaction.status === 'success' ? CheckMark.src : TimeIcon.src}
                                        alt={transaction.status === 'success' ? "check mark" : "time icon"}
                                        className="w-4 h-4 mr-1"
                                    />
                                    {transaction.status.toUpperCase()}
                                </span>
                            </div>

                            {/* Инфа справа */}
                            <div className='flex items-center space-x-3 flex-shrink-0'>
                                <div className='text-right flex items-center gap-2'>
                                    <div className='text-lg font-bold text-gray-900 dark:text-white font-mono'>
                                        {transaction.amount.toFixed(2)}
                                    </div>
                                    <p className=' text-gray-500 dark:text-gray-400'>
                                        {transaction.currency.short}
                                    </p>
                                </div>
                                <img
                                    src={transaction.currency.img}
                                    alt={transaction.currency.name}
                                    className='w-10 h-10 rounded-full'
                                />
                            </div>
                        </div>

                        {/* Серый разделитель */}
                        {index < transactions.length - 1 && (
                            <div className="h-px bg-gray-200 dark:bg-gray-700 mx-4"></div>
                        )}
                    </React.Fragment>
                ))}

                {transactions.length === 0 && (
                    <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
                        No transactions yet...
                    </div>
                )}
            </div>
        </div>
    )
}
