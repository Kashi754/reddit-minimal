import { screen, waitFor } from "@testing-library/react";
import { PostBody } from "./PostBody";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../utilities/testUtils";
import userEvent from "@testing-library/user-event";

const post1 = {
    subreddit_name_prefixed: 'r/testSubredditName',
    subreddit: 'testSubredditName',
    author: 'testAuthor',
    num_comments: 10,
    created_utc: 1696700443,
    score: 20,
    title: 'testTitle',
    url: 'https://www.kashi754.com/',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/6/66/SMPTE_Color_Bars.svg',
    thumbnail_width: 100,
    thumbnail_height: 200,
    id: 1337
}

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('PostCard Body SubComponent', () => {
    it('should render the post title', () => {
        renderWithProviders(<PostBody post={post1} isListingCard={false} />);
        const postTitle = screen.getByRole('heading', { name: /testTitle/i });

        expect(postTitle).toBeInTheDocument();
    })

    it('renders an external link with the correct attributes', async () => {
        renderWithProviders(<PostBody post={post1} isListingCard={false} />);
        const link = screen.getByRole('link');
        expect(link.getAttribute('href')).toBe('https://www.kashi754.com/');
        expect(link.getAttribute('target')).toBe('_blank');
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');

        // Assert that the thumbnail is rendered with the correct attributes
        const image = screen.getByRole('img');
        expect(image).toBeInTheDocument();
        expect(image.getAttribute('src')).toBe('https://upload.wikimedia.org/wikipedia/commons/6/66/SMPTE_Color_Bars.svg');
        expect(image.getAttribute('alt')).toBe('thumbnail');
        expect(image.getAttribute('width')).toBe('100');
        expect(image.getAttribute('height')).toBe('200');

        // Assert that the link text is rendered correctly
        const linkText = screen.getByText('www.kashi754.com...');
        expect(linkText).toBeInTheDocument();
    })

    it('should render images inside the post body if post.url is an image', () => {
        const post = {url: 'https://upload.wikimedia.org/wikipedia/commons/6/66/SMPTE_Color_Bars.svg'};
        renderWithProviders(<PostBody post={post} isListingCard={false} />);
        const image = screen.getByRole('img');
        expect(image).toBeInTheDocument();
    })

    it('should render images inside the body if post.preview.images[0] is an image', () => {
        const post = {
            url: 'https://www.kashi754.com', 
            preview: {images: [{source: {url: 'https://upload.wikimedia.org/wikipedia/commons/6/66/SMPTE_Color_Bars.svg'}}]}
        };
        renderWithProviders(<PostBody post={post} isListingCard={false} />);
        const image = screen.getByRole('img');
        expect(image).toBeInTheDocument();
    })

    it('should not render an image if post.preview.images[0] contains "external-preview"', () => {
        const post = {
            url: 'https://www.kashi754.com', 
            preview: {images: [{source: {url: 'https://external-preview.wikimedia.org/wikipedia/commons/6/66/SMPTE_Color_Bars.svg'}}]}
        };
        renderWithProviders(<PostBody post={post} isListingCard={false} />);
        const image = screen.queryByRole('img');
        expect(image).toBeNull;
    })

    it('should render any text under selftext_html', () => {
        const post = {
            selftext_html: '&lt;a href=\"https://www.kashi754.com"&gt;Kashi754&lt;/a&gt;'
        }
        renderWithProviders(<PostBody post={post} isListingCard={false} />);
        const text = screen.getByRole('link', { name: /Kashi754/i });
        expect(text).toBeInTheDocument();
    })

    it('should render a video', () => {
        const post = {
            media: {reddit_video: {fallback_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'}}
        }
        renderWithProviders(<PostBody post={post} isListingCard={false} />);
        const video = document.querySelector('video');
        expect(video).toBeInTheDocument();
        expect(video.getAttribute('src')).toBe('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4');
        expect(video.getAttribute('type')).toBe('video/mp4');
    })

    describe('Gallery SubComponent', () => {
        const post = {
            is_gallery: true,
            media_metadata: {
                abcdefghijklm: {
                    s: {
                        u: "https://preview.redd.it/b7k5birn33781.jpg?width=6666&amp;format=pjpg&amp;auto=webp&amp;s=7b997a76be16359a3ac997bd6e0ca8ccf814c20f"
                    },
                },
                nopqrstuvwxyz: {
                    s: {
                        u: "https://preview.redd.it/cztd1aqn33781.png?width=2560&amp;format=png&amp;auto=webp&amp;s=4a87b45f01ac40ef8ff249aee902261047851e20"
                    },
                }
            }
        }
        it('renders gallery images and next button', () => {
            renderWithProviders(<PostBody post={post} isListingCard={false} />);
            const image = screen.getByRole('img', { name: /https:\/\/i\.redd\.it\/b7k5birn33781\.jpg/i });
            const nextButton = screen.getByRole('img', { name: /next/i });
            expect(image).toBeInTheDocument();
            expect(nextButton).toBeInTheDocument();
        })

        it('does not render the previous button when gallery is on the first image', () => {
            renderWithProviders(<PostBody post={post} isListingCard={false} />);
            const prevButton = screen.queryByRole('img', { name: /previous/i });

            expect(prevButton).toBeNull();
        })

        it('renders the next image and previous button when the next button is clicked', async () => {
            renderWithProviders(<PostBody post={post} isListingCard={false} />);
            let nextButton = screen.getByRole('img', { name: /next/i });
            userEvent.click(nextButton);
            const nextImage = await screen.findByRole('img', { name: /https:\/\/i\.redd\.it\/cztd1aqn33781\.png/ });
            const prevButton = await screen.findByRole('img', { name: /previous/i });
            nextButton = screen.queryByRole('img', { name: /next/i });

            expect(nextImage).toBeInTheDocument();
            expect(prevButton).toBeInTheDocument();
            expect(nextButton).toBeNull();
        })

        it('renders the previous and the next button when the previous button is clicked', async () => {
            renderWithProviders(<PostBody post={post} isListingCard={false} />);
            let nextButton = screen.getByRole('img', { name: /next/i });
            userEvent.click(nextButton);
            let prevButton = await screen.findByRole('img', { name: /previous/i });
            userEvent.click(prevButton);
            const image = await screen.findByRole('img', { name: /https:\/\/i\.redd\.it\/b7k5birn33781\.jpg/i });
            nextButton = await screen.findByRole('img', { name: /next/i });
            prevButton = screen.queryByRole('img', { name: /previous/i });

            expect(prevButton).toBeNull();
            expect(image).toBeInTheDocument();
            expect(nextButton).toBeInTheDocument();
        })

        it('navigates to the actual post when clicked if isListingCard is true', async () => {
            renderWithProviders(<PostBody post={post1} isListingCard={true} />);
            const gradient = screen.getByTestId('gradient-shadow');
            userEvent.click(gradient);
            await waitFor(() => {
                expect(mockedUsedNavigate).toHaveBeenCalledWith('/subreddits/testSubredditName/1337');
            })
        })
    })
})