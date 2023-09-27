import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadUserFeed = createAsyncThunk(
    'user/loadUserFeed',
    async(user, before, after) => {
        const response = await fetch(`http://www.reddit.com/user/${user}/submitted/.json?sort=hot&before=${before}&after=${after}`);
        const data = await response.json();
        return data;
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userFeed: [],
        isLoading: false,
        isError: false,
        nextPage: null,
        prevPage: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadUserFeed.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(loadUserFeed.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.userFeed = action.payload.data.children.map(child => child.data);
            state.nextPage = action.payload.data.after;
            state.prevPage = action.payload.data.before;
        })
        .addCase(loadUserFeed.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
});

export const selectNextPage = (state) => state.user.nextPage;
export const selectPrevPage = (state) => state.user.prevPage;
export const selectUserFeed = (state) => state.user.userFeed;
export default userSlice.reducer;