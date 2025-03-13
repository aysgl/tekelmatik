import type React from "react"
import Link from "next/link"
import { Separator } from "../ui/separator"

export function Footer() {
    return (
        <footer className="container mx-auto px-4">
            <Separator className="my-4" />
            <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
                <p className="text-sm text-muted-foreground">{new Date().getFullYear()} Tekelmatik ©  Tüm hakları saklıdır.</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                    <Link href="#" className="hover:text-foreground">
                        Gizlilik
                    </Link>
                    <Link href="#" className="hover:text-foreground">
                        Şartlar
                    </Link>
                    <Link href="#" className="hover:text-foreground">
                        İletişim
                    </Link>
                </div>
            </div>
        </footer>
    )
}

