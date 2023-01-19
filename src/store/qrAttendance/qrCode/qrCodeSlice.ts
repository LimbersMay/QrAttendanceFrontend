import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {QrCode} from "../../../qrAttendance/interfaces";
import {RootState} from "../../store";

const qrCodes: QrCode[] = [
    {
        id: '344',
        groupId: '9933',
        name: 'QrCode 1',
        date: '2021-01-01',
        enabled: true,
        registries: 0
    }
];

interface QrCodeState {
    qrCodes: QrCode[];
}

const initialState: QrCodeState = {
    qrCodes: qrCodes
}

export const qrCodeSlice = createSlice({
    name: 'qrCode',
    initialState,
    reducers: {
        addEmptyQrCode: (state, action: PayloadAction<QrCode>) => {
            state.qrCodes.push(action.payload)
        }
    }
});


// Action creators are generated for each case reducer function
export const { addEmptyQrCode } = qrCodeSlice.actions;
export const selectQrCode = (state: RootState) => state.qrCode;