"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Locate } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function SearchBar() {
    const [addressSearchText, setAddressSearchText] = useState("")
    const router = useRouter()

    const handleSearch = () => {
        if (addressSearchText) {
            router.push(`/${addressSearchText}`)
        }
    }

    const useCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                () => {
                    router.push("/Your%20Current");
                },
                (error) => {
                    console.error("Location could not be retrieved:", error);
                    alert("Your location could not be accessed. Please check location permissions.");
                }
            );
        } else {
            alert("Your browser does not support location services.");
        }
    };

    return (
        <div className="relative">
            <Input
                type="text"
                placeholder="Enter your address..."
                value={addressSearchText}
                onChange={(e) => setAddressSearchText(e.target.value)}
                className="py-6 text-lg pr-[140px]"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                {addressSearchText ? (
                    <Button onClick={handleSearch}>Search</Button>
                ) : (
                    <Button
                        variant="ghost"
                        className="flex items-center gap-1"
                        onClick={useCurrentLocation}
                    >
                        <Locate />
                        Use My Location
                    </Button>
                )}
            </div>
        </div>
    )
}