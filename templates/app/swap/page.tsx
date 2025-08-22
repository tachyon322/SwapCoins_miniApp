"use client"

import React, { useState, useEffect, Suspense } from 'react'
import Header from '@/components/Header'
import AwaitingCard from '@/components/swapPage/AwaitingCard';
import CheckingCard from '@/components/swapPage/CheckingCard';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Recieve from '@/components/swapPage/Receive';
import Footer from '@/components/Footer';

function generateRandomOrderId(length: number = 8): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function SwapContent() {
  const searchParams = useSearchParams();
  const currency = searchParams.get('currency') || 'Bitcoin';
  const amount = searchParams.get('amount') || '';
  const wallet = searchParams.get('wallet') || '';
  const receiveAmount = searchParams.get('receiveAmount') || '';
  const [orderId, setOrderId] = useState<string>('');
  const [isChecking, setIsChecking] = useState<boolean>(false);

  useEffect(() => {
    setOrderId(generateRandomOrderId());
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="wide-wrap">
        <Header />

        <div className="space-y-3 mt-3">
          <div className="">
            <h1 className='text-3xl text-center mb-7 font-bold'>Order - {orderId}</h1>
            {isChecking ? (
              <CheckingCard />
            ) : (
              <AwaitingCard currency={currency} amount={amount} wallet={wallet} />
            )}
          </div>

          <div className="text-center text-sm">
            <p>The application is executed only as soon as the funds <br />
              are received according to the issued details</p>
          </div>

          <Button
            className='w-full !h-16 bg-blue-500 hover:bg-blue-600 shadow-none'
            onClick={() => setIsChecking(true)}
            disabled={isChecking}
          >
            <h1 className='text-lg'>{isChecking ? 'Checking...' : 'Paid'}</h1>
          </Button>

          <Link href={"/"} className=''>
            <Button className='w-full !h-14 bg-blue-100 text-blue-500 hover:bg-white shadow-none'>
              <h1 className='text-lg'>Cancel</h1>
            </Button>
          </Link>

          <Recieve amount={receiveAmount} />
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <SwapContent />
    </Suspense>
  )
}
