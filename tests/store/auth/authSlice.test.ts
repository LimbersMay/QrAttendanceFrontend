import clearAllMocks = jest.clearAllMocks;
import {authSlice, login, logout} from "../../../src/store/auth";
import {authenticatedUserState, notAuthenticatedState, userCredentials} from "../../fixtures/userStates";
import {authStatusTypes} from "../../../src/auth/types";

describe('Tests for authSlice', () => {
    beforeEach(() => clearAllMocks());

    test('should return the default values', () => {
        const state = authSlice.getInitialState();
        expect(state).toEqual(notAuthenticatedState);
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
        const state = authSlice.reducer(authenticatedUserState, logout(null));
        expect(state).toEqual({
            displayName: null,
            email: null,
            uid: null,
            status: authStatusTypes.notAuthenticated,
            errorMessage: null
        });
    });
});
