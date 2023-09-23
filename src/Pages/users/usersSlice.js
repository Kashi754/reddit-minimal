import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadUsersFeed = createAsyncThunk(
    'users/loadUsersFeed',
    async(before, after) => {
        const response = await fetch(`https://www.reddit.com/users.json?count=25&before=${before}&after=${after}`);
        const data = await response.json();
        return data;
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        usersFeed: [],
        isLoading: false,
        isError: false,
        nextPage: null,
        prevPage: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadUsersFeed.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(loadUsersFeed.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.usersFeed = action.payload.data.children.map(child => child.data);
            state.nextPage = action.payload.data.after;
            state.prevPage = action.payload.data.before;
        })
        .addCase(loadUsersFeed.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
});

export const selectNextPage = (state) => state.users.nextPage;
export const selectPrevPage = (state) => state.users.prevPage;
export const selectUsersFeed = (state) => state.users.usersFeed;
export default usersSlice.reducer;