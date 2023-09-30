import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadSearchFeed = createAsyncThunk(
    'search/loadSearchFeed',
    async(args) => {
        const {subreddit, params} = args
        const url = subreddit? 
            `https://www.reddit.com/r/${subreddit}/search/.json?${params}` :
            `https://www.reddit.com/search/.json?${params}`
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
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
        })
    }
});

export const selectNextPage = (state) => state.search.nextPage;
export const selectPrevPage = (state) => state.search.prevPage;
export const selectSearchFeed = (state) => state.search.searchFeed;
export const selectCount = (state) => state.search.count;
export const selectIsLoading = (state) => state.search.isLoading;
export const { incrementCount, decrementCount } = searchPageSlice.actions;
export default searchPageSlice.reducer;