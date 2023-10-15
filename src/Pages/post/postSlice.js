import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadPost = createAsyncThunk(
    'home/loadPost',
    async(postUrl) => {
        const response = await fetch(`https://www.reddit.com/r/${postUrl}/.json`);
        if(!response.ok) {
            const error = await response.json()
            const message = `An error has occured: ${response.status} ${error.message}`;
            throw new Error(message);
        }
        const data = await response.json();
        return data;
    }
)

const postSlice = createSlice({
    name: 'post',
    initialState: {
        postData: {},
        comments: [],
        imageUrl: '',
        videoUrl: '',
        isLoading: false,
        isError: false,
        error: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadPost.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(loadPost.fulfilled, (state, action) => {
            const post = action.payload[0].data.children[0].data;
            state.isLoading = false;
            state.isError = false;
            state.postData = post;
            state.comments = action.payload[1].data.children.map(comment => comment.data)
        })
        .addCase(loadPost.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
});

export const selectPost = (state) => state.post.postData;
export const selectComments = (state) => state.post.comments;
export const selectIsLoading = (state) => state.post.isLoading;
export const selectIsError = (state) => state.post.isError;
export const selectError = (state) => state.post.error;
export default postSlice.reducer;