import { createSlice } from '@reduxjs/toolkit';
import { fetchEventsThunk } from './eventsThunks';

const initialState = {
    events: [],
    myEvents: typeof window !== 'undefined' && localStorage.getItem('myEvents') ? JSON.parse(localStorage.getItem('myEvents')) : [],
    loading: false,
    error: null,
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        joinEvent: (state, action) => {
            const event = action.payload;
            if (!state.myEvents.some(e => e.id === event.id)) {
                state.myEvents.push(event);
                localStorage.setItem('myEvents', JSON.stringify(state.myEvents));
            }
        },
        cancelEvent: (state, action) => {
            const eventId = action.payload;
            state.myEvents = state.myEvents.filter(e => e.id !== eventId);
            localStorage.setItem('myEvents', JSON.stringify(state.myEvents));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEventsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEventsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(fetchEventsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { joinEvent, cancelEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
