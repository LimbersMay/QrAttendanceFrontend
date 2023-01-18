import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Group} from "../../qrAttendance/interfaces";
import {RootState} from "../store";

interface QrAttendanceState {
    active: Group | null;
    groups: Group[];
}

const initialState: QrAttendanceState = {
    active: null,
    groups: []
}

export const qrAttendanceSlice = createSlice({
    name: 'qrAttendance',
    initialState,
    reducers: {
        setActiveGroup: (state, action: PayloadAction<Group>) => {
            state.active = action.payload;
        }
    }
});


// Action creators are generated for each case reducer function
export const { setActiveGroup } = qrAttendanceSlice.actions;
export const selectQrAttendance = (state: RootState) => state.qrAttendance;
