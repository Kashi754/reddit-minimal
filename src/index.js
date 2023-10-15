import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import './reset.css';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);
const AppRoutes = App();
const AppProvider =  () => <RouterProvider router={createBrowserRouter(AppRoutes)} />

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppProvider />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
