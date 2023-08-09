import {useAppDispatch, useAppSelector} from "../store";
import {
    selectGroup,
    onSetActiveGroup,
    updateGroup,
    addEmptyGroup,
    setGroups
} from "../store/qrAttendance";
import {Group} from "../qrAttendance/interfaces";
import {qrAttendanceApi} from "../api/qrAttendanceApi";

export const useGroupStore = () => {

    const dispatch = useAppDispatch();
    const {groups, active} = useAppSelector(selectGroup);

    const startUpdateGroup = async (group: Group) => {
        // async code here
        const {id, name} = group;

        await qrAttendanceApi.put(`/group/${id}`, {
            name
        });

        // sync code here
        dispatch(updateGroup(group));
    }

    const startNewGroup = async () => {

        // async code here
        const response = await qrAttendanceApi.post('/group', {
            name: 'Default'
        });

        const { id, cratedAt, name } = response.data;

        const newGroup = {
            id,
            name,
            date: cratedAt
        }

        // sync code here
        dispatch(addEmptyGroup(newGroup));
        dispatch(onSetActiveGroup(newGroup));
    }

    const startLoadingGroups = async () => {
        // async code here
        const response = await qrAttendanceApi.get(`/group`);
        const groups = response.data;

        // sync code here
        const mappedGroups: Group[] = groups.map((group: any) => ({
            id: group.id,
            name: group.name,
            date: group.createdAt
        }));

        dispatch(setGroups(mappedGroups));
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
        startNewGroup,
        startLoadingGroups
    }
}
