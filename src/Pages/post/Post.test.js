import { screen } from "@testing-library/react";
import { rest } from "msw";
import { server } from "../../mocks/server";
import { renderAppWithMemoryRouter } from "../../utilities/testUtils";

describe("Post Component", () => {

    it('should load without crashing', async () => {
        renderAppWithMemoryRouter(['/subreddits/testSubreddit/testPost']);

        const loadingMessage = screen.getByText('...Loading');
        expect(loadingMessage).toBeInTheDocument();

        const post = await screen.findByRole('heading', { name: /testPostAuthor/i });
        expect(post).toBeInTheDocument();
    })

    it('should display an error message when the request fails', async () => {
        server.use(
            rest.get('https://www.reddit.com/r/testSubreddit/comments/testPost/.json', (req, res, ctx) => {
                return res.once(
                    ctx.status(500),
                    ctx.json({ message: 'Internal server error'})
                )
            })
        )

        renderAppWithMemoryRouter(['/subreddits/testSubreddit/testPost']);
        const error = await screen.findByRole('alert');
        expect(error).toBeInTheDocument();
    })

    it('should render comments', async () => {
        renderAppWithMemoryRouter(['/subreddits/testSubreddit/testPost']);

        const comments = await screen.findAllByRole('heading', { name: /testAuthor/i });
        expect(comments).toHaveLength(2);
    })
});