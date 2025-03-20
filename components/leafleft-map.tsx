"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Beer } from 'lucide-react';
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

    if (!L || !data?.length) return (
        <div className="h-[500px] w-full rounded bg-muted flex items-center justify-center">
            {!L ? 'Loading map...' : 'No locations found'}
        </div>
    )

    const customIcon = L.divIcon({
        html: renderToString(
            <LeafleftMarker color="black" size={60} icon={<Beer color="white" />} />
        ),
        className: 'custom-marker-icon',
        iconSize: [24, 24],
        iconAnchor: [12, 24]
    });

    return (
        <MapContainer className="h-[500px] w-full rounded -z-[0]" center={center} zoom={15} scrollWheelZoom={false}>
            <TileLayer url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}" />
            {data.map((shop, i) => (
                shop?.location_lat && shop?.location_lng &&
                <Marker key={i} position={[shop?.location_lat, shop?.location_lng]} icon={customIcon}>
                    <Popup>{shop?.name}</Popup>
                </Marker>
            ))}
            <ResizeMap />
        </MapContainer>
    );
}
