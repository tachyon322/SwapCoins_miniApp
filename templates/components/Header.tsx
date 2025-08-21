import React from 'react'
import Image from 'next/image'
import logoImage from "@/public/static/images/logo-footer.svg";
import Link from 'next/link';

export default function Header() {

    const userName = "Денис";

    return (
        <div className="flex justify-between items-center">
            <Link href={"/"}>
            <Image
                src={logoImage}
                alt="Hero"
                width={150}
                height={90}
            /></Link>
            <div className="bg-gray-100 p-3 rounded-[15px]">
                <p>{userName}</p>
            </div>
        </div>
    )
}
