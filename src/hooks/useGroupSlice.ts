import {useAppDispatch, useAppSelector} from "../store";
import {selectGroup, startUpdateGroup} from "../store/qrAttendance";
import {Group} from "../qrAttendance/interfaces";

export const useGroupSlice = () => {

    const dispatch = useAppDispatch();
    const { groups, active } = useAppSelector(selectGroup);

    const updateGroup = (group: Group) => {
        dispatch(startUpdateGroup(group));
    }

    return {
        // properties
        groups,
        active,

        // methods
        updateGroup
    }
}
