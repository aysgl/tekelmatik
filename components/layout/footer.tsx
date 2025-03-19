import type React from "react"
import Link from "next/link"

export function Footer() {
    return (
        <footer className="h-[80px] w-full">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-4 md:py-0">
                <div className="text-sm text-muted-foreground flex-shrink-0">
                    {typeof window !== "undefined" ? new Date().getFullYear() : ""} Tekelmatik © Tüm hakları saklıdır.
                </div>
                <nav className="flex gap-4 text-sm text-muted-foreground">
                    <Link
                        href="#"
                        className="transition-colors hover:text-foreground"
                    >
                        Gizlilik
                    </Link>
                    <Link
                        href="#"
                        className="transition-colors hover:text-foreground"
                    >
                        İletişim
                    </Link>
                </nav>
            </div>
        </footer>
    )
}