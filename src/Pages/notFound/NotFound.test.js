import { screen } from "@testing-library/react";
import { renderAppWithMemoryRouter } from "../../utilities/testUtils";
import userEvent from "@testing-library/user-event";
import { server } from "../../mocks/server";
import { rest } from "msw";

describe("Not Found Component", () => {
    window.scrollTo = jest.fn();

    it('should load when visiting an unknown route without crashing', () => {
        renderAppWithMemoryRouter(['/notfound']);

        const error = screen.getByRole('heading', {name: /error 404/i });
        expect(error).toBeInTheDocument();
    })

    it('should not load when visiting a known route', () => {
        renderAppWithMemoryRouter(['/subreddits']);

        const error = screen.queryByRole('heading', {name: /error 404/i });
        expect(error).toBeNull();
    })
});