import { createSlice } from '@reduxjs/toolkit';
import { fetchGamesThunk, fetchGameDetailsThunk, fetchPopularGamesThunk } from './gamesThunks';

const initialState = {
    games: [],
    popularGames: [],
    gameDetails: null,
    favorites: typeof window !== 'undefined' && localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [],
    loading: false,
    error: null,
    totalPages: 0,
};

const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const game = action.payload;
            const isFavorite = state.favorites.some(fav => fav.id === game.id);
            if (isFavorite) {
                state.favorites = state.favorites.filter(fav => fav.id !== game.id);
            } else {
                state.favorites.push(game);
            }
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Games
            .addCase(fetchGamesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGamesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.games = action.payload.results;
                state.totalPages = Math.ceil(action.payload.count / 20);
            })
            .addCase(fetchGamesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Popular Games
            .addCase(fetchPopularGamesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPopularGamesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.popularGames = action.payload;
            })
            .addCase(fetchPopularGamesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Game Details
            .addCase(fetchGameDetailsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGameDetailsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.gameDetails = action.payload;
            })
            .addCase(fetchGameDetailsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { toggleFavorite } = gamesSlice.actions;

export default gamesSlice.reducer;
