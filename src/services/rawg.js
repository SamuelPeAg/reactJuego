const API_KEY = 'b39ef92e897f4d57a63c3ca231c0dc1b'; // TODO: Replace with your actual API Key
const BASE_URL = 'https://api.rawg.io/api';

export const getGames = async (search = '', page = 1) => {
    try {
        const query = search ? `&search=${search}` : '';
        const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page=${page}${query}&page_size=20`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error;
    }
};

export const getPopularGames = async () => {
    try {
        const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&dates=2023-01-01,2024-12-31&ordering=-rating&page_size=10`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching popular games:', error);
        throw error;
    }
};

export const getGameDetails = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error(`Error fetching game details for ID ${id}:`, error);
        throw error;
    }
};
