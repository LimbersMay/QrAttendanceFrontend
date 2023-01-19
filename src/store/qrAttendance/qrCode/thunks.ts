import {AppThunk} from "../../store";
import {QrCode} from "../../../qrAttendance/interfaces";
import {addEmptyQrCode, deleteQrCode, updateQrCode} from "./qrCodeSlice";

export const startNewQrCode = (groupId: string): AppThunk => {
    return async(dispatch) => {

        const newQrCode: QrCode = {
            id: '',
            groupId: groupId,
            name: 'Default',
            date: '2023-01-18',
            registries: 0,
            enabled: false
        }

        // async code here
        // get the id from the backend
        newQrCode.id = new Date().toISOString();

        // sync code here
        dispatch(addEmptyQrCode(newQrCode));
    }
}

export const startDeleteQrCode = (qrCodeId: string): AppThunk => {
    return async(dispatch) => {
        // async code here

        // sync code here
        dispatch(deleteQrCode(qrCodeId));
    }
}

export const startUpdateQrCode = (qrCode: QrCode): AppThunk => {
    return async(dispatch) => {

        // async code here

        // sync code here
        dispatch(updateQrCode(qrCode));
    }
}
