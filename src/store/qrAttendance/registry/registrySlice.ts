import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Registry} from "../../../qrAttendance/interfaces";
import {RootState} from "../../store";

const registries: Registry[] = [
    {
        id: new Date().toISOString() + '1',
        qrCodeId: '344',
        date: new Date().toUTCString(),
        name: 'Juan',
        sourname: 'Hau',
        lastname: 'Diaz'
    }
]

interface RegistryState {
    registries: Registry[];
}

const initialState: RegistryState = {
    registries: registries
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
        updateRegistry: (state, action: PayloadAction<Registry>) => {
            state.registries = state.registries.map(registry => {
                if (registry.id === action.payload.id) return action.payload;
                return registry;
            })
        }
    }
});

// Action creators are generated for each case reducer function
export const { addNewRegistry, deleteRegistry, updateRegistry } = registrySlice.actions;
export const selectRegistry = (state: RootState) => state.registry;