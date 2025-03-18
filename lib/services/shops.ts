import { api } from './api'
import { API_CONFIG } from '../config'

export interface ShopHour {
    day: number;
    open_time: string;
    close_time: string;
}

export interface ShopType {
    type: string;
}
export interface Shop {
    id: number
    name: string
    formatted_address: string
    main_photo_url: string
    location_lat: number
    location_lng: number
    closingTime: string
    rating: number
    formatted_phone_number: string
    shop_hours: ShopHour[]
    shop_types: ShopType[]
    shop_photos: string[]
}

export interface Meta {
    limit: number
    page: number
    total: number
    total_pages: number
}

export interface ShopsResponse {
    data: Shop[]
    meta: Meta
}

export const shopsApi = {
    getShops: async () => {
        const { data } = await api.get<ShopsResponse>(API_CONFIG.ENDPOINTS.SHOPS)
        return data
    },

    getByQuery: async (query: string, page: number) => {
        const { data } = await api.get<ShopsResponse>(API_CONFIG.ENDPOINTS.SEARCH(query), {
            params: { page, limit: 20 }
        });
        return data;
        return {
            ...data,
            data: data.data.filter(shop => isShopOpenNow(shop.shop_hours))
        }
    },

    getByArea: async (area: string, page: number) => {
        const { data } = await api.get<ShopsResponse>(API_CONFIG.ENDPOINTS.AREA(area), {
            params: { page, limit: 20 }
        });
        return data;
        return {
            ...data,
            data: data.data.filter(shop => isShopOpenNow(shop.shop_hours))
        }
    },

    getByLocation: async ({ lat, lng }: { lat: number; lng: number }) => {
        const { data } = await api.get<ShopsResponse>(
            API_CONFIG.ENDPOINTS.LOCATION(`${lat},${lng}`)
        )
        console.log("getByLocation", data);
        return data
    }
}

export const isShopOpenNow = (shop_hours: ShopHour[]): boolean => {
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    const todayHours = shop_hours && shop_hours.find((hours) => hours.day == currentDay);

    if (!todayHours) {
        return false;
    }

    const openTime = parseInt(todayHours.open_time.slice(0, 2)) * 60 +
        parseInt(todayHours.open_time.slice(2));
    const closeTime = parseInt(todayHours.close_time.slice(0, 2)) * 60 +
        parseInt(todayHours.close_time.slice(2));

    const isOpen = closeTime < openTime
        ? currentTime >= openTime || currentTime <= closeTime
        : currentTime >= openTime && currentTime <= closeTime;

    return isOpen;
}


export const calculateDistance = (
    targetLat: number,
    targetLng: number,
    userLat: number | null,
    userLng: number | null
): string | null => {
    if (userLat === null || userLng === null) {
        return null;
    }

    const R = 6371;

    const dLat = (targetLat - userLat) * Math.PI / 180;
    const dLng = (targetLng - userLng) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(userLat * Math.PI / 180) * Math.cos(targetLat * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance < 1
        ? `${Math.round(distance * 1000)}m`
        : `${distance.toFixed(1)}km`;
};
