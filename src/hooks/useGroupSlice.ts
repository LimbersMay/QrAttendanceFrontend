import {useAppDispatch, useAppSelector} from "../store";
import {selectGroup, setActiveGroup, startUpdateGroup} from "../store/qrAttendance";
import {Group} from "../qrAttendance/interfaces";

export const useGroupSlice = () => {

    const dispatch = useAppDispatch();
    const { groups, active } = useAppSelector(selectGroup);

    const updateGroup = (group: Group) => {
        dispatch(startUpdateGroup(group));
    }

    const handleSetActiveGroup = (group: Group) => {
        dispatch(setActiveGroup(group));
    }

    return {
        // properties
        groups,
        active,

        // methods
        updateGroup,
        handleSetActiveGroup
    }
}
