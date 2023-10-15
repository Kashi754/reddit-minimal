import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utilities/testUtils";
import { UserListing } from "./UserListing";

describe('UserListing Component', () => {
    const testUserFeed = [
        {
            icon_img: 'https://images.squarespace-cdn.com/content/v1/60cc480d9290423b888eb94a/1624780092100-4FLILMIV0YHHU45GB7XZ/Test+Pattern+t.png?format=2500w',
            name: 'testUser1',
            display_name_prefixed: 'u/testUser1',
        },
        {
            icon_img: 'https://images.squarespace-cdn.com/content/v1/60cc480d9290423b888eb94a/1624780092100-4FLILMIV0YHHU45GB7XZ/Test+Pattern+t.png?format=2500w',
            name: 'testUser2',
            display_name_prefixed: 'u/testUser2',
        },
        {
            icon_img: 'https://images.squarespace-cdn.com/content/v1/60cc480d9290423b888eb94a/1624780092100-4FLILMIV0YHHU45GB7XZ/Test+Pattern+t.png?format=2500w',
            name: 'testUser3',
            display_name_prefixed: 'u/testUser3',
        }
    ];

    it('should render without crashing', () => {
        renderWithProviders(<UserListing feed={testUserFeed} />);

        const firstCard = screen.getByText('u/testUser1');
        const secondCard = screen.getByText('u/testUser2');
        const thirdCard = screen.getByText('u/testUser3');

        expect(firstCard).toBeInTheDocument();
        expect(secondCard).toBeInTheDocument();
        expect(thirdCard).toBeInTheDocument();
    })

    it('renders nothing if no feed is provided', () => {
        renderWithProviders(<UserListing feed={null} />);
        const heading = screen.queryByRole('heading');
        expect(heading).toBeNull();
    })
})