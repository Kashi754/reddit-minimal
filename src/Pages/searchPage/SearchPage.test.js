import { screen, waitFor } from "@testing-library/react";
import { renderAppWithMemoryRouter } from "../../utilities/testUtils";
import userEvent from "@testing-library/user-event";
import { server } from "../../mocks/server";
import { rest } from "msw";

describe("Search Page Component", () => {
    window.scrollTo = jest.fn();

    it('should load without crashing', async () => {
        renderAppWithMemoryRouter();

        const menuButton = screen.queryAllByText('Home')[0];
        userEvent.click(menuButton);
    
        await waitFor(() => screen.getByTestId('show'));
        const searchField = screen.getByRole('textbox');
        const searchSubmit = screen.getByTestId('search-button');
    
        await userEvent.type(searchField, 'test');
        await userEvent.click(searchSubmit);
        const loadingMessage = await screen.findByText('...Loading');
        expect(loadingMessage).toBeInTheDocument();
        let cards = await screen.findByRole('link', { name: /testSubredditNameSearch1/i });
        expect(cards).toBeInTheDocument();
        expect(searchField).toHaveTextContent('');
    })

    it('should display an error message when the request fails', async () => {
        server.use(
            rest.get('https://www.reddit.com/search/.json', (req, res, ctx) => {
                return res.once(
                    ctx.status(500),
                    ctx.json({ message: 'Internal server error'})
                )
            })
        )

        renderAppWithMemoryRouter(['/search?q=test%2520search']);
        const error = await screen.findByRole('alert');
        expect(error).toBeInTheDocument();
    })
});