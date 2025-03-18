"use client";

import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Logo from "@/assets/Logo";
import { SearchBar } from "@/components/search-bar";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter()

    const handleSearch = (query: string) => {
        router.push(`/search?q=${encodeURIComponent(query)}`)
    }

    const popularAddresses = [
        { id: 1, name: 'Istanbul' },
        { id: 2, name: 'Kadikoy' },
        { id: 3, name: 'Besiktas' },
        { id: 4, name: 'Taksim' },
        { id: 5, name: 'Sisli' }
    ]

    return (
        <div className="flex flex-col md:items-center justify-center min-h-[80vh] p-4">
            <div className="w-full md:max-w-[60%] max-w-full">
                <Logo className="text-6xl mb-6" />

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-thin mb-2">Set Your Location</h2>
                    <p className="text-muted-foreground">
                        Find the nearest open liquor stores by setting your location
                    </p>
                </div>

                <div className="space-y-4">
                    <SearchBar onSearch={handleSearch} />

                    <div className="relative">
                        <div className="absolute max-w-[50%] mx-auto inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">popular addresses</span>
                        </div>
                    </div>

                    {/* Popular Addresses */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {popularAddresses.map((address) => (
                            <Button
                                key={address.id}
                                variant="outline"
                                className="flex items-center gap-2"
                                onClick={() => router.push(`/search/${address.name.toLowerCase()}`)}
                            >
                                <MapPin className="h-4 w-4" />
                                {address.name}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
