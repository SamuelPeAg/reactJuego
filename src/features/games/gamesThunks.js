import { createAsyncThunk } from '@reduxjs/toolkit';
import { getGames, getGameDetails, getPopularGames } from '../../services/gamesService';

export const fetchGamesThunk = createAsyncThunk(
    'games/fetchGames',
    async ({ search, page, genres, tags, publishers }, { rejectWithValue }) => {
        try {
            const data = await getGames(search, page, genres, tags, publishers);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchPopularGamesThunk = createAsyncThunk(
    'games/fetchPopularGames',
    async (_, { rejectWithValue }) => {
        try {
            const data = await getPopularGames();
            return data.results;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchGameDetailsThunk = createAsyncThunk(
    'games/fetchGameDetails',
    async (id, { rejectWithValue }) => {
        try {
            const data = await getGameDetails(id);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
