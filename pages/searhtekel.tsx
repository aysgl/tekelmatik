"use client"

import { useState, useEffect } from "react"
import { Star, MapPin, Navigation, Map, Locate, List } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/combined/mode-toggle"
import Logo from "@/assets/Logo"

// Example liquor store data
const liquorStores = [
    {
        id: 1,
        name: "Central Liquor",
        address: "Bagdat Street No:123, Kadikoy",
        distance: 0.8,
        isOpen: true,
        closingTime: "24:00",
        rating: 4.7,
        image: "https://placeholder.pics/svg/300",
    },
    {
        id: 2,
        name: "Night Liquor",
        address: "Istiklal Street No:45, Beyoglu",
        distance: 1.2,
        isOpen: true,
        closingTime: "07:00",
        rating: 4.5,
        image: "/placeholder.svg?height=100&width=100",
    },
    {
        id: 3,
        name: "Star Liquor",
        address: "Baglar District No:78, Besiktas",
        distance: 2.5,
        isOpen: true,
        closingTime: "02:00",
        rating: 4.2,
        image: "/placeholder.svg?height=100&width=100",
    },
    {
        id: 4,
        name: "Anadolu Liquor",
        address: "Ataturk Boulevard No:56, Umraniye",
        distance: 3.7,
        isOpen: false,
        closingTime: "22:00",
        rating: 4.0,
        image: "/placeholder.svg?height=100&width=100",
    },
    {
        id: 5,
        name: "Coastal Liquor",
        address: "Coastal Road No:12, Maltepe",
        distance: 4.1,
        isOpen: true,
        closingTime: "05:00",
        rating: 4.8,
        image: "/placeholder.svg?height=100&width=100",
    },
]

export default function LiquorSearchPage() {
    const [searchText, setSearchText] = useState("")
    const [addressSearchText, setAddressSearchText] = useState("")
    const [viewMode, setViewMode] = useState<"list" | "map">("list")
    const [locationSet, setLocationSet] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null)
    const [locationPermissionGranted, setLocationPermissionGranted] = useState(false)

    // Check location permissions
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.permissions.query({ name: "geolocation" }).then((result) => {
                if (result.state === "granted") {
                    setLocationPermissionGranted(true)
                }
            })
        }
    }, [])

    // Set location function
    const setLocation = (address: string) => {
        setSelectedAddress(address)
        setLocationSet(true)
    }

    // Use current location function
    const useCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                () => {
                    setSelectedAddress("Your Current Location")
                    setLocationSet(true)
                    setLocationPermissionGranted(true)
                },
                (error) => {
                    console.error("Location could not be retrieved:", error)
                    alert("Your location could not be accessed. Please check location permissions.")
                },
            )
        } else {
            alert("Your browser does not support location services.")
        }
    }

    // Liquor store filtering
    const filteredLiquorStores = liquorStores
        .filter((store) => {
            const searchMatch =
                store.name.toLowerCase().includes(searchText.toLowerCase()) ||
                store.address.toLowerCase().includes(searchText.toLowerCase())

            return searchMatch
        })
        .sort((a, b) => {
            if (a.isOpen && !b.isOpen) return -1
            if (!a.isOpen && b.isOpen) return 1
            return a.distance - b.distance
        })

    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-10 bg-background ">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Logo className="text-3xl" />
                    <ModeToggle />
                </div>
            </header>

            <main className="container mx-auto px-4 py-6">
                {!locationSet ? (
                    <div className="flex flex-col items-center justify-center min-h-[80vh]">
                        <div className="w-full max-w-[60%]">
                            <Logo showIcons={true} className="text-6xl mb-6" />
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-thin mb-2">Set Your Location</h2>
                                <p className="text-muted-foreground">Find the nearest open liquor stores by setting your location</p>
                            </div>

                            <div className="space-y-4">
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
                                            <Button onClick={() => setLocation(addressSearchText)}>Search</Button>
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

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white px-2 text-muted-foreground">popular addresses</span>
                                    </div>
                                </div>

                                <div className="flex justify-center gap-2">
                                    <Button variant="outline" className="justify-start" onClick={() => setLocation("Kadikoy, Istanbul")}>
                                        <MapPin />
                                        Kadikoy
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="justify-start"
                                        onClick={() => setLocation("Besiktas, Istanbul")}
                                    >
                                        <MapPin />
                                        Besiktas
                                    </Button>
                                    <Button variant="outline" className="justify-start" onClick={() => setLocation("Sisli, Istanbul")}>
                                        <MapPin />
                                        Sisli
                                    </Button>
                                    <Button variant="outline" className="justify-start" onClick={() => setLocation("Beyoglu, Istanbul")}>
                                        <MapPin />
                                        Beyoglu
                                    </Button>
                                    <Button variant="outline" className="justify-start" onClick={() => setLocation("Atasehir, Istanbul")}>
                                        <MapPin />
                                        Atasehir
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <Card className="bg-zinc-100 dark:bg-zinc-100/10 mb-6 border-0 shadow-none">
                            <CardContent className="flex items-center justify-between">
                                <p className="font-light text-2xl">{selectedAddress} <small>change</small></p>
                                <div className="flex justify-end items-center">
                                    <div className="flex gap-2">
                                        <Button
                                            variant={viewMode === "list" ? "outline" : "default"}
                                            size="sm"
                                            onClick={() => setViewMode("list")}
                                        >
                                            <List className="h-4 w-4 mr-1" />
                                            List
                                        </Button>
                                        <Button
                                            variant={viewMode === "map" ? "outline" : "default"}
                                            size="sm"
                                            onClick={() => setViewMode("map")}
                                        >
                                            <Map className="h-4 w-4 mr-1" />
                                            Map
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {viewMode === "list" ? (
                            <div className="grid gap-4">
                                {filteredLiquorStores.length > 0 ? (
                                    filteredLiquorStores.map((store) => (
                                        <Card
                                            key={store.id}
                                        >
                                            <CardContent className="flex">
                                                <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted mr-4 shrink-0">
                                                    <Image
                                                        src={store.image}
                                                        alt={store.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="font-medium">{store.name}</h3>
                                                        <Badge
                                                            className={store.isOpen ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}
                                                        >
                                                            {store.isOpen ? "Open" : "Closed"}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                                        <MapPin className="h-3 w-3" />
                                                        {store.address}
                                                    </p>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <div className="flex items-center gap-1">
                                                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                            <span className="text-xs">{store.rating}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-sm">
                                                            <Navigation className="h-3 w-3" />
                                                            <span>{store.distance} km</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="flex justify-between items-center">
                                                {store.isOpen ? (
                                                    <span className="text-xs text-muted-foreground">Closing: {store.closingTime}</span>
                                                ) : (
                                                    <span className="text-xs text-muted-foreground">Currently Closed</span>
                                                )}
                                            </CardFooter>
                                        </Card>
                                    ))
                                ) : (
                                    <div className="text-center py-12 border rounded-lg">
                                        <h3 className="text-lg font-medium mb-2">No open liquor stores found</h3>
                                        <p className="text-muted-foreground">
                                            Please try a different search term or check the Show All option.
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <Map className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                                    <h3 className="text-lg font-medium">Map View</h3>
                                    <p className="text-sm text-muted-foreground">Nearby open liquor stores will be shown on the map</p>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    )
}
