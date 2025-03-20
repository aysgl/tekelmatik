"use client";

import { useEffect, useState } from "react";
import { calculateDistance } from "@/lib/services/shops";
import { useGeolocation } from "@/hooks/use-geolocation";

export function ShopDistance({ shop }: { shop: { location_lat: number; location_lng: number } }) {
    const [distance, setDistance] = useState<string | null>("Konum alınıyor...");
    const { latitude, longitude } = useGeolocation();

    console.log("s", shop.location_lat, shop.location_lng);
    console.log("l", latitude, longitude);

    useEffect(() => {
        if (latitude && longitude) {
            console.log("Geolocation available:", latitude, longitude);
            sessionStorage.setItem('userLocation', JSON.stringify({ lat: latitude, lng: longitude }));
            setDistance(calculateDistance(shop.location_lat, shop.location_lng, latitude, longitude));
        }
    }, [latitude, longitude, shop]);

    return distance;
}
