import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadSubredditFeed = createAsyncThunk(
    'subreddit/loadSubredditFeed',
    async(subreddit, before, after) => {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?count=25&before=${before}&after=${after}`);
        const data = await response.json();
        return data;
    }
)

const subredditSlice = createSlice({
    name: 'subreddit',
    initialState: {
        subredditFeed: [],
        isLoading: false,
        isError: false,
        nextPage: null,
        prevPage: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadSubredditFeed.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(loadSubredditFeed.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.subredditFeed = action.payload.data.children.map(child => child.data);
            state.nextPage = action.payload.data.after;
            state.prevPage = action.payload.data.before;
        })
        .addCase(loadSubredditFeed.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
});

export const selectNextPage = (state) => state.subreddit.nextPage;
export const selectPrevPage = (state) => state.subreddit.prevPage;
export const selectSubredditFeed = (state) => state.subreddit.subredditFeed;
export default subredditSlice.reducer;