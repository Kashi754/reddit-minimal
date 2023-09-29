import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadUserFeed = createAsyncThunk(
    'user/loadUserFeed',
    async(args) => {
        const {user, params} = args
        let url;
        if(params) {
            url = `http://www.reddit.com/user/${user}/submitted/.json?` + params;
        } else {
            url = `http://www.reddit.com/user/${user}/submitted/.json`;
        }
        const response = await fetch(url);
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
        })
    }
});

export const selectNextPage = (state) => state.user.nextPage;
export const selectPrevPage = (state) => state.user.prevPage;
export const selectUserFeed = (state) => state.user.userFeed;
export const selectCount = (state) => state.user.count;
export const { incrementCount, decrementCount } = userSlice.actions;
export default userSlice.reducer;