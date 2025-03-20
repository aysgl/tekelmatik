import { shopsApi } from "@/lib/services/shops"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Varsayılan konum (Örnek: İstanbul, Türkiye)
const DEFAULT_LAT = 40.9753667
const DEFAULT_LNG = 29.1181959

export function useGeolocation() {
    const [latitude, setLatitude] = useState<number>(DEFAULT_LAT)
    const [longitude, setLongitude] = useState<number>(DEFAULT_LNG)
    const [permission, setPermission] = useState<PermissionState>('prompt')

    const router = useRouter()
    const queryClient = useQueryClient()

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedLat = Number(localStorage.getItem("latitude")) || DEFAULT_LAT
            const savedLng = Number(localStorage.getItem("longitude")) || DEFAULT_LNG
            setLatitude(savedLat)
            setLongitude(savedLng)
        }
    }, [])

    const getLocation = async () => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude
                const lon = position.coords.longitude

                setLatitude(lat)
                setLongitude(lon)

                if (typeof window !== "undefined") {
                    localStorage.setItem("latitude", lat.toString())
                    localStorage.setItem("longitude", lon.toString())
                }

                const response = await queryClient.fetchQuery({
                    queryKey: ['shops', 'location', lat, lon],
                    queryFn: async () => {
                        const response = await shopsApi.getByLocation({ latitude: lat, longitude: lon })
                        return response.data
                    }
                })

                const area = response.find(shop => shop.shop_area?.administrative_area_level_4)
                if (area?.shop_area?.administrative_area_level_4) {
                    router.push(`/search?q=${area.shop_area.administrative_area_level_4}`)
                }
            },
            (error) => {
                console.error("Konum alınamadı:", error)
            }
        )
    }

    const getPermission = async () => {
        if (!navigator.geolocation) {
            console.error("Geolocation API desteklenmiyor.")
            return false
        }

        try {
            const permissionStatus = await navigator.permissions.query({ name: 'geolocation' })
            setPermission(permissionStatus.state)

            if (permissionStatus.state !== 'granted') {
                // Konumu sıfırlamak için tekrar istemeye zorla
                setLatitude(DEFAULT_LAT)
                setLongitude(DEFAULT_LNG)
                setPermission('prompt') // Zorla tekrar iste
            }

            if (permissionStatus.state === 'granted') {
                getLocation()
                return true
            }
        } catch (error) {
            console.error('İzin hatası:', error)
            return false
        }
    }

    return { getPermission, latitude, longitude, permission }
}

