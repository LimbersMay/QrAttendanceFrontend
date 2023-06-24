import {MemoryRouter} from "react-router-dom";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import clearAllMocks = jest.clearAllMocks;
import {SignupPage} from "../../../src/auth/pages";
import {useAuthStore} from "../../../src/hooks/useAuthStore";
import {testUserCredentials} from "../../fixtures/testUser";

jest.mock("../../../src/hooks/useAuthStore.ts")

describe('Tests for <SignupPage />', () => {
    beforeEach(() => clearAllMocks());

    const mockStartCreatingUser = jest.fn();

    test('should render the component successfully', async () => {
        (useAuthStore as jest.Mock).mockReturnValue({});

        render(
            <MemoryRouter>
                <SignupPage />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getAllByText("Register").length).toBeGreaterThanOrEqual(1);
        });
    });

    test('Signup button should call the startCreatingUser with the correct values', async () => {
        (useAuthStore as jest.Mock).mockReturnValue({
            startCreatingUser: mockStartCreatingUser
        });

        render(
            <MemoryRouter>
                <SignupPage />
            </MemoryRouter>
        );

        const { email, name, lastname, password } = testUserCredentials;

        const nameField = screen.getByRole('textbox', {name: 'Name'});
        fireEvent.change(nameField, { target: {name: 'name', value: name}})

        const lastnameField = screen.getByRole('textbox', {name: 'Lastname'});
        fireEvent.change(lastnameField, { target: {name: 'lastname', value: lastname}})

        const emailField = screen.getByRole('textbox', {name: 'Email'});
        fireEvent.change(emailField, { target: {name: 'email', value: email}})

        const passwordField = screen.getByTestId('password');
        fireEvent.change(passwordField, {target: {name: 'password', value: password}});

        const repeatPasswordField = screen.getByTestId('password2');
        fireEvent.change(repeatPasswordField, {target: {name: 'password2', value: password}});

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit(loginForm);

        await waitFor(() => {
            expect(mockStartCreatingUser).toHaveBeenCalled();
            expect(mockStartCreatingUser).toHaveBeenCalledWith({
                email,
                name,
                password,
                lastname
            });
        });
    });
});
