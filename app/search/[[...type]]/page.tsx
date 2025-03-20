"use client"

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSearchParams, useParams } from "next/navigation";
import { useInfiniteShops } from "@/hooks/use-shops";
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic";
import { Loading } from "@/components/loading";
import { ShopCardSkeleton } from "@/components/shop-card-skeleton";

const LeafletMap = dynamic(() => import('@/components/leafleft-map'), {
    loading: () => <Loading />,
    ssr: false,
})

const ShopCard = dynamic(() => import('@/components/shop-card').then((mod) => mod.ShopCard), {
    loading: () => <ShopCardSkeleton />,
    ssr: true,
});

const EmptyData = dynamic(() => import('@/components/empty-data').then(mod => mod.EmptyData), { ssr: false })

const List = dynamic(() => import("lucide-react").then(mod => mod.List), { ssr: false });
const Map = dynamic(() => import("lucide-react").then(mod => mod.Map), { ssr: false });


export default function SearchPage() {
    const [viewMode, setViewMode] = useState<"list" | "map">("list")
    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: '100px'
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

    useEffect(() => {
        if (viewMode === "map" && shops?.pages.length === 0) {
            fetchNextPage();
        }
    }, [viewMode, shops?.pages.length, fetchNextPage]);


    const mapCenter = useMemo<[number, number]>(() => {
        if (!shops?.pages[0]?.data?.length) return [41.015137, 28.979530];
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

            <AnimatePresence mode="wait">
                {viewMode === "list" ? (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.4,
                        }}
                    >
                        <div className="grid gap-4 min-h-40">
                            {isLoading ? (
                                <ShopCardSkeleton />
                            ) : (
                                shops?.pages.map((data, i) =>
                                    data.data?.length > 0 ? (
                                        data.data.map((shop) => <ShopCard key={shop.id} shop={shop} />)
                                    ) : (
                                        <EmptyData key={i} />
                                    )
                                )
                            )}
                            <div ref={ref}>
                                {isFetchingNextPage && <ShopCardSkeleton />}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="map"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.4,
                        }}
                    >
                        <div className="rounded">
                            <Card className="bg-muted w-full py-0">
                                <CardContent className="h-full p-0 overflow-hidden">
                                    <LeafletMap center={mapCenter} data={shops?.pages.flatMap(page => page?.data) ?? []} />
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
