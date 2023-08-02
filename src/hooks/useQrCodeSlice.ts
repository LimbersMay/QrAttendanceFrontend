import {useAppDispatch, useAppSelector} from "../store";
import {
    selectQrCode,
    setActiveQrCode,
    startDeleteQrCodeWithDependencies, startNewQrCode,
    startUpdateQrCode
} from "../store/qrAttendance";
import {QrCode} from "../qrAttendance/interfaces";
import {SnackbarUtilities} from "../utilities/snackbar-manager";

export const useQrCodeSlice = () => {

    const dispatch = useAppDispatch();

    const { activeQrCode, qrCodes } = useAppSelector(selectQrCode);

    const handleSetActiveQrCode = (qrCode: QrCode | null) => {
        dispatch(setActiveQrCode(qrCode));
    }

    const handleDeleteQrCode = () => {
        dispatch(startDeleteQrCodeWithDependencies(`${activeQrCode?.id}`));
        dispatch(setActiveQrCode(null));
        SnackbarUtilities.sucess(`QR Code ${activeQrCode?.name} deleted successfully`);
    }

    const handleUpdateQrCode = (qrCode: QrCode) => {
        dispatch(startUpdateQrCode(qrCode));
        SnackbarUtilities.sucess(`QR Code ${qrCode.name} updated successfully`);
    }

    const handleStartNewQrCode = (name: string, date: string, enabled: boolean) => {
        dispatch(startNewQrCode(name, date, enabled));
    }

    return {
        // properties
        activeQrCode,
        qrCodes,

        // methods
        handleSetActiveQrCode,
        handleDeleteQrCode,
        handleUpdateQrCode,
        handleStartNewQrCode
    }
}
