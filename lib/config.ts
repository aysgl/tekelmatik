export const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_URL || 'https://api.tekelmatik.com'
    : 'http://localhost:8080',
  ENDPOINTS: {
    SHOPS: '/shops',
    SEARCH: (query: string) => `/search?q=${encodeURIComponent(query)}`,
    AREA: (area: string) => `/search/${encodeURIComponent(area)}`,
  }
};
