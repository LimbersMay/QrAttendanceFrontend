import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Group, QrCode} from "../../qrAttendance/interfaces";
import {RootState} from "../store";

interface QrAttendanceState {
    active: Group | null;
    groups: Group[];
}

const groups: Group[] = [
    {
        id: 1,
        name: 'Group 1',
        date: '2021-01-01',
        qrCodes: [
            {
                id: '1',
                name: 'QR Code 1',
                date: '2021-01-01',
                enabled: true,
                registries: 2,
                history: [
                    {
                        id: '55',
                        date: '2021-01-01',
                        name: 'John Doe',
                        lastname: 'Doe',
                        sourname: 'John',
                    },
                    {
                        id: '56',
                        date: '2021-05-01',
                        name: 'Alice Smith',
                        lastname: 'Smith',
                        sourname: 'Nandor',
                    }
                ]
            }
        ]
    }
];

const initialState: QrAttendanceState = {
    active: null,
    groups: groups
}

export const qrAttendanceSlice = createSlice({
    name: 'qrAttendance',
    initialState,
    reducers: {
        setActiveGroup: (state, action: PayloadAction<Group>) => {
            state.active = action.payload;
        },
        removeQrCodeById: (state, action: PayloadAction<string>) => {
            if (!state.active) return;
            state.active.qrCodes = state.active.qrCodes.filter(qrCode => qrCode.id !== action.payload);

            const { groups } = state;
            state.groups = groups.map(group => {
                group.qrCodes = group.qrCodes.filter(qrCode => qrCode.id !== action.payload);
                return group;
            });
        },
        updateGroup: (state, action: PayloadAction<Group>) => {
            state.groups = state.groups.map(group => {
                if (group.id === action.payload.id) return action.payload;

                return group;
            });

            state.active = action.payload;
        },
        updateQrCode: (state, action: PayloadAction<QrCode>) => {

            const {active, groups = []} = state;
            if (!active) return;

            state.groups = groups.map(group => {
                if (group.id !== active.id) return group;

                const newGroup = {
                    ...group,
                    qrCodes: group.qrCodes.map(qrCode => {
                        if (qrCode.id === action.payload.id) return action.payload;
                        return qrCode;
                    })
                };

                // Update active group
                state.active = newGroup;
                return newGroup;
            });
        },
        addEmtpyQrCode: (state, action: PayloadAction<QrCode>) => {
            const {active, groups = []} = state;
            if (!active) return;

            state.groups = groups.map(group => {
                if (group.id !== active.id) return group;

                const newGroup = {
                    ...group,
                    qrCodes: [...group.qrCodes, action.payload]
                };

                // Update active group
                state.active = newGroup;

                return newGroup;
            });
        }
    }
});

// Action creators are generated for each case reducer function
export const {setActiveGroup, removeQrCodeById, updateQrCode, updateGroup, addEmtpyQrCode} = qrAttendanceSlice.actions;
export const selectQrAttendance = (state: RootState) => state.qrAttendance;
