import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {LoginPage} from "../../../src/auth/pages";
import {useAuthStore } from "../../../src/hooks/useAuthStore";

jest.mock("../../src/hooks/useAuthStore.ts")

describe('Tests for <LoginPage />', () => {
    beforeEach(() => jest.clearAllMocks());

    const mockStartLogin = jest.fn();

    test('should render the component successfully', async () => {

        (useAuthStore as jest.Mock).mockReturnValue({});

        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
        });
    });

    test('submit should call the startLogin function from useAuthStore with email and password values', async () => {

        (useAuthStore as jest.Mock).mockReturnValue({
            startLogin: mockStartLogin,
        });

        const email = 'limbermay@google.com';
        const password = '12345';

        render(
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
        );

        const emailField = screen.getByRole('textbox', {name: 'Email'});
        fireEvent.change(emailField, { target: {name: 'email', value: email}})

        const passwordField = screen.getByTestId('password');
        fireEvent.change(passwordField, {target: {name: 'password', value: password}});

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit(loginForm);

        await waitFor(() => {
            expect(mockStartLogin).toHaveBeenCalled();
            expect(mockStartLogin).toHaveBeenCalledWith(email, password);
        });
    });
});
