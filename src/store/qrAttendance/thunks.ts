import {AppThunk} from "../store";
import {removeQrCodeById} from "./qrAttendanceSlice";
import {QrCode} from "../../qrAttendance/interfaces";

export const startRemovingQrCodeById = (qrCodeId: string): AppThunk => {
    return async(dispatch) => {

        // Async code here

        // sync code here
        dispatch(removeQrCodeById(qrCodeId));
    }
}
