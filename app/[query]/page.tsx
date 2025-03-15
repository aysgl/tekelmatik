"use client"

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { List, Map, MapPin, Navigation, Phone, Star } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useShopsByQuery } from "@/hooks/use-shops";
import { isShopOpenNow } from "@/lib/services/shops";
import { ShopDistance } from "../../components/shop-distance";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyData } from "@/components/empty-data";
import LeafletMap from "@/components/leafleft-map";

export default function SearchPage() {
    const [viewMode, setViewMode] = useState<"list" | "map">("list");
    const params = useParams()
    const query = decodeURIComponent(params.query as string)

    const { data: shops, isLoading } = useShopsByQuery(query)

    const mapCenter: [number, number] = (shops?.data?.length ?? 0) > 0
        ? [
            (shops?.data?.reduce((sum, loc) => sum + loc.location_lat, 0) ?? 0) / (shops?.data?.length ?? 1),
            (shops?.data?.reduce((sum, loc) => sum + loc.location_lng, 0) ?? 0) / (shops?.data?.length ?? 1)
        ]
        : [41.015137, 28.979530];

    return (
        <div className="pt-14">
            <Card className="bg-zinc-100 dark:bg-zinc-100/10 mb-6 border-0 shadow-none">
                <CardContent className="flex items-center justify-between">
                    <div>keyword: <span className="underline font-bold">{query}</span> {shops?.data && shops.data.length > 0 && <> için <Badge className="rounded-4xl w-4 h-4 bg-amber-400">{shops.data.length}</Badge> sonuç geldi </>} </div>
                    <div className="flex justify-end items-center">
                        <div className="flex gap-2">
                            <Button
                                variant={viewMode === "list" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setViewMode("list")}
                            >
                                <List className="h-4 w-4 mr-1" />
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
                </CardContent>
            </Card>

            {viewMode === "list" ? (
                <div className="grid gap-4">
                    {isLoading ? (
                        Array(3).fill(0).map((_, i) => (
                            <Card key={i}>
                                <CardContent className="flex">
                                    <Skeleton className="w-[90px] h-[90px] rounded-md mr-4" />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <Skeleton className="h-6 w-[200px]" />
                                            <Skeleton className="h-6 w-[60px]" />
                                        </div>
                                        <Skeleton className="h-4 w-full mt-2" />
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex gap-4">
                                                <Skeleton className="h-4 w-[100px]" />
                                                <Skeleton className="h-4 w-[100px]" />
                                            </div>
                                            <Skeleton className="h-9 w-[100px]" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) :
                        shops?.data && shops.data.length ? (
                            shops.data.map((shop) => (
                                <Card
                                    key={shop.id}
                                >
                                    <CardContent className="flex">
                                        <div className="relative w-[90px] h-[90px] rounded-md overflow-hidden bg-muted mr-4 shrink-0">
                                            <Image
                                                src={shop.photo_url}
                                                alt={shop.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-medium">{shop.name}</h3>

                                                <Badge
                                                    className={isShopOpenNow(shop.shop_hours) ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}
                                                >
                                                    {isShopOpenNow(shop.shop_hours) ? "Open" : "Closed"}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                                <MapPin className="h-3 w-3" />
                                                {shop?.formatted_address}
                                            </p>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                        <span className="text-xs">{shop.rating}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-sm">
                                                        <Navigation className="h-3 w-3" />
                                                        <ShopDistance shop={{ location_lat: shop.location_lat, location_lng: shop.location_lng }} />
                                                    </div>

                                                    {/* {shop.isOpen ? (
                                                    <span className="text-xs text-muted-foreground">Closing: {shop.closingTime}</span>
                                                ) : (
                                                    <span className="text-xs text-muted-foreground">Currently Closed</span>
                                                )} */}
                                                </div>
                                                <Button> <Phone /> {shop.phone}</Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <EmptyData />
                        )}
                </div>
            ) : (
                <div className="rounded">
                    <Card className="bg-muted w-full py-0">
                        <CardContent className="h-full p-0 overflow-hidden">
                            <LeafletMap center={mapCenter} data={shops?.data ?? []} />
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
