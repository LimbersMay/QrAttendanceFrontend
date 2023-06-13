import {authStatusTypes} from "../../src/auth/types";
import {AuthState} from "../../src/store/auth";

export const userCredentials = {
    displayName: "Limbers",
    email: "limber@google.com",
    uid: "12453"
}

export const notAuthenticatedState: AuthState = {
    status: authStatusTypes.checking,
    uid: null,
    email: null,
    displayName: null,
    errorMessage: null
}

export const authenticatedUserState = {
    ...userCredentials
}
