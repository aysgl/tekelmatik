"use client";

import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Logo from "@/assets/Logo";
import { SearchBar } from "@/components/search-bar";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter()

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-[60%]">
                <Logo showIcons={true} className="text-6xl mb-6" />

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-thin mb-2">Set Your Location</h2>
                    <p className="text-muted-foreground">
                        Find the nearest open liquor stores by setting your location
                    </p>
                </div>

                <div className="space-y-4">
                    <SearchBar />

                    <div className="relative">
                        <div className="absolute max-w-[50%] mx-auto inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">popular addresses</span>
                        </div>
                    </div>

                    {/* Popular Addresses */}
                    <div className="flex justify-center gap-2">
                        <Button
                            variant="outline"
                            className="justify-start"
                            onClick={() => router.push(`/Kadikoy`)}
                        >
                            <MapPin />
                            Kadikoy
                        </Button>
                        <Button
                            variant="outline"
                            className="justify-start"
                            onClick={() => router.push(`Besiktas`)}
                        >
                            <MapPin />
                            Besiktas
                        </Button>
                        <Button
                            variant="outline"
                            className="justify-start"
                            onClick={() => router.push(`/Sisli`)}
                        >
                            <MapPin />
                            Sisli
                        </Button>
                        <Button
                            variant="outline"
                            className="justify-start"
                            onClick={() => router.push(`/Beyoglu`)}
                        >
                            <MapPin />
                            Beyoglu
                        </Button>
                        <Button
                            variant="outline"
                            className="justify-start"
                            onClick={() => router.push(`/Atasehir`)}
                        >
                            <MapPin />
                            Atasehir
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
