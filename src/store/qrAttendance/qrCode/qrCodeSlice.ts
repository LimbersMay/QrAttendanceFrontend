import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {QrCode} from "../../../qrAttendance/interfaces";
import {RootState} from "../../store";

interface QrCodeState {
    qrCodes: QrCode[];
    activeQrCode: QrCode | null;
}

const initialState: QrCodeState = {
    qrCodes: [],
    activeQrCode: null
}

export const qrCodeSlice = createSlice({
    name: 'qrCode',
    initialState,
    reducers: {
        setActiveQrCode: (state, { payload }: PayloadAction<QrCode | null>) => {
            state.activeQrCode = payload;
        },
        addEmptyQrCode: (state, { payload }: PayloadAction<QrCode>) => {
            state.qrCodes.push(payload)
        },
        setQrCodes: (state, { payload }: PayloadAction<QrCode[]>) => {
            state.qrCodes = payload;
        },
        deleteQrCode: (state, { payload }: PayloadAction<string>) => {
            state.qrCodes = state.qrCodes.filter(qrCode => qrCode.id !== payload);
        },
        updateQrCode: (state, { payload }: PayloadAction<QrCode>) => {
            state.qrCodes = state.qrCodes.map(qrCode => {
                if (qrCode.id === payload.id) return payload;
                return qrCode;
            });
        },
        deleteQrCodesByGroupId: (state, { payload }: PayloadAction<string>) => {
            state.qrCodes = state.qrCodes.filter(qrCode => qrCode.groupId !== payload);
        }
    }
});

// Action creators are generated for each case reducer function
export const { setActiveQrCode, addEmptyQrCode, deleteQrCode, updateQrCode, deleteQrCodesByGroupId, setQrCodes } = qrCodeSlice.actions;
export const selectQrCode = (state: RootState) => state.qrCode;