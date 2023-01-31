import {AppThunk} from "../../store";
import {addEmptyGroup, deleteGroup, setActiveGroup, setGroups, updateGroup} from "./groupSlice";
import {Group} from "../../../qrAttendance/interfaces";
import {qrAttendanceApi} from "../../../api/qrAttendanceApi";

export const startUpdateGroup = (group: Group): AppThunk => {
    return async (dispatch) => {

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
}

export const startDeleteGroup = (groupId: string): AppThunk => {
    return async (dispatch) => {

        // async code here

        // sync code here
        dispatch(deleteGroup(groupId));
    }
}

export const startNewGroup = (): AppThunk => {
    return async (dispatch) => {

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
        dispatch(setActiveGroup(newGroup));
    }
}

export const startLoadingGroups = (): AppThunk => {
    return async (dispatch) => {

        // async code here
        const response = await qrAttendanceApi.get(`/group/all`);
        const {body: groups} = response.data;

        // sync code here
        const mappedGroups: Group[] = groups.map((group: any) => ({
            id: group.id,
            name: group.name,
            date: group.createdAt
        }));

        dispatch(setGroups(mappedGroups));
    }
}
