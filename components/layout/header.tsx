"use client"

import React, { useEffect, useState } from 'react';
import Logo from '@/assets/Logo';
import { useRouter } from 'next/navigation';
import { SearchBar } from '../search-bar';
import Link from 'next/link';
import { ModeToggle } from '../combined/mode-toggle';

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
        <header className="fixed top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex justify-between items-center py-4">
                <Link href="/">
                    <Logo className="text-2xl" showIcons={false} />
                </Link>

                {!isHomePage && (
                    <SearchBar onSearch={handleSearch} small />
                )}

                <ModeToggle />
            </div>
        </header>
    );
}
