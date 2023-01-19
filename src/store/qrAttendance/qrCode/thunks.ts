import {AppThunk} from "../../store";
import {QrCode} from "../../../qrAttendance/interfaces";
import {addEmptyQrCode} from "./qrCodeSlice";

export const startNewQrCode = (qrCode: QrCode): AppThunk => {
    return async(dispatch) => {

        // async code here

        // sync code here
        dispatch(addEmptyQrCode(qrCode));
    }
}