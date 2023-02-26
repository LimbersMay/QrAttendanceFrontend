import {AppThunk} from "../../store";
import {QrCode} from "../../../qrAttendance/interfaces";
import {addEmptyQrCode, setQrCodes, updateQrCode} from "./qrCodeSlice";
import {qrAttendanceApi} from "../../../api/qrAttendanceApi";
import {getEnvironments} from "../../../helpers/getEnvironments";

const { VITE_APIURL } = getEnvironments();

export const startLoadingQrCodes = (): AppThunk => {
    return async (dispatch) => {
        // async code here
        const response = await qrAttendanceApi.get('/qrCode/all');
        const {body} = response.data;

        const qrCodes: QrCode[] = body.map((qrCode: any) => {
            return {
                id: qrCode.id,
                url: qrCode.url,
                formId: qrCode.formId,
                groupId: qrCode.groupId,
                name: qrCode.name,
                date: qrCode.manualRegistrationDate,
                enabled: qrCode.enabled
            }
        });

        // sync code here
        dispatch(setQrCodes(qrCodes));
    }
}

export const startNewQrCode = (name: string, manualRegistrationDate: string, enabled: boolean): AppThunk => {
    return async (dispatch, getState) => {

        const { active } = getState().group;
        const id = active?.id || '';

        const response = await qrAttendanceApi.post('/qrCode/create', {
            groupId: id,
            name,
            enabled,
            manualRegistrationDate,
            url: 'https://qrattendancebackend.up.railway.app/checkIn'
        });

        const {body} = response.data;

        const newQrCode: QrCode = {
            groupId: id,
            id: body.id,
            url: body.url,
            formId: body.formId,
            name: body.name,
            date: body.manualRegistrationDate,
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
                manualRegistrationDate: date
            }
        });

        // sync code here
        dispatch(updateQrCode(qrCode));
    }
}
