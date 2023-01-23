import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {authStatusTypes} from "../../auth/types";
import {RootState} from "../store";

// Define a type for the slice state
interface AuthState {
    status?: string;
    uid: string | null;
    email: string | null;
    displayName: string | null;
    errorMessage?: string | null;
}

const initialState: AuthState = {
    status: authStatusTypes.checking,
    uid: null,
    email: null,
    displayName: null,
    errorMessage: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }: PayloadAction<AuthState>) => {
            state.status = authStatusTypes.authenticated;
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.errorMessage = null;
        },
        logout: (state, { payload }: PayloadAction<string | null>) => {
            state.status = authStatusTypes.notAuthenticated;
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.errorMessage = payload;
        },
        checkingCredentials: (state) => {
            state.status = authStatusTypes.checking;
        }
    }
});

// Action creators are generated for each case reducer function
export const {login, logout, checkingCredentials} = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
