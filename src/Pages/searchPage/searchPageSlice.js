import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadSearchFeed = createAsyncThunk(
    'search/loadSearchFeed',
    async(args) => {
        const {subreddit, params} = args
        const url = subreddit? 
            `https://www.reddit.com/r/${subreddit}/search/.json?${params}` :
            `https://www.reddit.com/search/.json?${params}`
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

const searchPageSlice = createSlice({
    name: 'search',
    initialState: {
        searchFeed: [],
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
        .addCase(loadSearchFeed.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(loadSearchFeed.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.searchFeed = data.data.children.map(child => child.data);
            state.nextPage = data.data.after;
            state.prevPage = data.data.before;
        })
        .addCase(loadSearchFeed.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
});

export const selectNextPage = (state) => state.search.nextPage;
export const selectPrevPage = (state) => state.search.prevPage;
export const selectSearchFeed = (state) => state.search.searchFeed;
export const selectCount = (state) => state.search.count;
export const selectIsLoading = (state) => state.search.isLoading;
export const selectIsError = (state) => state.search.isError;
export const selectError = (state) => state.search.error;
export const { incrementCount, decrementCount, resetCount } = searchPageSlice.actions;
export default searchPageSlice.reducer;