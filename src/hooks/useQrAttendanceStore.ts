import {useAppDispatch, useAppSelector} from "../store";
import {QrCode} from "../qrAttendance/interfaces";
import {
    deleteGroup, deleteQrCode,
    deleteQrCodesByGroupId,
    deleteRegistriesByQrCodeId, onSetActiveQrCode, selectQrCode
} from "../store/qrAttendance";
import { qrAttendanceApi } from "../api/qrAttendanceApi";
import {SnackbarUtilities} from "../utilities/snackbar-manager";

export const useQrAttendanceStore = () => {

    const dispatch = useAppDispatch();
    const { activeQrCode } = useAppSelector(selectQrCode);

    const startDeleteGroupWithDependencies = async (groupId: string, qrCodes: QrCode[]) => {

        // async code here
        await qrAttendanceApi.delete(`/group/delete/${groupId}`);

        // sync code here
        dispatch(deleteGroup(groupId));
        dispatch(deleteGroup(groupId));
        qrCodes.forEach(qrCode => {
            dispatch(deleteRegistriesByQrCodeId(qrCode.id));
        });
        dispatch(deleteQrCodesByGroupId(groupId));
    }

    const startDeleteQrCodeWithDependencies = async () => {
        const idQrCode = `${activeQrCode?.id}`;

        // async code here
        await qrAttendanceApi.delete(`/qrCode/delete/${idQrCode}`);

        // sync code here
        dispatch(deleteQrCode(idQrCode));
        dispatch(deleteRegistriesByQrCodeId(idQrCode));

        dispatch(onSetActiveQrCode(null));
        SnackbarUtilities.sucess(`QR Code ${activeQrCode?.name} deleted successfully`);
    }

    return {
        // properties

        // methods
        startDeleteGroupWithDependencies,
        startDeleteQrCodeWithDependencies
    }

}
