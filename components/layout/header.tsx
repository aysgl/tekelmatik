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
            <div className="container mx-auto flex justify-between items-center py-4">
                <Link href="/" className='w-1/4'>
                    <LogoType className="text-2xl" />
                </Link>

                {!isHomePage && (
                    <div className='w-1/4 order-2 lg:order-none pt-2 md:pt-0'>
                        <SearchBar onSearch={handleSearch} small />
                    </div>
                )}
                <div className='w-1/4 flex justify-end'>
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}
