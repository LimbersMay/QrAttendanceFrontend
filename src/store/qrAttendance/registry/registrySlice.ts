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
        addNewRegistry: (state, action: PayloadAction<Registry>) => {
            state.registries.push(action.payload);
        },
        deleteRegistry: (state, action: PayloadAction<string>) => {
            state.registries = state.registries.filter(registry => registry.id !== action.payload);
        },
        setRegistries: (state, action: PayloadAction<Registry[]>) => {
            state.registries = action.payload;
        },
        updateRegistry: (state, action: PayloadAction<Registry>) => {
            state.registries = state.registries.map(registry => {
                if (registry.id === action.payload.id) return action.payload;
                return registry;
            })
        },
        deleteRegistriesByQrCodeId: (state, action: PayloadAction<string>) => {
            state.registries = state.registries.filter(registry => registry.qrCodeId !== action.payload);
        }
    }
});

// Action creators are generated for each case reducer function
export const { addNewRegistry, deleteRegistry, deleteRegistriesByQrCodeId, updateRegistry, setRegistries } = registrySlice.actions;
export const selectRegistry = (state: RootState) => state.registry;