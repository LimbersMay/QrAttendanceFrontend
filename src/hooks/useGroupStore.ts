import {useAppDispatch, useAppSelector} from "../store";
import {selectGroup, onSetActiveGroup, updateGroup, addEmptyGroup} from "../store/qrAttendance";
import {Group} from "../qrAttendance/interfaces";
import {qrAttendanceApi} from "../api/qrAttendanceApi";

export const useGroupStore = () => {

    const dispatch = useAppDispatch();
    const {groups, active} = useAppSelector(selectGroup);

    const startUpdateGroup = async (group: Group) => {
        // async code here
        const {id, name} = group;

        await qrAttendanceApi.put('/group/update', {
            id: id,
            updatedFields: {
                name
            }
        });

        // sync code here
        dispatch(updateGroup(group));
    }

    const startNewGroup = async () => {

        // async code here
        const response = await qrAttendanceApi.post('/group/create', {
            name: 'Default'
        });

        const {body: group} = response.data;

        const newGroup = {
            id: group.id,
            date: group.createdAt,
            name: group.name
        }

        // sync code here
        dispatch(addEmptyGroup(newGroup));
        dispatch(onSetActiveGroup(newGroup));
    }

    const setActiveGroup = (group: Group) => {
        dispatch(onSetActiveGroup(group));
    }

    return {
        // properties
        groups,
        active,

        // methods
        startUpdateGroup,
        setActiveGroup,
        startNewGroup
    }
}
