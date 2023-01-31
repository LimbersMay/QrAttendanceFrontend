import {AppThunk} from "../../store";
import {QrCode} from "../../../qrAttendance/interfaces";
import {addEmptyQrCode, setQrCodes, updateQrCode} from "./qrCodeSlice";
import {qrAttendanceApi} from "../../../api/qrAttendanceApi";

export const startLoadingQrCodes = (): AppThunk => {
    return async (dispatch) => {
        // async code here
        const response = await qrAttendanceApi.get('/qrCode/all');
        const {body} = response.data;

        const qrCodes: QrCode[] = body.map((qrCode: any) => {
            return {
                id: qrCode.id,
                groupId: qrCode.groupId,
                name: qrCode.name,
                date: qrCode.createdAt,
                enabled: qrCode.enabled
            }
        });

        // sync code here
        dispatch(setQrCodes(qrCodes));
    }
}

export const startNewQrCode = (groupId: string): AppThunk => {
    return async (dispatch) => {

        const response = await qrAttendanceApi.post('/qrCode/create', {
            groupId: groupId,
            name: 'Default',
            enabled: false
        });

        const {body} = response.data;

        const newQrCode: QrCode = {
            groupId: groupId,
            id: body.id,
            name: body.name,
            date: body.createdAt,
            enabled: false
        }

        // sync code here
        dispatch(addEmptyQrCode(newQrCode));
    }
}

export const startUpdateQrCode = (qrCode: QrCode): AppThunk => {
    return async (dispatch) => {

        // async code here
        const {id, name, enabled, date} = qrCode;

        await qrAttendanceApi.put('/qrCode/update', {
            id: id,
            updatedFields: {
                name,
                enabled,
                updatedAt: date
            }
        });

        // sync code here
        dispatch(updateQrCode(qrCode));
    }
}
