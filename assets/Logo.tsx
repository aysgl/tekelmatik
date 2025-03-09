"use client"

import { useState, useEffect } from "react"
import { Beer, CupSoda, Martini, Wheat, Wine } from "lucide-react"
import { Neonderthaw } from 'next/font/google'

const lemon = Neonderthaw({ subsets: ["latin"], weight: "400" })

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
}

const icons = [Beer, Wine, Martini, Wheat, CupSoda]

interface LogoProps {
    className?: string;
    showIcons?: boolean;
}

export default function Logo({ className = "", showIcons = false }: LogoProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [prevIndex, setPrevIndex] = useState<number | null>(null)
    const [isTransitioning, setIsTransitioning] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true)

            setTimeout(() => {
                setPrevIndex(activeIndex)
                setActiveIndex((prevIndex) => (prevIndex + 1) % icons.length)
                setIsTransitioning(false)
            }, 1000)
        }, 4000)

        return () => clearInterval(interval)
    }, [activeIndex])

    const CurrentIcon = icons[activeIndex]
    const PrevIcon = prevIndex !== null ? icons[prevIndex] : null

    const iconColors = {
        Beer: "#F59E0B", // Amber
        Wine: "#DC2626", // Red
        Martini: "#8B5CF6", // Purple
        Wheat: "#F97316", // Orange
        CupSoda: "#06B6D4" // Cyan
    }

    return (
        <div className="flex flex-col items-center">
            {showIcons && (
                <div className="relative h-16 w-16 flex items-center justify-center">
                    <div
                        className={cn(
                            "absolute inset-0 bg-primary/10 rounded-full transition-all duration-[1000ms] ease-[cubic-bezier(0.4, 0, 0.2, 1)]",
                            isTransitioning ? "opacity-50 scale-110 blur-sm" : "opacity-0 scale-100 blur-0"
                        )}
                    />

                    {PrevIcon && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <PrevIcon
                                size={58}
                                strokeWidth={.5}
                                color={iconColors[PrevIcon.displayName as keyof typeof iconColors]}
                                className={cn(
                                    "text-primary transition-all duration-[1000ms] ease-[cubic-bezier(0.4, 0, 0.2, 1)]",
                                    isTransitioning
                                        ? "opacity-0 translate-y-[20px] blur-sm"
                                        : "opacity-100 translate-y-0 blur-0"
                                )}
                            />
                        </div>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center">
                        <CurrentIcon
                            size={58}
                            strokeWidth={.5}
                            color={iconColors[CurrentIcon.displayName as keyof typeof iconColors]}
                            className={cn(
                                "text-primary transition-all duration-[1000ms] ease-[cubic-bezier(0.4, 0, 0.2, 1)]",
                                isTransitioning
                                    ? "opacity-100 translate-y-0 blur-0"
                                    : "opacity-0 translate-y-[-20px] blur-sm"
                            )}
                        />
                    </div>
                </div>
            )}

            <h1 className={cn(
                "relative",
                lemon.className,
                className)}>
                <span
                    className={cn(
                        showIcons ? "bg-clip-text text-transparent bg-gradient-to-r transition-all duration-[1000ms]" : ""
                    )}
                    style={showIcons ? {
                        backgroundImage: `linear-gradient(to right, 
                            ${iconColors[CurrentIcon.displayName as keyof typeof iconColors]}, 
                            ${iconColors[PrevIcon?.displayName as keyof typeof iconColors] || iconColors[CurrentIcon.displayName as keyof typeof iconColors]}
                        )`
                    } : undefined}
                >
                    Liquor Store
                </span>
            </h1>
        </div>
    )
}
