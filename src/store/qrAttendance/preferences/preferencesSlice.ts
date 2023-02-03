import {createSlice} from '@reduxjs/toolkit';
import {RootState} from "../../store";

interface preferencesState {
    preferenceId: string;
    language: string;
    timezone: string;
}

const initialState: preferencesState = {
    preferenceId: '',
    language: '',
    timezone: 'America/Merida'
}

export const preferencesSlice = createSlice({
    name: 'preferences',
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
        }
    }
});


// Action creators are generated for each case reducer function
export const { setLanguage } = preferencesSlice.actions;
export const preferencesSelector = (state: RootState) => state.preferences;
