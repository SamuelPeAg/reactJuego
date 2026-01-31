import { useState, useEffect } from 'react';

export function useFavorites() {
    const [favorites, setFavorites] = useState(() => {
        // Load from local storage on initial render
        const saved = localStorage.getItem('game_favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        // Save to local storage whenever favorites change
        localStorage.setItem('game_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (game) => {
        if (!favorites.some(fav => fav.id === game.id)) {
            setFavorites([...favorites, game]);
        }
    };

    const removeFavorite = (gameId) => {
        setFavorites(favorites.filter(game => game.id !== gameId));
    };

    const isFavorite = (gameId) => {
        return favorites.some(game => game.id === gameId);
    };

    return { favorites, addFavorite, removeFavorite, isFavorite };
}
