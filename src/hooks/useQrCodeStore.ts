import {useAppDispatch, useAppSelector} from "../store";
import {
    selectQrCode,
    onSetActiveQrCode,
    updateQrCode, addEmptyQrCode, selectGroup, setQrCodes
} from "../store/qrAttendance";
import {QrCode} from "../qrAttendance/interfaces";
import {SnackbarUtilities} from "../utilities/snackbar-manager";
import {qrAttendanceApi} from "../api/qrAttendanceApi";
import {getEnvironments} from "../helpers/getEnvironments";

const { VITE_APIURL } = getEnvironments();

export const useQrCodeStore = () => {

    const dispatch = useAppDispatch();

    const { activeQrCode, qrCodes } = useAppSelector(selectQrCode);
    const { active } = useAppSelector(selectGroup);

    const setActiveQrCode = (qrCode: QrCode | null) => {
        dispatch(onSetActiveQrCode(qrCode));
    }

    const startUpdateQrCode = async (qrCode: QrCode) => {

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

        SnackbarUtilities.success(`QR Code ${qrCode.name} updated successfully`);
    }

    const startNewQrCode = async (name: string, manualRegistrationDate: string, enabled: boolean) => {

        const id = active?.id || '';

        const response = await qrAttendanceApi.post('/qrCode/create', {
            groupId: id,
            name,
            enabled,
            manualRegistrationDate,
            url: `${VITE_APIURL}/checkIn`
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

    const startLoadingQrCodes = async () => {
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

    return {
        // properties
        activeQrCode,
        qrCodes,

        // methods
        setActiveQrCode,
        startUpdateQrCode,
        startNewQrCode,
        startLoadingQrCodes
    }
}
