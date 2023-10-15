import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadSubredditFeed = createAsyncThunk(
    'subreddit/loadSubredditFeed',
    async(args) => {
        const {subreddit, params} = args
        const url = `https://www.reddit.com/r/${subreddit}/hot.json?` + params; 
        const response = await fetch(url);
        if(!response.ok) {
            const error = await response.json()
            const message = `An error has occured: ${response.status} ${error.message}`;
            throw new Error(message);
        }
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
        count: 0,
        error: null
    },
    reducers: {
        incrementCount(state) {
            state.count += 25
        },
        decrementCount(state) {
            state.count -= 25
        },
        resetCount(state) {
            state.count = 0;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadSubredditFeed.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(loadSubredditFeed.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.subredditFeed = data.data.children.map(child => child.data);
            state.nextPage = data.data.after;
            state.prevPage = data.data.before;
        })
        .addCase(loadSubredditFeed.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
});

export const selectNextPage = (state) => state.subreddit.nextPage;
export const selectPrevPage = (state) => state.subreddit.prevPage;
export const selectSubredditFeed = (state) => state.subreddit.subredditFeed;
export const selectCount = (state) => state.subreddit.count;
export const selectIsLoading = (state) => state.subreddit.isLoading;
export const selectIsError = (state) => state.subreddit.isError;
export const selectError = (state) => state.subreddit.error;
export const { incrementCount, decrementCount, resetCount } = subredditSlice.actions;
export default subredditSlice.reducer;