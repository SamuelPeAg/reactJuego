import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEvents } from '../../services/eventsService';

export const fetchEventsThunk = createAsyncThunk(
    'events/fetchEvents',
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchEvents();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
