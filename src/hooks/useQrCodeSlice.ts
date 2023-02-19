import {useAppDispatch, useAppSelector} from "../store";
import {selectQrCode, setActiveQrCode, startDeleteQrCodeWithDependencies} from "../store/qrAttendance";
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
        SnackbarUtilities.sucess(`QR Code ${activeQrCode?.name} deleted successfully`);
    }

    return {
        // properties
        activeQrCode,
        qrCodes,

        // methods
        handleSetActiveQrCode,
        handleDeleteQrCode
    }
}
