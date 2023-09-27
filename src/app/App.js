import React from 'react';
import './App.css';
import { Root } from '../Pages/root/Root';
import { Home } from '../Pages/home/Home';
import { Subreddits } from '../Pages/subreddits/Subreddits';
import { Subreddit } from '../Pages/subreddit/Subreddit';
import { Post } from '../Pages/post/Post';
import { Users } from '../Pages/users/Users';
import { User } from '../Pages/user/User';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

function App() {
  const appRouter = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route index element={<Home />} />
      <Route path='subreddits' element={<Subreddits />} />
      <Route path='subreddits/:subreddit' element={<Subreddit />} />
      <Route path='subreddits/:subreddit/:post' element={<Post />} />
      <Route path='users' element={<Users />} />
      <Route path='users/:user' element={<User />} />
    </Route>
  ));

  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;
