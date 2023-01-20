import {AppThunk} from "../store";
import {deleteGroup} from "./group";
import {deleteQrCode, deleteQrCodesByGroupId} from "./qrCode";
import {QrCode} from "../../qrAttendance/interfaces";
import {deleteRegistriesByQrCodeId} from "./registry";

export const startDeleteGroupWithDependencies = (idGroup: string, qrCodes: QrCode[]):AppThunk => {
    return async(dispatch) => {

        // async code here

        // sync code here
        dispatch(deleteGroup(idGroup));
        dispatch(deleteQrCodesByGroupId(idGroup));
        qrCodes.forEach(qrCode => {
            dispatch(deleteRegistriesByQrCodeId(qrCode.id));
        });
    }
}
export const startDeleteQrCodeWithDependencies = (idQrCode: string):AppThunk => {
    return async(dispatch) => {

        // async code here

        // sync code here
        dispatch(deleteQrCode(idQrCode));
        dispatch(deleteRegistriesByQrCodeId(idQrCode));
    }
}
