import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Group} from "../../../qrAttendance/interfaces";
import {RootState} from "../../store";

interface groupState {
    active: Group | null;
    groups: Group[];
}

const initialState: groupState = {
    active: null,
    groups: []
}

export const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        setActiveGroup: (state, action: PayloadAction<Group>) => {
            state.active = action.payload;
        },
        setGroups(state, action: PayloadAction<Group[]>) {
            state.groups = action.payload;
        },
        updateGroup: (state, { payload }: PayloadAction<Group>) => {
            state.groups = state.groups.map(group => {
                if (state.active && (payload.id === group.id)) return payload;

                return group;
            })
        },
        deleteGroup: (state, { payload }: PayloadAction<string>) => {
            state.groups = state.groups.filter(group => group.id !== payload);
            state.active = null;
        },
        addEmptyGroup: (state, action: PayloadAction<Group>) => {
            state.groups.push(action.payload);
        }
    }
});


// Action creators are generated for each case reducer function
export const { setActiveGroup, updateGroup, deleteGroup, addEmptyGroup, setGroups } = groupSlice.actions;
export const selectGroup = (state: RootState) => state.group;