import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadUserFeed = createAsyncThunk(
    'user/loadUserFeed',
    async(args) => {
        const {user, params} = args
        const url = `https://www.reddit.com/user/${user}/submitted/.json?` + params;
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

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userFeed: [],
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
        .addCase(loadUserFeed.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(loadUserFeed.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.userFeed = data.data.children.map(child => child.data);
            state.nextPage = data.data.after;
            state.prevPage = data.data.before;
        })
        .addCase(loadUserFeed.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
});

export const selectNextPage = (state) => state.user.nextPage;
export const selectPrevPage = (state) => state.user.prevPage;
export const selectUserFeed = (state) => state.user.userFeed;
export const selectCount = (state) => state.user.count;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectIsError = (state) => state.user.isError;
export const selectError = (state) => state.user.error;
export const { incrementCount, decrementCount, resetCount } = userSlice.actions;
export default userSlice.reducer;