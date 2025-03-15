"use client";

import React from "react";
import { calculateDistance } from "@/lib/services/shops";
import { useGeolocation } from "@/hooks/use-geolocation";

export function ShopDistance({ shop }: { shop: { location_lat: number; location_lng: number } }) {
    const { latitude, longitude, error } = useGeolocation();

    const distance = latitude && longitude
        ? calculateDistance(shop.location_lat, shop.location_lng, latitude, longitude)
        : null;

    return (
        <span>
            {error ? "Konum alınamadı" : distance === null ? "Konum alınıyor..." : distance}
        </span>
    );
}
