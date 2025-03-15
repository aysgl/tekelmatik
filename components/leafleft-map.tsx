"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Wine } from 'lucide-react';
import { renderToString } from 'react-dom/server';
import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet';
import { LeafleftMarker } from "./leafleft-marker";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false }) as typeof import("react-leaflet").MapContainer;
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

interface LeafletMapProps {
    center: [number, number];
    data: Array<{
        id: number;
        name: string;
        location_lat: number;
        location_lng: number;
    }>;
}

function ResizeMap() {
    const map = useMap();
    useEffect(() => {
        setTimeout(() => map.invalidateSize(), 100);
    }, [map]);
    return null;
}

export default function LeafletMap({ center, data }: LeafletMapProps) {
    const [L, setL] = useState<typeof import('leaflet') | null>(null);

    useEffect(() => {
        import('leaflet').then(leaflet => setL(leaflet));
    }, []);

    if (!L) return <div>Loading map...</div>;

    const customIcon = L.divIcon({
        html: renderToString(
            <LeafleftMarker color="black" size={60} icon={<Wine color="white" />} />
        ),
        className: 'custom-marker-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 24]
    });

    return (
        <MapContainer className="h-[500px] w-full rounded" center={center} zoom={14} scrollWheelZoom={false}>
            <TileLayer url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}" />
            {data.map(shop => (
                <Marker key={shop.id} position={[shop.location_lat, shop.location_lng]} icon={customIcon}>
                    <Popup>{shop.name}</Popup>
                </Marker>
            ))}
            <ResizeMap />
        </MapContainer>
    );
}
