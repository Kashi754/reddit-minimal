import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utilities/testUtils";
import { SubredditListing } from "./SubredditListing";

describe('SubredditListing Component', () => {
    const testSubredditFeed = [
        {
            display_name: 'testSubreddit',
            name: 'Test Subreddit!',
            display_name_prefixed: 'r/testSubreddit',
            subscribers: 1000
        },
        {
            display_name: 'testSubreddit2',
            name: 'Test Subreddit2!',
            display_name_prefixed: 'r/testSubreddit2',
            subscribers: 2000
        },
        {
            display_name: 'testSubreddit3',
            name: 'Test Subreddit3!',
            display_name_prefixed: 'r/testSubreddit3',
            subscribers: 3000
        }
    ];

    it('should render without crashing', () => {
        renderWithProviders(<SubredditListing feed={testSubredditFeed} />);

        const firstCard = screen.getByText('r/testSubreddit');
        const secondCard = screen.getByText('r/testSubreddit2');
        const thirdCard = screen.getByText('r/testSubreddit3');

        expect(firstCard).toBeInTheDocument();
        expect(secondCard).toBeInTheDocument();
        expect(thirdCard).toBeInTheDocument();
    })

    it('renders nothing if no feed is provided', () => {
        renderWithProviders(<SubredditListing feed={null} />);
        const heading = screen.queryByRole('heading');
        expect(heading).toBeNull();
    })
})