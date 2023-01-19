import {AppThunk} from "../../store";
import {QrCode} from "../../../qrAttendance/interfaces";
import {addEmptyQrCode, deleteQrCode, updateQrCode} from "./qrCodeSlice";

export const startNewQrCode = (qrCode: QrCode): AppThunk => {
    return async(dispatch) => {

        // async code here

        // sync code here
        dispatch(addEmptyQrCode(qrCode));
    }
}

export const startDeleteQrCode = (qrCodeId: string): AppThunk => {
    return async(dispatch) => {
        // async code here

        // sync code here
        dispatch(deleteQrCode(qrCodeId));
    }
}
