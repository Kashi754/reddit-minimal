import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadUsersFeed = createAsyncThunk(
    'users/loadUsersFeed',
    async(params) => {
        const url = 'https://www.reddit.com/users.json?' + params;
        
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

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        usersFeed: [],
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
        .addCase(loadUsersFeed.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(loadUsersFeed.fulfilled, (state, action) => {
            const data = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.usersFeed = data.data.children.map(child => child.data);
            state.nextPage = data.data.after;
            state.prevPage = data.data.before;
        })
        .addCase(loadUsersFeed.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
});

export const selectNextPage = (state) => state.users.nextPage;
export const selectPrevPage = (state) => state.users.prevPage;
export const selectUsersFeed = (state) => state.users.usersFeed;
export const selectCount = (state) => state.users.count;
export const selectIsLoading = (state) => state.users.isLoading;
export const selectIsError = (state) => state.users.isError;
export const selectError = (state) => state.users.error;
export const { incrementCount, decrementCount, resetCount } = usersSlice.actions;
export default usersSlice.reducer;