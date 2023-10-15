import { render, screen } from "@testing-library/react";
import { Comment } from "./Comment";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("Comment Component", () => {
    it("Renders without crashing", () => {
        const comment = {author: 'testAuthor'};
        render(<MemoryRouter><Comment comment={comment} /></MemoryRouter>);
        const commentElem = screen.getByTestId('comment');

        expect(commentElem).toBeInTheDocument();
    });

    it("Renders text inside the body if comment.body_html exists", () => {
        const comment = {author: 'testAuthor', body_html: 'here is some html text.'};
        render(<MemoryRouter><Comment comment={comment} /></MemoryRouter>);
        const commentBody = screen.getByTestId('comment-body');

        expect(commentBody.textContent).toBe('here is some html text.');
    })

    it("Renders nothing inside the body if comment.body_html does not exist", () => {
        const comment = {author: 'testAuthor', body_html: ''};
        render(<MemoryRouter><Comment comment={comment} /></MemoryRouter>);
        const commentBody = screen.queryByTestId('comment-body');

        expect(commentBody).toBeNull();
    })

    it("Toggles replies when the 'toggle replies' button is clicked", async () => {
        const user = userEvent.setup();
        const comment = {
            author: 'testAuthor', 
            body_html: 'here is some html text.', 
            replies: {
                data: {
                    children: [{data: {author: 'testAuthor2', body_html: 'here is a reply'}}, {data: {}}]
                }
            }
        };

        render(<MemoryRouter><Comment comment={comment} /></MemoryRouter>);
        let showButton = screen.getByRole('button', { name: /\+ show replies/i });
        expect(showButton).toHaveTextContent('+ show replies');

        await user.click(showButton);
        const reply = screen.getByText('here is a reply');
        const hideButton = screen.getByRole('button', { name: /\- hide replies/i});
        showButton = screen.queryByRole('button', { name: /\+ show replies/i });

        expect(reply).toBeInTheDocument();
        expect(showButton).toBeNull();
        expect(hideButton).toHaveTextContent('- hide replies');
    })

    it("Shows no 'toggle replies' button if there is no replies to show", () => {
        const comment = {
            author: 'testAuthor', 
            body_html: 'here is some html text.', 
            replies: {
                data: {
                    children: [{data: {}}]
                }
            }
        };
        render(<MemoryRouter><Comment comment={comment} /></MemoryRouter>);

        const hideButton = screen.queryByRole('button', { name: /\- hide replies/i});
        const showButton = screen.queryByRole('button', { name: /\+ show replies/i });

        expect(hideButton).toBeNull();
        expect(showButton).toBeNull();
        
    })
});