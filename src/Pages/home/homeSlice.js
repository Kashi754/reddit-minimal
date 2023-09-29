import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadHomeFeed = createAsyncThunk(
    'home/loadHomeFeed',
    async(params) => {
        let url;
        if(params) {
            url = 'https://www.reddit.com/r/popular/hot.json?' + params;
        } else {
            url = 'https://www.reddit.com/r/popular/hot.json';
        }
        const response = await fetch(url);
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
        })
    }
});

export const selectNextPage = (state) => state.home.nextPage;
export const selectPrevPage = (state) => state.home.prevPage;
export const selectHomeFeed = (state) => state.home.homeFeed;
export const selectCount = (state) => state.home.count;
export const { incrementCount, decrementCount } = homeSlice.actions;
export default homeSlice.reducer;