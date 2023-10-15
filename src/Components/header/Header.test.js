import { waitFor, render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useDispatch } from 'react-redux';
import userEvent from "@testing-library/user-event";
import { Header } from "./Header";
import { renderWithProviders } from "../../utilities/testUtils";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('Header Component', () => {

    it('should render the logo and header text', () => {
        renderWithProviders(<Header />);
        
        const logo = screen.getByAltText('reddit logo');
        const headerText = screen.getByText('Minimal');
    
        expect(logo).toBeInTheDocument();
        expect(headerText).toBeInTheDocument();
    });

    it('should render the navigation bar', () => {
        renderWithProviders(<Header />);

        const navigationBar = screen.getByRole('navigation');

        expect(navigationBar).toBeInTheDocument();
    });

    it('should render the search bar when the search button is clicked', async () => {
        renderWithProviders(<Header />);
    
        const searchButton = screen.queryAllByText('Home')[0];
        userEvent.click(searchButton);

        await waitFor(() => screen.getByTestId('show'));
    
        const searchBar = screen.getByTestId('show');
    
        expect(searchBar).toBeInTheDocument();
    });

    it('should hide the search bar when the user clicks outside of it', async () => {
        renderWithProviders(<Header />);

        const searchButton = screen.queryAllByText('Home')[0];
        await userEvent.click(searchButton);
    
        await waitFor(() => screen.getByTestId('show'));
        let searchBar = screen.getByTestId('show');
    
        // Click outside of the search bar
        document.body.click();

        await waitFor(() => screen.getByTestId('hide'));
        searchBar = screen.getByTestId('hide');
    
        // The search bar should be hidden
        expect(searchBar).toHaveClass('hide');
    });

    it('should not hide the search bar when the user clicks the search field', async () => {
        renderWithProviders(<Header />);

        const menuButton = screen.queryAllByText('Home')[0];
        userEvent.click(menuButton);
    
        await waitFor(() => screen.getByTestId('show'));
        let searchBar = screen.getByTestId('show');
        const searchField = screen.getByPlaceholderText('Search...');
    
        await userEvent.click(searchField);

        await waitFor(() => screen.queryByTestId('hide'));
        searchBar = screen.queryByTestId('show');
    
        // The search bar should still be visible
        expect(searchBar).toHaveClass('show');
    });

    test('that the header navigates to the correct path when the search button is clicked', async () => {
    
        renderWithProviders(<Header navigate={mockedUsedNavigate} />);
    
        const menuButton = screen.queryAllByText('Home')[0];
        userEvent.click(menuButton);
    
        await waitFor(() => screen.getByTestId('show'));
        const searchField = screen.getByRole('textbox');
        const searchSubmit = screen.getAllByRole('button')[1];
    
        await userEvent.type(searchField, 'test');
        userEvent.click(searchSubmit);
    
        await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledWith({
            pathname: '/search',
            search: '?q=test',
        }));
    });
});