"use client"

import Header from "@/components/Header";
import TopNumbers from "@/components/mainPage/TopNumbers";
import SendCurrency from "@/components/mainPage/SendCurrency";
import Recieve from "@/components/mainPage/Receive";
import { Button } from "@/components/ui/button";
import LastTransactions from "@/components/mainPage/LastTransactions";
import Quotes from "@/components/mainPage/Quotes";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { CurrenciesList } from '@/data/CurrenciesList';

export default function Home() {
  const [sendCurrency, setSendCurrency] = useState("Bitcoin");
  const [receiveCurrency, setReceiveCurrency] = useState("Tether");
  const [amount, setAmount] = useState("");
  const [amountTouched, setAmountTouched] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletTouched, setWalletTouched] = useState(false);
  const [cryptoPrices, setCryptoPrices] = useState<{[key: string]: number}>({});
  const [calculatedAmount, setCalculatedAmount] = useState<string>("");

  // Fetch crypto prices on component mount
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/crypto-prices');
        const prices = await response.json();
        setCryptoPrices(prices);
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
      }
    };

    fetchPrices();
  }, []);

  // Calculate conversion amount
  useEffect(() => {
    if (amount && sendCurrency && receiveCurrency && cryptoPrices) {
      const sendCurrencyData = CurrenciesList.find(c => c.name === sendCurrency);
      const receiveCurrencyData = CurrenciesList.find(c => c.name === receiveCurrency);

      if (sendCurrencyData && receiveCurrencyData) {
        const sendPrice = cryptoPrices[sendCurrencyData.short];
        const receivePrice = cryptoPrices[receiveCurrencyData.short];

        if (sendPrice && receivePrice) {
          const amountNum = parseFloat(amount);
          const convertedAmount = (amountNum * sendPrice) / receivePrice;
          setCalculatedAmount(convertedAmount.toFixed(6));
        } else {
          setCalculatedAmount("");
        }
      }
    } else {
      setCalculatedAmount("");
    }
  }, [amount, sendCurrency, receiveCurrency, cryptoPrices]);

  // Validation logic
  const validationState = useMemo(() => {
    if (!amount || amount.trim() === "") {
      return { isValid: false, message: "Amount is required" };
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return { isValid: false, message: "Please enter a valid positive amount" };
    }

    const selectedCurrency = CurrenciesList.find(currency => currency.name === sendCurrency);
    if (!selectedCurrency) {
      return { isValid: false, message: "Please select a currency" };
    }

    const min = selectedCurrency.minimum;
    const max = selectedCurrency.maximum;

    if (numAmount < min) {
      return { isValid: false, message: `Amount must be at least ${min} ${selectedCurrency.short}` };
    }

    if (numAmount > max) {
      return { isValid: false, message: `Amount must not exceed ${max} ${selectedCurrency.short}` };
    }

    return { isValid: true, message: "" };
  }, [amount, sendCurrency]);

  const isAmountValid = validationState.isValid;

  // Wallet validation logic
  const walletValidationState = useMemo(() => {
    if (!walletAddress || walletAddress.trim() === "") {
      return { isValid: false, message: "Wallet address is required" };
    }

    return { isValid: true, message: "" };
  }, [walletAddress]);

  const isWalletValid = walletValidationState.isValid;

  return (
    <div className="wide-wrap">
      <Header />

      <div className="flex justify-center mt-4">
        <div className="flex space-x-[6px] items-center">
          {[1, 1, 8, 6, 2, 1].map((number, index) => (
            <TopNumbers key={`number-${index}`} value={number} />
          ))}
          <div className="bg-gray-100 px-4 rounded-[15px] h-full flex items-center">
            <p className="">POOL <br /> USDT</p>
          </div>
        </div>
      </div>

      <div className="">
        <SendCurrency
          sendCurrency={sendCurrency}
          setSendCurrency={setSendCurrency}
          amount={amount}
          setAmount={setAmount}
          isAmountValid={isAmountValid}
          validationMessage={validationState.message}
          amountTouched={amountTouched}
          setAmountTouched={setAmountTouched}
        />
        <Recieve
           receiveCurrency={receiveCurrency}
           setReceiveCurrency={setReceiveCurrency}
           calculatedAmount={calculatedAmount}
           walletAddress={walletAddress}
           setWalletAddress={setWalletAddress}
           isWalletValid={isWalletValid}
           walletValidationMessage={walletValidationState.message}
           walletTouched={walletTouched}
           setWalletTouched={setWalletTouched}
         />
      </div>

      <div className="my-5 flex flex-col items-center">
        <p className="text-gray-400 text-center mb-5">By using the site and creating an exchange, <br />
          you agree with Privacy Policy
        </p>

        {isAmountValid && isWalletValid ? (
          <Link href={`/swap?currency=${encodeURIComponent(sendCurrency)}&amount=${encodeURIComponent(amount)}&wallet=${encodeURIComponent(walletAddress)}`} className="w-full">
            <Button className="w-full !h-14 bg-blue-500 hover:bg-blue-600">Swap</Button>
          </Link>
        ) : (
          <Button className="w-full !h-14 bg-gray-400 cursor-not-allowed" disabled>
            Swap
          </Button>
        )}
      </div>

      <Quotes />

      <LastTransactions />
    </div>
  );
}
