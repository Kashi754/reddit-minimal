import React from 'react';
import { Root } from '../Pages/root/Root';
import { Home } from '../Pages/home/Home';
import { Subreddits } from '../Pages/subreddits/Subreddits';
import { Subreddit } from '../Pages/subreddit/Subreddit';
import { Post } from '../Pages/post/Post';
import { Users } from '../Pages/users/Users';
import { User } from '../Pages/user/User';
import { SearchPage } from '../Pages/searchPage/SearchPage';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { NotFound } from '../Pages/notFound/NotFound';

function App() {

  document.documentElement.style.setProperty(
    '--scrollbar-width', (
      window.innerWidth - document.documentElement.clientWidth + 20
  ) + "px");

  const routes = createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route index element={<Home />} />
      <Route path='search' element={<SearchPage />} />
      <Route path='subreddits' element={<Subreddits />} />
      <Route path='subreddits/search' element={<SearchPage />} />
      <Route path='subreddits/:subreddit' element={<Subreddit />} />
      <Route path='subreddits/:subreddit/search' element={<SearchPage />} />
      <Route path='subreddits/:subreddit/:post' element={<Post />} />
      <Route path='users' element={<Users />} />
      <Route path='users/search' element={<SearchPage />} />
      <Route path='users/:user' element={<User />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  );

  return routes;
}

export default App;
