import { configureStore } from '@reduxjs/toolkit';
import homeSliceReducer from '../Pages/home/homeSlice';
import subredditsSliceReducer from '../Pages/subreddits/subredditsSlice';
import subredditSliceReducer from '../Pages/subreddit/subredditSlice';

export const store = configureStore({
  reducer: {
    home: homeSliceReducer,
    subreddits: subredditsSliceReducer,
    subreddit: subredditSliceReducer
  },
});
