"use client"

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { List, Map, MapPin, Navigation, Star } from "lucide-react";
import Image from "next/image";
import { liquorStores } from "@/data/data";
import { useParams } from "next/navigation";

export default function SearchPage() {
    const [viewMode, setViewMode] = useState<"list" | "map">("list");
    const params = useParams()
    const query = params.query as string

    // Filter stores based on query
    const filteredStores = liquorStores.filter((store) =>
        store.name.toLowerCase().includes(query?.toLowerCase()) ||
        store.address.toLowerCase().includes(query?.toLowerCase())
    );

    return (
        <div className="pt-14">
            <Card className="bg-zinc-100 dark:bg-zinc-100/10 mb-6 border-0 shadow-none">
                <CardContent className="flex items-center justify-between">
                    <p className="font-light text-2xl">{query} <small>change</small></p>
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
                    {filteredStores.length > 0 ? (
                        filteredStores.map((store) => (
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

        </div>
    );
}
