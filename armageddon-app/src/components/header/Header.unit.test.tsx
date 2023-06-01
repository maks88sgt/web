import { Header } from './Header';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AsteroidsContextProvider } from "../asteroids-context/AsteroidsContext";

describe('[components] Header', () => {
    beforeEach(() => {
        render(
          <AsteroidsContextProvider>
            <BrowserRouter>
                <Header/>
            </BrowserRouter>
          </AsteroidsContextProvider>
        );
    });
    test('should contains h1 html element', () => {
        const header = screen.getByRole('heading');
        expect(header).toBeInTheDocument();
        //expect(header).toHaveTextContent('ARMAGGEDON V');
    });
    it('should contains links to asteroids and destroyment pages', () => {
        const links = screen.getAllByRole('link');
        expect(links[0]).toHaveAttribute('href', '/asteroids');
        expect(links[1]).toHaveAttribute('href', '/destroyment');
    });
    it('should contains button, after click on it should hide button and display input', () => {
        const button = screen.getByText('Unauthorized');
        expect(button).toBeInTheDocument();
        expect(screen.queryByTestId('api_key_input')).not.toBeInTheDocument();
        fireEvent.click(button);
 1
        waitFor(() => {
            expect(button).not.toBeInTheDocument();
            expect(screen.getByTestId('api_key_input')).toBeInTheDocument();
        });
    });
});
