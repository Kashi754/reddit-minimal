import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadHomeFeed = createAsyncThunk(
    'home/loadHomeFeed',
    async(before, after) => {
        const response = await fetch(`https://www.reddit.com/r/popular/hot.json?count=25&before=${before}&after=${after}`);
        const data = await response.json();
        return data;
    }
)

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        homeFeed: [],
        isLoading: false,
        isError: false,
        nextPage: null,
        prevPage: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadHomeFeed.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(loadHomeFeed.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.homeFeed = action.payload.data.children.map(child => child.data);
            state.nextPage = action.payload.data.after;
            state.prevPage = action.payload.data.before;
        })
        .addCase(loadHomeFeed.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
});

export const selectNextPage = (state) => state.home.nextPage;
export const selectPrevPage = (state) => state.home.prevPage;
export const selectHomeFeed = (state) => state.home.homeFeed;
export default homeSlice.reducer;