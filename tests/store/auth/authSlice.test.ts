import clearAllMocks = jest.clearAllMocks;
import {authSlice, login, logout} from "../../../src/store/auth";
import {userCredentials} from "../../fixtures/userStates";
import {authStatusTypes} from "../../../src/auth/types";
import {authenticatedState, initialState, notAuthenticatedState} from "../../fixtures/authStates";

describe('Tests for authSlice', () => {
    beforeEach(() => clearAllMocks());

    test('should return the default values', () => {
        const state = authSlice.getInitialState();
        expect(state).toEqual(initialState);
    });

    test('should login the user', () => {
        const state = authSlice.reducer(notAuthenticatedState, login(userCredentials));
        expect(state).toEqual({
            status: authStatusTypes.authenticated,
            uid: userCredentials.uid,
            email: userCredentials.email,
            displayName: userCredentials.displayName,
            errorMessage: null
        });
    });

    test('should logout the user without error message', () => {
        const state = authSlice.reducer(authenticatedState, logout(null));
        expect(state).toEqual({
            displayName: null,
            email: null,
            uid: null,
            status: authStatusTypes.notAuthenticated,
            errorMessage: null
        });
    });

    test('should logout the user with error message', () => {

        const errorMessage = "An error occurred";
        const state = authSlice.reducer(authenticatedState, logout(errorMessage));

        expect(state).toEqual({
            displayName: null,
            email: null,
            uid: null,
            status: authStatusTypes.notAuthenticated,
            errorMessage: errorMessage
        });
    });
});
