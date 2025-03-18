"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchBar } from '../search-bar';
import Link from 'next/link';
import { ModeToggle } from '../combined/mode-toggle';
import LogoType from '@/assets/LogoType';

export function Header() {
    const router = useRouter();
    const [isHomePage, setIsHomePage] = useState(false);

    useEffect(() => {
        setIsHomePage(window.location.pathname === '/');
    }, []);

    const handleSearch = (query: string) => {
        router.push(`/${encodeURIComponent(query)}`);
    };

    return (
        <header className="fixed top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            <div className="container mx-auto grid md:grid-cols-3 grid-cols-2 justify-between items-center py-4">
                <Link href="/">
                    <LogoType className="text-2xl" />
                </Link>

                {!isHomePage && (
                    <div className='col-span-3 md:col-span-1 order-2 lg:order-none pt-2 md:pt-0'>
                        <SearchBar onSearch={handleSearch} small />
                    </div>
                )}
                <div className='flex justify-end'>
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}
