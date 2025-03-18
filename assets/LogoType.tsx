"use client"

import { Neonderthaw } from 'next/font/google'

const lemon = Neonderthaw({ subsets: ["latin"], weight: "400" })

function cn(...classes: (string | { [key: string]: boolean })[]) {
    return classes
        .flatMap((cls) => typeof cls === 'string' ? cls : Object.entries(cls).filter(([, value]) => value).map(([key]) => key))
        .filter(Boolean)
        .join(" ")
}

interface LogoProps {
    className?: string;
}

export default function LogoType({ className = '' }: LogoProps) {
    return (
        <div className={cn(
            "flex flex-col items-start",
        )}>
            <h1 className={cn(
                "relative",
                lemon.className,
                className)}>
                <span

                >
                    Liquor Store
                </span>
            </h1>
        </div>
    )
}
