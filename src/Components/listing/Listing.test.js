import { render, screen } from "@testing-library/react";
import { Listing } from "./Listing";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../utilities/testUtils";

const feed = [
    {
        subreddit_name_prefixed: 'r/testSubredditName1',
        subreddit: 'testSubredditName1',
        author: 'testAuthor1',
        num_comments: 10,
        created_utc: 1696700443,
        score: 20
    },
    {
        subreddit_name_prefixed: 'r/testSubredditName2',
        subreddit: 'testSubredditName2',
        author: 'testAuthor2',
        num_comments: 10,
        created_utc: 1696700443,
        score: 20
    },
    {
        subreddit_name_prefixed: 'r/testSubredditName3',
        subreddit: 'testSubredditName3',
        author: 'testAuthor3',
        num_comments: 10,
        created_utc: 1696700443,
        score: 20
    }
]

const feed2 = [
    {
        subreddit_name_prefixed: 'r/testSubredditName1',
        subreddit: 'testSubredditName1',
        author: 'testAuthor1',
        num_comments: 10,
        created_utc: 1696700443,
        score: 20
    },
    {
        subreddit_name_prefixed: 'r/testSubredditName2',
        subreddit: 'testSubredditName2',
        author: 'testAuthor2',
        num_comments: 10,
        created_utc: 1696700443,
        score: 20,
        body: 'here is a body'
    },
    {
        subreddit_name_prefixed: 'r/testSubredditName3',
        subreddit: 'testSubredditName3',
        author: 'testAuthor3',
        num_comments: 10,
        created_utc: 1696700443,
        score: 20
    }
]

describe('Listing component', () => {
    it('renders without error', () => {
        renderWithProviders(<Listing feed={feed} />);
        const firstCard = screen.getByText('r/testSubredditName1');
        const secondCard = screen.getByText('r/testSubredditName2');
        const thirdCard = screen.getByText('r/testSubredditName3');

        expect(firstCard).toBeInTheDocument();
        expect(secondCard).toBeInTheDocument();
        expect(thirdCard).toBeInTheDocument();
    });

    it('renders nothing if no feed is provided', () => {
        renderWithProviders(<Listing feed={null} />);
        const heading = screen.queryByRole('heading');
        expect(heading).toBeNull();
    })

    it('does not render a card if post.body is truthy', () => {
        renderWithProviders(<Listing feed={feed2} />);
        const firstCard = screen.getByText('r/testSubredditName1');
        const secondCard = screen.queryByText('r/testSubredditName2');
        const thirdCard = screen.getByText('r/testSubredditName3');

        expect(firstCard).toBeInTheDocument();
        expect(secondCard).toBeNull();
        expect(thirdCard).toBeInTheDocument();
    })
})