import { configureStore } from '@reduxjs/toolkit';
import homeSliceReducer from '../Pages/home/homeSlice';
import subredditsSliceReducer from '../Pages/subreddits/subredditsSlice';
import subredditSliceReducer from '../Pages/subreddit/subredditSlice';
import userSliceReducer from '../Pages/user/userSlice';
import usersSliceReducer from '../Pages/users/usersSlice';
import postSliceReducer from '../Pages/post/postSlice';
import searchPageSlice from '../Pages/searchPage/searchPageSlice';

const rootReducer = {
    home: homeSliceReducer,
    subreddits: subredditsSliceReducer,
    subreddit: subredditSliceReducer,
    users: usersSliceReducer,
    user: userSliceReducer,
    post: postSliceReducer,
    search: searchPageSlice
};

export const store = configureStore({reducer: rootReducer});

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}
