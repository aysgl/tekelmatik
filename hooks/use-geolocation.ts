import { shopsApi } from "@/lib/services/shops";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Varsayılan konum (Örnek: İstanbul, Türkiye)
const DEFAULT_LAT = 40.9753667;
const DEFAULT_LNG = 29.1181959;

export function useGeolocation() {
    const [latitude, setLatitude] = useState<number>(DEFAULT_LAT);
    const [longitude, setLongitude] = useState<number>(DEFAULT_LNG);
    const [permission, setPermission] = useState<PermissionState>("prompt");

    const router = useRouter();
    const queryClient = useQueryClient();

    // Tarayıcıda kayıtlı konumu al
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedLat = Number(localStorage.getItem("latitude")) || DEFAULT_LAT;
            const savedLng = Number(localStorage.getItem("longitude")) || DEFAULT_LNG;
            setLatitude(savedLat);
            setLongitude(savedLng);
        }
    }, []);

    const getLocation = async () => {
        if (!navigator.geolocation) {
            console.error("Geolocation API desteklenmiyor.");
            return false;
        }

        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                });
            });

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            setLatitude(lat);
            setLongitude(lon);

            if (typeof window !== "undefined") {
                localStorage.setItem("latitude", lat.toString());
                localStorage.setItem("longitude", lon.toString());
            }

            // API çağrısı yap
            const response = await queryClient.fetchQuery({
                queryKey: ["shops", "location", lat, lon],
                queryFn: async () => {
                    const res = await shopsApi.getByLocation({ latitude: lat, longitude: lon });
                    return res.data;
                },
            });

            // Bölgeyi al ve yönlendir
            const area = response.find((shop) => shop.shop_area?.administrative_area_level_4);
            if (area?.shop_area?.administrative_area_level_4) {
                router.push(`/search?q=${encodeURIComponent(area.shop_area.administrative_area_level_4)}`);
            }

            return true;
        } catch (error) {
            console.error("Konum alınamadı:", error);
            return false;
        }
    };

    const getPermission = async () => {
        if (!navigator.geolocation) {
            console.error("Geolocation API desteklenmiyor.");
            return false;
        }

        try {
            const permissionStatus = await navigator.permissions.query({ name: "geolocation" });
            setPermission(permissionStatus.state);

            if (permissionStatus.state === "granted") {
                return await getLocation();
            } else if (permissionStatus.state === "prompt") {
                return await getLocation();
            } else {
                console.warn("Konum izni reddedildi.");
                return false;
            }
        } catch (error) {
            console.error("İzin hatası:", error);
            return false;
        }
    };

    return { getPermission, latitude, longitude, permission };
}
