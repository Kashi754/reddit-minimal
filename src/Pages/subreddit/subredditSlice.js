import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadSubredditFeed = createAsyncThunk(
    'subreddit/loadSubredditFeed',
    async(args) => {
        const {subreddit, params} = args
        let url;
        if(params) {
            url = `https://www.reddit.com/r/${subreddit}/hot.json?` + params;
        } else {
            url = `https://www.reddit.com/r/${subreddit}/hot.json?`;
        }
        const response = await fetch(url);
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
        })
    }
});

export const selectNextPage = (state) => state.subreddit.nextPage;
export const selectPrevPage = (state) => state.subreddit.prevPage;
export const selectSubredditFeed = (state) => state.subreddit.subredditFeed;
export const selectCount = (state) => state.subreddit.count;
export const { incrementCount, decrementCount } = subredditSlice.actions;
export default subredditSlice.reducer;