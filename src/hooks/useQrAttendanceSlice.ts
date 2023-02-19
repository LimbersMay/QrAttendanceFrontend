import {useAppDispatch} from "../store";
import {QrCode} from "../qrAttendance/interfaces";
import {startDeleteGroupWithDependencies} from "../store/qrAttendance";

export const useQrAttendanceSlice = () => {

    const dispatch = useAppDispatch();

    const deleteGroupWithDependencies = (groupId: string, qrCodes: QrCode[]) => {
        dispatch(startDeleteGroupWithDependencies(groupId, qrCodes));
    }

    return {
        // properties

        // methods
        deleteGroupWithDependencies
    }

}
