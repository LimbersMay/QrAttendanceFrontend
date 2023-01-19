import {AppThunk} from "../store";
import {addEmtpyQrCode, removeQrCodeById, updateGroup, updateQrCode} from "./qrAttendanceSlice";
import {Group, QrCode} from "../../qrAttendance/interfaces";

export const startRemoveQrCode = (qrCodeId: string): AppThunk => {
    return async (dispatch) => {

        // Async code here

        // sync code here
        dispatch(removeQrCodeById(qrCodeId));
    }
}

export const startAddQrCodeToGroup = (qrCode: QrCode): AppThunk => {
    return async (dispatch, getState) => {

        // Async code here

        // sync code here
        dispatch(updateQrCode(qrCode));
    }
}

export const startSaveGroup = (group: Group): AppThunk => {
    return async (dispatch) => {

        // Async code here

        // sync code here
        dispatch(updateGroup(group));
    }
}

export const startAddEmptyQrCode = (qrCode: QrCode): AppThunk => {
    return async (dispatch) => {

        // Async code here

        // sync code here
        dispatch(addEmtpyQrCode(qrCode));
    }
}
