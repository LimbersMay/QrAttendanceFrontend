import {useAppDispatch, useAppSelector} from "../store";
import {
    selectQrCode,
    onSetActiveQrCode,
    updateQrCode, addEmptyQrCode, selectGroup, deleteQrCode, deleteRegistriesByQrCodeId
} from "../store/qrAttendance";
import {QrCode} from "../qrAttendance/interfaces";
import {SnackbarUtilities} from "../utilities/snackbar-manager";
import {qrAttendanceApi} from "../api/qrAttendanceApi";

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

        SnackbarUtilities.sucess(`QR Code ${qrCode.name} updated successfully`);
    }

    const startNewQrCode = async (name: string, manualRegistrationDate: string, enabled: boolean) => {

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

    return {
        // properties
        activeQrCode,
        qrCodes,

        // methods
        setActiveQrCode,
        startUpdateQrCode,
        startNewQrCode
    }
}
