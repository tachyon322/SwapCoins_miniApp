import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import logoImage from "@/public/static/images/logo-footer.svg";

export default function Footer() {
    return (
        <div>
            <Link href={"/"}>
                <Image
                    src={logoImage}
                    alt="Hero"
                    width={150}
                    height={90}
                /></Link>
        </div>
    )
}
