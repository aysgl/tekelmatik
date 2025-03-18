export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  ENDPOINTS: {
    SHOPS: '/shops',
    SEARCH: (query: string) => `/search?q=${encodeURIComponent(query)}`,
    AREA: (area: string) => `/search/${encodeURIComponent(area)}`,
  }
};
