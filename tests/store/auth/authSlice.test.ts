import clearAllMocks = jest.clearAllMocks;
import {authSlice, login} from "../../../src/store/auth";
import {notAuthenticatedState, userCredentials} from "../../fixtures/userStates";
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
});
