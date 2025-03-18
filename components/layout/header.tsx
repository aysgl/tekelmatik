"use client"

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SearchBar } from '../search-bar';
import Link from 'next/link';
import { ModeToggle } from '../combined/mode-toggle';
import LogoType from '@/assets/LogoType';

export function Header() {
    const pathname = usePathname()
    const router = useRouter();
    const [isHomePage, setIsHomePage] = useState(false);

    useEffect(() => {
        setIsHomePage(pathname === '/');
    }, [pathname]);

    const handleSearch = (query: string) => {
        router.push(`/${encodeURIComponent(query)}`);
    };

    return (
        <header className="fixed top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            <div className={`container mx-auto grid ${isHomePage ? 'grid-cols-2' : 'grid-cols-3'} justify-between items-center py-4`}>
                <Link href="/">
                    <LogoType className="text-2xl text-nowrap" />
                </Link>

                {!isHomePage && (
                    <div className="md:col-span-1 col-span-3 order-2 md:order-none pt-2 md:pt-0">
                        <SearchBar onSearch={handleSearch} small />
                    </div>
                )}

                <div className={`flex justify-end ${isHomePage ? 'col-span-1' : 'md:col-span-1 col-span-2'}`}>
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}
