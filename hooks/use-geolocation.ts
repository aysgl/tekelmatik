import { useState, useEffect, useRef } from "react"

export function useGeolocation() {
    const [latitude, setLatitude] = useState<number | null>(null)
    const [longitude, setLongitude] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [permission, setPermission] = useState<PermissionState>('prompt')
    const watchId = useRef<number | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation API is not supported")
            return
        }

        if ('permissions' in navigator) {
            navigator.permissions.query({ name: 'geolocation' })
                .then(result => {
                    setPermission(result.state)
                    result.addEventListener('change', () => {
                        setPermission(result.state)
                    })
                })
        }

        const handleSuccess = (position: GeolocationPosition) => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
            setError(null)
        }

        const handleError = (error: GeolocationPositionError) => {
            setError(error.message)
            setLatitude(null)
            setLongitude(null)
        }

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                if (watchId.current !== null) {
                    navigator.geolocation.clearWatch(watchId.current)
                }
            }
        }
        watchId.current = navigator.geolocation.watchPosition(handleSuccess, handleError)
        document.addEventListener('visibilitychange', handleVisibilityChange)
        watchId.current = navigator.geolocation.watchPosition(handleSuccess, handleError)

        return () => {
            if (watchId.current !== null) {
                navigator.geolocation.clearWatch(watchId.current)
            }
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [])

    return { latitude, longitude, error, permission }
}