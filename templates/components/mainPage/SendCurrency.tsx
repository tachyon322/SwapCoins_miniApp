"use client"

import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CurrenciesList } from '@/data/CurrenciesList';
import Image from 'next/image';
import { Input } from "@/components/ui/input"

interface SendCurrencyProps {
    sendCurrency: string;
    setSendCurrency: (currency: string) => void;
    amount: string;
    setAmount: (amount: string) => void;
    isAmountValid: boolean;
    validationMessage: string;
    amountTouched: boolean;
    setAmountTouched: (touched: boolean) => void;
}

export default function SendCurrency({ sendCurrency, setSendCurrency, amount, setAmount, isAmountValid, validationMessage, amountTouched, setAmountTouched }: SendCurrencyProps) {

    const handleCurrencyChange = (value: string) => {
        setSendCurrency(value);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAmount(value);
        if (!amountTouched) {
            setAmountTouched(true);
        }
    };

    const selectedCurrency = CurrenciesList.find(currency => currency.name === sendCurrency);

    return (
        <div>
            <div className="border border-gray-300 mt-4 p-4 rounded-[15px]">
                <div className="mb-3 space-y-2">
                    <h1>Send</h1>
                    <Select value={sendCurrency} onValueChange={handleCurrencyChange}>
                        <SelectTrigger className="w-full !h-14">
                            <SelectValue placeholder="Currency" />
                        </SelectTrigger>
                        <SelectContent>
                            {CurrenciesList.map((currency) => (
                                <SelectItem key={currency.id} value={currency.name}>
                                    <Image
                                        src={currency.img}
                                        alt="Hero"
                                        width={30}
                                        height={30}
                                    />
                                    {currency.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="">
                    <div className="flex justify-between space-y-2">
                        <h1>Minimum</h1>
                        <h1 className='text-gray-300'>
                            {selectedCurrency?.minimum} {selectedCurrency?.name}
                        </h1>
                    </div>
                    <Input
                        className={`!h-14 ${!isAmountValid && amountTouched && amount ? 'border-red-500' : ''}`}
                        placeholder={`${selectedCurrency?.minimum} - ${selectedCurrency?.maximum} ${selectedCurrency?.name.split(' ')[0]}`}
                        value={amount}
                        onChange={handleAmountChange}
                        type="number"
                    />
                    {!isAmountValid && validationMessage && amountTouched && (
                        <p className="text-red-500 text-sm mt-1">{validationMessage}</p>
                    )}
                </div>
            </div>
        </div>
    )
}
