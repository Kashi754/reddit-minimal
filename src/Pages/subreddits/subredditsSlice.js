import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadSubredditsFeed = createAsyncThunk(
    'subreddits/loadSubredditsFeed',
    async(before, after) => {
        const response = await fetch(`https://www.reddit.com/subreddits.json?count=25&before=${before}&after=${after}`);
        const data = await response.json();
        return data;
    }
)

const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: {
        subredditsFeed: [],
        isLoading: false,
        isError: false,
        nextPage: null,
        prevPage: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadSubredditsFeed.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(loadSubredditsFeed.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.subredditsFeed = action.payload.data.children.map(child => child.data);
            state.nextPage = action.payload.data.after;
            state.prevPage = action.payload.data.before;
        })
        .addCase(loadSubredditsFeed.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
});

export const selectNextPage = (state) => state.home.nextPage;
export const selectPrevPage = (state) => state.home.prevPage;
export const selectSubredditsFeed = (state) => state.subreddits.subredditsFeed;
export default subredditsSlice.reducer;