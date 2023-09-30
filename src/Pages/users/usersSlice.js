import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadUsersFeed = createAsyncThunk(
    'users/loadUsersFeed',
    async(params) => {
        let url;
        if(params) {
            url = 'https://www.reddit.com/users.json?' + params;
        } else {
            url = 'https://www.reddit.com/users.json';
        }
        const response = await fetch(url);
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
        })
    }
});

export const selectNextPage = (state) => state.users.nextPage;
export const selectPrevPage = (state) => state.users.prevPage;
export const selectUsersFeed = (state) => state.users.usersFeed;
export const selectCount = (state) => state.users.count;
export const selectIsLoading = (state) => state.users.isLoading;
export const { incrementCount, decrementCount } = usersSlice.actions;
export default usersSlice.reducer;