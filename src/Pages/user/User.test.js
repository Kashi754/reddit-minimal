import { screen } from "@testing-library/react";
import { renderAppWithMemoryRouter } from "../../utilities/testUtils";
import userEvent from "@testing-library/user-event";
import { server } from "../../mocks/server";
import { rest } from "msw";

describe("User Component", () => {
    window.scrollTo = jest.fn();

    it('should load without crashing', async () => {
        renderAppWithMemoryRouter(["/users/testUser1"]);

        const loadingMessage = screen.getByText('...Loading');
        expect(loadingMessage).toBeInTheDocument();

        const cards = await screen.findAllByRole('heading', { name: /testUser1./i });
        expect(cards).toHaveLength(3);
    })

    it('should display an error message when the request fails', async () => {
        server.use(
            rest.get('https://www.reddit.com/user/testUser1/submitted/.json', (req, res, ctx) => {
                return res.once(
                    ctx.status(500),
                    ctx.json({ message: 'Internal server error'})
                )
            })
        )

        renderAppWithMemoryRouter(["/users/testUser1"]);
        const error = await screen.findByRole('alert');
        expect(error).toBeInTheDocument();
    })

    it('should load the next/prev page when next/prev button is clicked', async () => {
        renderAppWithMemoryRouter(["/users/testUser1"]);
        const user = userEvent.setup();
        let nextPage = await screen.findAllByRole('button', { name: /NEXT/i });
        expect(nextPage[0]).toBeInTheDocument();
        expect(nextPage[1]).toBeInTheDocument();
        let prevPage = screen.queryByRole('button', { name: /PREV/i });
        expect(prevPage).toBeNull();

        await user.click(nextPage[0]);
        let loadingMessage = await screen.findByText('...Loading');
        expect(loadingMessage).toBeInTheDocument();
        let cardHeader = await screen.findByRole('heading', {name: /testUser1.2a/i });
        expect(cardHeader).toBeInTheDocument();

        prevPage = await screen.findAllByRole('button', { name: /PREV/i });
        expect(prevPage[0]).toBeInTheDocument();
        expect(prevPage[1]).toBeInTheDocument();
        nextPage = screen.queryByRole('button', { name: /NEXT/i });
        expect(nextPage).toBeNull();

        await user.click(prevPage[0]);
        loadingMessage = await screen.findByText('...Loading');
        expect(loadingMessage).toBeInTheDocument();
        cardHeader = await screen.findByRole('heading', { name: /testUser1.1a/i });
        expect(cardHeader).toBeInTheDocument();
    })
});