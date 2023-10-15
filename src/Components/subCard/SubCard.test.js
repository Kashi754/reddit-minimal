import { screen } from "@testing-library/react"
import { renderWithProviders } from "../../utilities/testUtils"
import { SubCard } from "./SubCard"

describe('SubCard Component', () => {
    const testSubreddit = {
        community_icon: 'https://images.squarespace-cdn.com/content/v1/60cc480d9290423b888eb94a/1624780092100-4FLILMIV0YHHU45GB7XZ/Test+Pattern+t.png?format=2500w',
        display_name: 'testSubreddit',
        name: 'Test Subreddit!',
        display_name_prefixed: 'r/testSubreddit',
        subscribers: 1000
    }

    it('should render without crashing', () => {
        renderWithProviders(<SubCard subreddit={testSubreddit} />);
        const title = screen.getByRole('heading', { name: /Test Subreddit!/i });
        expect(title).toBeInTheDocument();
    })

    it('should render a link to the subreddit', () => {
        renderWithProviders(<SubCard subreddit={testSubreddit} />);
        const link = screen.getByRole('link', { name: /r\/testSubreddit/ });
        expect(link).toBeInTheDocument();
        expect(link.getAttribute('href')).toBe('/subreddits/testSubreddit');
    })

    it('should render an icon for the subreddit', () => {
        renderWithProviders(<SubCard subreddit={testSubreddit} />);
        const icon = screen.getByRole('img', { name: /testSubreddit/i });
        expect(icon).toBeInTheDocument();
        expect(icon.getAttribute('src')).toBe('https://images.squarespace-cdn.com/content/v1/60cc480d9290423b888eb94a/1624780092100-4FLILMIV0YHHU45GB7XZ/Test+Pattern+t.png');
    })

    it('should render the amount of subscribers for the subreddit', () => {
        renderWithProviders(<SubCard subreddit={testSubreddit} />);
        const subscriberCount = screen.getByRole('heading', { name: /1000 subscribers/i });
        expect(subscriberCount).toBeInTheDocument();
    })
})