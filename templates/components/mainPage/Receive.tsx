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
import { Input } from '../ui/input';

interface ReceiveProps {
   receiveCurrency: string;
   setReceiveCurrency: (currency: string) => void;
   calculatedAmount: string;
   walletAddress: string;
   setWalletAddress: (address: string) => void;
   isWalletValid: boolean;
   walletValidationMessage: string;
   walletTouched: boolean;
   setWalletTouched: (touched: boolean) => void;
 }

export default function Recieve({ receiveCurrency, setReceiveCurrency, calculatedAmount, walletAddress, setWalletAddress, isWalletValid, walletValidationMessage, walletTouched, setWalletTouched }: ReceiveProps) {

   const handleCurrencyChange = (value: string) => {
     setReceiveCurrency(value);
   };

  const handleWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(e.target.value);
    if (!walletTouched) {
      setWalletTouched(true);
    }
  };

   return (
     <div className='bg-[#eaf4fd] rounded-[15px] mt-4 p-4 space-y-3'>
       <div className="space-y-2">
         <h1>Receive</h1>
         <Select value={receiveCurrency} onValueChange={handleCurrencyChange}>
          <SelectTrigger className="w-full !h-14 bg-white shadow-none">
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

      <div className="space-y-2">
        <h1>You will receive</h1>
        <Input
          className='!h-14 bg-white'
          value={calculatedAmount}
          disabled={true}
          placeholder="0.000000"
        />
      </div>

      <div className="space-y-2">
        <h1>Your wallet</h1>
        <Input
          className={`!h-14 bg-white ${!isWalletValid && walletTouched && walletAddress ? 'border-red-500' : ''}`}
          placeholder='0x4f5e2e578b877ba839b71617866e33e282305645'
          value={walletAddress}
          onChange={handleWalletChange}
        />
        {!isWalletValid && walletValidationMessage && walletTouched && (
          <p className="text-red-500 text-sm mt-1">{walletValidationMessage}</p>
        )}
      </div>
    </div>
  )
}
