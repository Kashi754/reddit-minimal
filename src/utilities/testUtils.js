import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, RouterProvider, createMemoryRouter } from 'react-router-dom'
// As a basic setup, import your same slice reducers
import { setupStore } from '../app/store'
import { Root } from '../Pages/root/Root'
import App from '../app/App'

export function renderWithProviders(
    ui,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <MemoryRouter initialEntries={['/']}><Provider store={store}>{children}</Provider></MemoryRouter>;
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export function renderAppWithMemoryRouter(initialEntries = ['/'], {...renderOptions} = {}) {
    const store = setupStore({});
    function Wrapper(children) {
        return (
            <Provider store={store}>
                <RouterProvider router={createMemoryRouter(App(), initialEntries={initialEntries})} />
            </Provider>
        )
    }

    return { store, ...render(<Wrapper />)};
}