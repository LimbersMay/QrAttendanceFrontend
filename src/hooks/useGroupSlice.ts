import {useAppDispatch, useAppSelector} from "../store";
import {selectGroup} from "../store/qrAttendance";

export const useGroupSlice = () => {

    const dispatch = useAppDispatch();
    const { groups, active } = useAppSelector(selectGroup);

    return {
        groups,
        active,
    }
}
