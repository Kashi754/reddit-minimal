import { screen } from "@testing-library/react";
import { PostHero } from "./PostHero";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../utilities/testUtils";

const currentTime = Date.now();
const oneMinuteAgo = (currentTime - 60000) / 1000;
const oneHourAgo = (currentTime - 3600000) / 1000;
const oneDayAgo = (currentTime - 86400000) / 1000;
const twoMinutesAgo = (currentTime - 120000) / 1000;
const twoHoursAgo = (currentTime - 7200000) / 1000;
const twoDaysAgo = (currentTime - 172800000) / 1000;

const timeTestPost1 = {
    created_utc: oneMinuteAgo
}

const timeTestPost2 = {
    created_utc: oneHourAgo
}

const timeTestPost3 = {
    created_utc: oneDayAgo
}

const timeTestPost4 = {
    created_utc: twoMinutesAgo
}

const timeTestPost5 = {
    created_utc: twoHoursAgo
}

const timeTestPost6 = {
    created_utc: twoDaysAgo
}

const post = {
    subreddit_name_prefixed: 'r/testSubredditName',
    subreddit: 'testSubredditName',
    author: 'testAuthor',
    num_comments: 10,
    created_utc: 1696700443,
    score: 20
}

describe('PostHero component', () => {
    it('renders without error', () => {
        renderWithProviders(<PostHero post={post} />);
        const cardHeader = screen.getByText('Posted by u/testAuthor');

        expect(cardHeader).toBeInTheDocument();
    });

    it('renders the score of the post as well as the arrows surrounding it', () => {
        renderWithProviders(<PostHero post={post} />);
        const upArrow = screen.getByRole('img', { name: /up arrow/i });
        const downArrow = screen.getByRole('img', { name: /down arrow/i });
        const score = screen.getByRole('heading', { name: /20.0/i });

        expect(score).toHaveTextContent('20');
        expect(upArrow).toBeInTheDocument();
        expect(downArrow).toBeInTheDocument();
    });

    it('renders the number of comments of the post', () => {
        renderWithProviders(<PostHero post={post} />);
        const commentCount = screen.getByRole('heading', { name: /10 comments/i });

        expect(commentCount).toHaveTextContent('10 comments');
    });

    it('renders the time with the proper abbreviation in minutes for 1 minute', () => {
        renderWithProviders(<PostHero post={timeTestPost1} />);
        const postedTime = screen.getByRole('heading', { name: /1 minute ago/i });

        expect(postedTime).toBeInTheDocument();
    });

    it('renders the time with the proper abbreviation in hours for 1 hour', () => {
        renderWithProviders(<PostHero post={timeTestPost2} />);
        const postedTime = screen.getByRole('heading', { name: /1 hour ago/i });

        expect(postedTime).toBeInTheDocument();
    });

    it('renders the time with the proper abbreviation in days for 1 day', () => {
        renderWithProviders(<PostHero post={timeTestPost3} />);
        const postedTime = screen.getByRole('heading', { name: /1 day ago/i });

        expect(postedTime).toBeInTheDocument();
    });

    it('renders the time with the proper abbreviation in minutes for more than 1 minute', () => {
        renderWithProviders(<PostHero post={timeTestPost4} />);
        const postedTime = screen.getByRole('heading', { name: /2 minutes ago/i });

        expect(postedTime).toBeInTheDocument();
    });

    it('renders the time with the proper abbreviation in hours for more than 1 hour', () => {
        renderWithProviders(<PostHero post={timeTestPost5} />);
        const postedTime = screen.getByRole('heading', { name: /2 hours ago/i });

        expect(postedTime).toBeInTheDocument();
    });

    it('renders the time with the proper abbreviation in days for more than 1 day', () => {
        renderWithProviders(<PostHero post={timeTestPost6} />);
        const postedTime = screen.getByRole('heading', { name: /2 days ago/i });

        expect(postedTime).toBeInTheDocument();
    });
})