import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadHomeFeed = createAsyncThunk(
    'home/loadHomeFeed',
    async(params) => {       
        const url = 'https://www.reddit.com/r/popular/hot.json?' + params;
        
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

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        homeFeed: [],
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
        .addCase(loadHomeFeed.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(loadHomeFeed.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.homeFeed = data.data.children.map(child => child.data);
            state.nextPage = data.data.after;
            state.prevPage = data.data.before;
        })
        .addCase(loadHomeFeed.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
});

export const selectNextPage = (state) => state.home.nextPage;
export const selectPrevPage = (state) => state.home.prevPage;
export const selectHomeFeed = (state) => state.home.homeFeed;
export const selectCount = (state) => state.home.count;
export const selectIsLoading = (state) => state.home.isLoading;
export const selectIsError = (state) => state.home.isError;
export const selectError = (state) => state.home.error;
export const { incrementCount, decrementCount, resetCount } = homeSlice.actions;
export default homeSlice.reducer;