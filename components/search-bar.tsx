"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Locate } from "lucide-react"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { useGeolocation } from "@/hooks/use-geolocation"
import { cn } from "@/lib/utils"

interface SearchBarProps {
    onSearch?: (query: string) => void
    small?: boolean
}

export function SearchBar({ onSearch, small }: SearchBarProps) {
    const [search, setSearch] = useState("")
    const router = useRouter()
    const { latitude, longitude } = useGeolocation();

    const handleSearch = useCallback(() => {
        if (search) {
            onSearch?.(search)
            router.push(`/search?q=${search}`)
        }
    }, [search, onSearch, router])

    const useCurrentLocation = useCallback(() => {
        if (latitude && longitude) {
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`) // ns api hazırlanacak merve 
                .then(res => res.json())
                .then(data => {
                    const district = data.address.suburb?.split(' ')[0]
                    if (district) {
                        router.push(`/search?q=${district}`)
                    }
                })
                .catch(() => {
                    alert("Could not determine location name")
                })
        }
    }, [latitude, longitude, router])

    return (
        <div className="relative">
            <Input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={cn(
                    "pr-[140px]",
                    !small && "py-6 text-lg"
                )}
            />
            <div className={cn(
                "absolute top-1/2 -translate-y-1/2",
                small ? "right-0.5" : "right-2"
            )}>                {search ? (
                <Button onClick={handleSearch}>Search</Button>
            ) : (
                <Button
                    variant="ghost"
                    className="flex items-center"
                    onClick={useCurrentLocation}
                    size={small ? "sm" : "default"}
                >
                    <Locate />
                    Use My Location
                </Button>
            )}
            </div>
        </div>
    )
}