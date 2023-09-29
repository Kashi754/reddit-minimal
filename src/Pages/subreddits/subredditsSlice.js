import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadSubredditsFeed = createAsyncThunk(
    'subreddits/loadSubredditsFeed',
    async(params) => {
        let url;
        if(params) {
            url = 'https://www.reddit.com/subreddits.json?' + params;
        } else {
            url = 'https://www.reddit.com/subreddits.json';
        }
        const response = await fetch(url);
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
        count: 0
    },
    reducers: {
        incrementCount(state) {
            state.count += 25
        },
        decrementCount(state) {
            state.count -= 25
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadSubredditsFeed.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(loadSubredditsFeed.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.subredditsFeed = data.data.children.map(child => child.data);
            state.nextPage = data.data.after;
            state.prevPage = data.data.before;
        })
        .addCase(loadSubredditsFeed.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
});

export const selectNextPage = (state) => state.subreddits.nextPage;
export const selectPrevPage = (state) => state.subreddits.prevPage;
export const selectSubredditsFeed = (state) => state.subreddits.subredditsFeed;
export const selectCount = (state) => state.subreddits.count;
export const { incrementCount, decrementCount } = subredditsSlice.actions;
export default subredditsSlice.reducer;