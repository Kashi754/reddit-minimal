import { configureStore } from '@reduxjs/toolkit';
import homeSliceReducer from '../Pages/home/homeSlice';
import subredditsSliceReducer from '../Pages/subreddits/subredditsSlice';
import subredditSliceReducer from '../Pages/subreddit/subredditSlice';
import userSliceReducer from '../Pages/user/userSlice';

export const store = configureStore({
  reducer: {
    home: homeSliceReducer,
    subreddits: subredditsSliceReducer,
    subreddit: subredditSliceReducer,
    user: userSliceReducer
  },
});
