import {authStatusTypes} from "../../src/auth/types";
import {AuthState} from "../../src/store/auth";

export const initialState: AuthState = {
    status: authStatusTypes.checking,
    uid: null,
    email: null,
    displayName: null,
    errorMessage: null
}

export const authenticatedState: AuthState = {
    status: authStatusTypes.authenticated, // 'authenticated', 'not-authenticated'
    displayName: 'Limbers',
    email: 'limbermay@google.com',
    uid: 'uid-12-32',
    errorMessage: null
}

export const notAuthenticatedState: AuthState = {
    status: authStatusTypes.notAuthenticated,
    uid: null,
    email: null,
    displayName: null,
    errorMessage: null
}
