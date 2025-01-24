export const getLocationQuery = (key: string): string | null => {
    return new URLSearchParams(location.search).get(key) || null;
};
