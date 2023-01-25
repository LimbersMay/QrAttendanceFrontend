import {AppThunk} from "../store";
import {deleteGroup} from "./group";
import {deleteQrCode, deleteQrCodesByGroupId} from "./qrCode";
import {QrCode} from "../../qrAttendance/interfaces";
import {deleteRegistriesByQrCodeId} from "./registry";
import {qrAttendanceApi} from "../../api/qrAttendanceApi";

export const startDeleteGroupWithDependencies = (idGroup: string, qrCodes: QrCode[]): AppThunk => {
    return async (dispatch) => {

        // async code here
        await qrAttendanceApi.delete('/group/delete', {
            data: {
                id: idGroup
            }
        });

        // sync code here
        dispatch(deleteGroup(idGroup));
        dispatch(deleteGroup(idGroup));
        qrCodes.forEach(qrCode => {
            dispatch(deleteRegistriesByQrCodeId(qrCode.id));
        });
        dispatch(deleteQrCodesByGroupId(idGroup));
    }
}
export const startDeleteQrCodeWithDependencies = (idQrCode: string): AppThunk => {
    return async (dispatch) => {

        // async code here

        // sync code here
        dispatch(deleteQrCode(idQrCode));
        dispatch(deleteRegistriesByQrCodeId(idQrCode));
    }
}
