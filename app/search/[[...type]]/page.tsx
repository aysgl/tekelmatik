"use client"

import { Fragment, useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { List, Map, MapPin, Navigation, Phone, Star } from "lucide-react";
import Image from "next/image";
import { useSearchParams, useParams } from "next/navigation";
import { useInfiniteShops } from "@/hooks/use-shops";
import { isShopOpenNow } from "@/lib/services/shops";
import { ShopDistance } from "../../../components/shop-distance";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyData } from "@/components/empty-data";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import LeafletMap from "@/components/leafleft-map";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useInView } from 'react-intersection-observer'


export default function SearchPage() {
    const [viewMode, setViewMode] = useState<"list" | "map">("list")
    const { ref, inView } = useInView({
        triggerOnce: false,  // İlk görünümde değil her seferinde tetiklesin
        threshold: 1.0 // Tüm öğe görünür olduğunda tetiklensin
    });

    const searchParams = useSearchParams()
    const params = useParams()

    const queryParam = searchParams.get("q")
    const pathParam = Array.isArray(params.type) ? params.type[0] : params.type
    const searchTerm = queryParam || pathParam
    const searchType = queryParam ? 'query' : 'area'

    const {
        data: shops,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useInfiniteShops(searchTerm || '', searchType)

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);


    const mapCenter = useMemo<[number, number]>(() => {
        if (!shops?.pages?.length) return [41.015137, 28.979530];
        const allLocations = shops.pages.flatMap(page => page.data);
        return [
            allLocations.reduce((sum, loc) => sum + loc.location_lat, 0) / allLocations.length,
            allLocations.reduce((sum, loc) => sum + loc.location_lng, 0) / allLocations.length
        ];
    }, [shops?.pages]);


    return (
        <div className="md:px-0 px-4 md:pt-14 pt-22">
            <Card className="bg-zinc-100 dark:bg-zinc-100/10 mb-3 md:mb-6 border-0 shadow-none">
                <CardContent className="flex items-center justify-between">
                    <div>
                        keyword: <span className="underline font-bold">{searchTerm}</span>
                    </div>
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
                                    <Skeleton className="w-[90px] h-[90px] rounded-md mr-4 min-h-[90px]" />
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
                    ) : (
                        shops?.pages.map((data, i) => (
                            <Fragment key={i}>{
                                data.data?.length > 0 ? data.data.map((shop) => (
                                    <Card key={shop.id}>
                                        <CardContent className="flex">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <div className="relative md:w-[90px] md:h-[90px] w-[70px] h-[70px] rounded-md overflow-hidden bg-muted mr-4 shrink-0">
                                                        {shop.main_photo_url ? (
                                                            <Image
                                                                src={shop.main_photo_url}
                                                                alt={shop.name}
                                                                fill
                                                                className="object-cover"
                                                                sizes="90px"
                                                                loading="lazy"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex text-center items-center justify-center bg-accent text-[10px] p-2">
                                                                {shop.name}
                                                            </div>
                                                        )}
                                                    </div>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-[100vw] md:max-w-[600px] h-[80vh]">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-lg font-semibold">
                                                            {shop.name}
                                                        </DialogTitle>
                                                    </DialogHeader>
                                                    <div className="h-[calc(100%-60px)]">
                                                        <Carousel className="w-full h-full">
                                                            <CarouselContent>
                                                                {shop.shop_photos?.map((photo, index) => (
                                                                    <CarouselItem key={index} className="h-full">
                                                                        <AspectRatio ratio={1} className="bg-muted">
                                                                            <Image
                                                                                src={photo.photo_url}
                                                                                alt={`${shop.name} - Photo ${index + 1}`}
                                                                                fill
                                                                                className="object-cover"
                                                                                sizes="480px"
                                                                                loading={index === 0 ? "eager" : "lazy"}
                                                                            />
                                                                        </AspectRatio>
                                                                    </CarouselItem>
                                                                ))}
                                                            </CarouselContent>
                                                            <CarouselPrevious />
                                                            <CarouselNext />
                                                        </Carousel>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>

                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-medium">{shop.name}</h3>
                                                    <Badge
                                                        className={
                                                            isShopOpenNow(shop.shop_hours)
                                                                ? "bg-green-100 text-green-800 border-green-200"
                                                                : "bg-red-100 text-red-800 border-red-200"
                                                        }
                                                    >
                                                        {isShopOpenNow(shop.shop_hours) ? "Open" : "Closed"}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                                    <MapPin className="h-3 w-3 hidden md:block" />
                                                    {shop?.formatted_address}
                                                </p>
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-1">
                                                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                                            <span className="text-xs">{shop.rating}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-sm">
                                                            <Navigation className="h-3 w-3" />
                                                            <ShopDistance shop={{ location_lat: shop.location_lat, location_lng: shop.location_lng }} />
                                                        </div>
                                                    </div>
                                                    {shop.formatted_phone_number && (
                                                        <Button asChild size="sm">
                                                            <a
                                                                href={`tel:${shop.formatted_phone_number}`}
                                                                className="items-center gap-2"
                                                            >
                                                                <Phone className="h-4 w-4 md:flex hidden" />
                                                                <span>{shop.formatted_phone_number}</span>
                                                            </a>
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )) :
                                    <EmptyData />
                            }
                            </Fragment>
                        ))
                    )}
                    <div ref={ref}>
                        {isFetchingNextPage && <Card>
                            <CardContent className="flex">
                                <Skeleton className="w-[90px] h-[90px] rounded-md mr-4 min-h-[90px]" />
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
                        </Card>}
                    </div>
                </div>
            ) : (
                <div className="rounded">
                    <Card className="bg-muted w-full py-0">
                        <CardContent className="h-full p-0 overflow-hidden">
                            <LeafletMap center={mapCenter} data={shops?.pages.flatMap(page => page.data) ?? []} />
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
