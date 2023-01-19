import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Group} from "../../../qrAttendance/interfaces";
import {RootState} from "../../store";

const groups: Group[] = [
    {
        id: '9933',
        name: 'Group 1',
        date: '2021-01-01',
    },
    {
        id: '5301',
        name: 'Group 2',
        date: '2023-01-19'
    }
];

interface groupState {
    active: Group | null;
    groups: Group[];
}

const initialState: groupState = {
    active: null,
    groups: groups
}

export const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        setActiveGroup: (state, action: PayloadAction<Group>) => {
            state.active = action.payload;
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
        }
    }
});


// Action creators are generated for each case reducer function
export const { setActiveGroup, updateGroup, deleteGroup } = groupSlice.actions;
export const selectGroup = (state: RootState) => state.group;