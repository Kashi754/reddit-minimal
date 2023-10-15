import { screen } from "@testing-library/react"
import { renderWithProviders } from "../../utilities/testUtils"
import { UserCard } from "./UserCard"

describe('UserCard Component', () => {
    const testUser = {
        icon_img: 'https://images.squarespace-cdn.com/content/v1/60cc480d9290423b888eb94a/1624780092100-4FLILMIV0YHHU45GB7XZ/Test+Pattern+t.png?format=2500w',
        name: 'testUser',
        display_name_prefixed: 'u/testUser',
    }

    const testUser2 = {
        icon_img: 'https://images.squarespace-cdn.com/content/v1/60cc480d9290423b888eb94a/1624780092100-4FLILMIV0YHHU45GB7XZ/Test+Pattern+t.png?format=2500w',
        display_name_prefixed: 'u/testUser',
    }

    it('should render without crashing', () => {
        renderWithProviders(<UserCard user={testUser} />);
        const title = screen.getByRole('heading', { name: /^testUser$/i });
        expect(title).toBeInTheDocument();
    })

    it('should render a link to the user\'s page', () => {
        renderWithProviders(<UserCard user={testUser} />);
        const link = screen.getByRole('link', { name: /u\/testUser/ });
        expect(link).toBeInTheDocument();
        expect(link.getAttribute('href')).toBe('/users/testUser');
    })

    it('should render an icon for the user', () => {
        renderWithProviders(<UserCard user={testUser} />);
        const icon = screen.getByRole('img', { name: /testUser/i });
        expect(icon).toBeInTheDocument();
        expect(icon.getAttribute('src')).toBe('https://images.squarespace-cdn.com/content/v1/60cc480d9290423b888eb94a/1624780092100-4FLILMIV0YHHU45GB7XZ/Test+Pattern+t.png');
    })

    it('should render the user\'s name even if the name property of the User is not given', () => {
        renderWithProviders(<UserCard user={testUser} />);
        const name = screen.getByRole('heading', {name: /^testUser$/i});
        expect(name).toBeInTheDocument();
    })
})