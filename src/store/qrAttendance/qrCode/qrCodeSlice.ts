import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {QrCode} from "../../../qrAttendance/interfaces";
import {RootState} from "../../store";

interface QrCodeState {
    qrCodes: QrCode[];
}

const initialState: QrCodeState = {
    qrCodes: []
}

export const qrCodeSlice = createSlice({
    name: 'qrCode',
    initialState,
    reducers: {
        addEmptyQrCode: (state, action: PayloadAction<QrCode>) => {
            state.qrCodes.push(action.payload)
        },
        setQrCodes: (state, action: PayloadAction<QrCode[]>) => {
            state.qrCodes = action.payload;
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
export const { addEmptyQrCode, deleteQrCode, updateQrCode, deleteQrCodesByGroupId, setQrCodes } = qrCodeSlice.actions;
export const selectQrCode = (state: RootState) => state.qrCode;