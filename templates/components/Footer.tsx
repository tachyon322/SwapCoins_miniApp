import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import logoImage from "@/public/static/images/logo-footer.svg";

export default function Footer() {
    return (
        <div className='flex flex-col mb-16 items-center justify-center space-y-5 border-t border-gray-300 pt-5'>
            
            <Link href={"/"}>
                <Image
                    src={logoImage}
                    alt="Hero"
                    width={150}
                    height={90}
                />
            </Link>
            <p className='text-xs text-gray-400'>© 2025 SwapCoins. All rights reserved</p>

            <p className='text-xs underline text-gray-400'>Privacy Policy</p>
        </div>
    )
}

