import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { CommentList } from "./CommentList";

const commentList = [
    {
        author: 'testAuthor', 
        body_html: 'here is some html text.', 
        replies: {
            data: {
                children: [{data: {author: 'replyAuthor', body_html: 'here is a reply'}}, {data: {}}]
            }
        }
    },
    {
        author: 'testAuthor2', 
        body_html: 'here is more html text.', 
        replies: {
            data: {
                children: [{data: {author: 'replyAuthor2', body_html: 'here is another reply'}}, {data: {}}]
            }
        }
    },
    {
        author: 'testAuthor3', 
        body_html: 'here is even more html text.', 
        replies: {
            data: {
                children: [{data: {author: 'replyAuthor3', body_html: 'here is a third reply'}}, {data: {}}]
            }
        }
    }
];

describe('CommentList Component', () => {
    it("Renders without crashing", () => {
        render(<MemoryRouter><CommentList comments={commentList} /></MemoryRouter>);
        const heading = screen.getByRole('heading', { name: /comments/i });

        expect(heading).toHaveTextContent('Comments');
    });

    it('Renders comments inside the comments list', () => {
        render(<MemoryRouter><CommentList comments={commentList} /></MemoryRouter>);

        const comment1 = screen.getByText('here is some html text.');
        const comment2 = screen.getByText('here is more html text.');
        const comment3 = screen.queryByText('here is even more html text.');

        expect(comment1).toBeInTheDocument();
        expect(comment2).toBeInTheDocument();
        expect(comment3).toBeNull();
    })
});