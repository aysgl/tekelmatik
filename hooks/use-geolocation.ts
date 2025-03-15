"use client";

import { useState, useEffect } from "react";

export function useGeolocation() {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation API is not supported by your browser.");
            return;
        }

        const handleSuccess = (position: GeolocationPosition) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        };

        const handleError = (error: GeolocationPositionError) => {
            setError(error.message);
        };

        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);

    }, []);

    return { latitude, longitude, error };
}
