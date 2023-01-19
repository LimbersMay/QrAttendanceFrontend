import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Registry} from "../../../qrAttendance/interfaces";
import {RootState} from "../../store";

interface RegistryState {
    registries: Registry[];
}

const initialState: RegistryState = {
    registries: []
}

export const registrySlice = createSlice({
    name: 'registry',
    initialState,
    reducers: {
        addEmptyRegistry: (state, action: PayloadAction<Registry>) => {
            state.registries.push(action.payload);
        },
    }
});

// Action creators are generated for each case reducer function
export const { addEmptyRegistry } = registrySlice.actions;
export const selectRegistry = (state: RootState) => state.registry;