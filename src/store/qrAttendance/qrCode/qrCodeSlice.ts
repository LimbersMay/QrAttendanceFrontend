import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {QrCode} from "../../../qrAttendance/interfaces";
import {RootState} from "../../store";

export interface QrCodeState {
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
        onSetActiveQrCode: (state, { payload }: PayloadAction<QrCode | null>) => {
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
                if (qrCode.id === payload.id) {

                    // When we update the active qrCode, we also update the activeQrCode state
                    // If we don't do this, the activeQrCode state will be out of sync with the qrCodes state
                    state.activeQrCode = payload;
                    return payload
                }
                return qrCode;
            });
        },
        deleteQrCodesByGroupId: (state, { payload }: PayloadAction<string>) => {
            state.qrCodes = state.qrCodes.filter(qrCode => qrCode.groupId !== payload);
        }
    }
});

// Action creators are generated for each case reducer function
export const { onSetActiveQrCode, addEmptyQrCode, deleteQrCode, updateQrCode, deleteQrCodesByGroupId, setQrCodes } = qrCodeSlice.actions;
export const selectQrCode = (state: RootState) => state.qrCode;