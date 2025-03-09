"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Clock, Star, ChevronDown, MapPin, Navigation, Map, Locate } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ToggleMenu } from "@/components/combined/toggle-menu"
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
        image: "/placeholder.svg?height=100&width=100",
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

// Example product data
const products = [
    {
        id: 1,
        name: "Efes Pilsen",
        category: "Beer",
        price: 45.9,
        image: "/placeholder.svg?height=200&width=200",
        alcohol: "5%",
        volume: "50cl",
        rating: 4.2,
    },
    {
        id: 2,
        name: "Jack Daniel's",
        category: "Whiskey",
        price: 650.0,
        image: "/placeholder.svg?height=200&width=200",
        alcohol: "40%",
        volume: "70cl",
        rating: 4.7,
    },
    {
        id: 3,
        name: "Absolut Vodka",
        category: "Vodka",
        price: 450.0,
        image: "/placeholder.svg?height=200&width=200",
        alcohol: "40%",
        volume: "70cl",
        rating: 4.5,
    },
    {
        id: 4,
        name: "Tekirdag Raki",
        category: "Raki",
        price: 350.0,
        image: "/placeholder.svg?height=200&width=200",
        alcohol: "45%",
        volume: "70cl",
        rating: 4.6,
    },
]

export default function LiquorSearchPage() {
    const [searchText, setSearchText] = useState("")
    const [addressSearchText, setAddressSearchText] = useState("")
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedLiquorStore, setSelectedLiquorStore] = useState<number | null>(null)
    const [onlyOpenNow, setOnlyOpenNow] = useState(true)
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
                    // In a real app, you would use an API to convert coordinates to an address
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
            if (onlyOpenNow && !store.isOpen) return false

            const searchMatch =
                store.name.toLowerCase().includes(searchText.toLowerCase()) ||
                store.address.toLowerCase().includes(searchText.toLowerCase())

            return searchMatch
        })
        .sort((a, b) => {
            // Sort open stores first, then by distance
            if (a.isOpen && !b.isOpen) return -1
            if (!a.isOpen && b.isOpen) return 1
            return a.distance - b.distance
        })

    // Product filtering
    const filteredProducts = products.filter((product) => {
        // Search text filter
        const searchMatch =
            product.name.toLowerCase().includes(searchText.toLowerCase()) ||
            product.category.toLowerCase().includes(searchText.toLowerCase())

        // Price range filter
        const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]

        // Category filter
        const categoryMatch = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase()

        return searchMatch && priceMatch && categoryMatch
    })

    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-10 bg-background ">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Logo className="text-3xl" />
                    <ToggleMenu />
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
                    // Main Application Screen (After location is set)
                    <>
                        {/* Location Info */}
                        <div className="flex items-center justify-between bg-muted p-3 rounded-lg mb-6">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-medium">{selectedAddress}</p>
                                    <p className="text-xs text-muted-foreground">Delivery address</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => setLocationSet(false)}>
                                Change
                            </Button>
                        </div>

                        {/* Search Bar */}
                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search for liquor stores or products..."
                                className="pl-10 py-6 text-lg"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>

                        {/* Liquor Stores Section */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Open Liquor Stores</h2>
                                <div className="flex gap-2">
                                    <Button
                                        variant={viewMode === "list" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setViewMode("list")}
                                    >
                                        List
                                    </Button>
                                    <Button
                                        variant={viewMode === "map" ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setViewMode("map")}
                                    >
                                        <Map className="h-4 w-4 mr-1" />
                                        Map
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                                <Button
                                    variant={onlyOpenNow ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setOnlyOpenNow(true)}
                                    className="gap-1"
                                >
                                    <Clock className="h-4 w-4" />
                                    Open Now
                                </Button>
                                <Button
                                    variant={!onlyOpenNow ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setOnlyOpenNow(false)}
                                >
                                    Show All
                                </Button>
                            </div>

                            {viewMode === "list" ? (
                                <div className="grid gap-4">
                                    {filteredLiquorStores.length > 0 ? (
                                        filteredLiquorStores.map((store) => (
                                            <Card
                                                key={store.id}
                                                className={`overflow-hidden ${selectedLiquorStore === store.id ? "border-primary" : ""}`}
                                                onClick={() => setSelectedLiquorStore(store.id)}
                                            >
                                                <div className="flex p-4">
                                                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted mr-4 shrink-0">
                                                        <Image
                                                            src={store.image || "/placeholder.svg"}
                                                            alt={store.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <h3 className="font-medium">{store.name}</h3>
                                                            <Badge
                                                                variant={store.isOpen ? "outline" : "secondary"}
                                                                className={store.isOpen ? "bg-green-100 text-green-800 border-green-200" : ""}
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
                                                </div>
                                                <div className="bg-muted px-4 py-2 flex justify-between items-center">
                                                    {store.isOpen ? (
                                                        <span className="text-xs text-muted-foreground">Closing: {store.closingTime}</span>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground">Currently Closed</span>
                                                    )}
                                                    <div className="flex gap-2">
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button variant="outline" size="sm">
                                                                    Directions
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>Directions</DialogTitle>
                                                                    <DialogDescription>
                                                                        {store.name} - {store.address}
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                                                                    <Map className="h-8 w-8 text-muted-foreground" />
                                                                    <span className="ml-2 text-muted-foreground">Map View</span>
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                        <Button size="sm">View Products</Button>
                                                    </div>
                                                </div>
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
                        </div>

                        {/* Selected Liquor Store Products */}
                        {selectedLiquorStore && (
                            <div className="mt-8 mb-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold">
                                        {liquorStores.find((t) => t.id === selectedLiquorStore)?.name} Products
                                    </h2>
                                    <Button variant="outline" size="sm" onClick={() => setSelectedLiquorStore(null)}>
                                        Show All Stores
                                    </Button>
                                </div>

                                {/* Categories */}
                                <Tabs defaultValue="all" className="mb-6" onValueChange={setSelectedCategory}>
                                    <TabsList className="w-full justify-start overflow-auto">
                                        <TabsTrigger value="all">All Products</TabsTrigger>
                                        <TabsTrigger value="beer">Beer</TabsTrigger>
                                        <TabsTrigger value="raki">Raki</TabsTrigger>
                                        <TabsTrigger value="whiskey">Whiskey</TabsTrigger>
                                        <TabsTrigger value="vodka">Vodka</TabsTrigger>
                                        <TabsTrigger value="wine">Wine</TabsTrigger>
                                        <TabsTrigger value="gin">Gin</TabsTrigger>
                                    </TabsList>
                                </Tabs>

                                {/* Filters and Sorting */}
                                <div className="flex justify-between items-center mb-6">
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button variant="outline" className="gap-2">
                                                <Filter className="h-4 w-4" />
                                                Filter
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent side="left">
                                            <SheetHeader>
                                                <SheetTitle>Filters</SheetTitle>
                                                <SheetDescription>
                                                    Use filters to find the product you are looking for more easily.
                                                </SheetDescription>
                                            </SheetHeader>
                                            <div className="mt-6 space-y-6">
                                                <div className="space-y-2">
                                                    <h3 className="text-sm font-medium">Price Range</h3>
                                                    <div className="pt-4">
                                                        <Slider
                                                            defaultValue={[0, 1000]}
                                                            max={1000}
                                                            step={10}
                                                            value={priceRange}
                                                            onValueChange={setPriceRange}
                                                        />
                                                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                                                            <span>{priceRange[0]} ₺</span>
                                                            <span>{priceRange[1]} ₺</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="text-sm font-medium">Alcohol Percentage</h3>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        <Button variant="outline" size="sm">
                                                            %0-5
                                                        </Button>
                                                        <Button variant="outline" size="sm">
                                                            %5-20
                                                        </Button>
                                                        <Button variant="outline" size="sm">
                                                            %20-40
                                                        </Button>
                                                        <Button variant="outline" size="sm">
                                                            %40+
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="text-sm font-medium">Volume</h3>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        <Button variant="outline" size="sm">
                                                            33cl
                                                        </Button>
                                                        <Button variant="outline" size="sm">
                                                            50cl
                                                        </Button>
                                                        <Button variant="outline" size="sm">
                                                            70cl
                                                        </Button>
                                                        <Button variant="outline" size="sm">
                                                            100cl
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-6 flex gap-2">
                                                <Button className="flex-1">Apply</Button>
                                                <Button variant="outline" onClick={() => setPriceRange([0, 1000])}>
                                                    Clear
                                                </Button>
                                            </div>
                                        </SheetContent>
                                    </Sheet>

                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground">Sort:</span>
                                        <Button variant="outline" className="gap-1">
                                            Price: Low to High
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Product List */}
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {filteredProducts.length > 0 ? (
                                        filteredProducts.map((product) => (
                                            <Card key={product.id} className="overflow-hidden">
                                                <div className="aspect-square relative bg-muted">
                                                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                                                </div>
                                                <CardContent className="p-4">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-medium line-clamp-1">{product.name}</h3>
                                                            <p className="text-sm text-muted-foreground">{product.category}</p>
                                                        </div>
                                                        <Badge variant="secondary" className="text-xs">
                                                            {product.alcohol}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                        <span className="text-xs">{product.rating}</span>
                                                        <span className="text-xs text-muted-foreground ml-auto">{product.volume}</span>
                                                    </div>
                                                </CardContent>
                                                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                                                    <span className="font-bold">{product.price.toFixed(2)} ₺</span>
                                                    <Button size="sm">Add to Cart</Button>
                                                </CardFooter>
                                            </Card>
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center py-12">
                                            <h3 className="text-lg font-medium mb-2">No products found</h3>
                                            <p className="text-muted-foreground">
                                                Please try a different search term or adjust the filters.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    )
}
