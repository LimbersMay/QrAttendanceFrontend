import {AppThunk} from "../../store";
import {addEmptyGroup, deleteGroup, setActiveGroup, setGroups, updateGroup} from "./groupSlice";
import {Group} from "../../../qrAttendance/interfaces";
import {qrAttendanceApi} from "../../../api/qrAttendanceApi";
import {logout} from "../../auth";

export const startUpdateGroup = (group: Group): AppThunk => {
    return async(dispatch) => {

        // async code here

        // sync code here
        dispatch(updateGroup(group));
    }
}

export const startDeleteGroup = (groupId: string): AppThunk => {
    return async(dispatch) => {

        // async code here

        // sync code here
        dispatch(deleteGroup(groupId));
    }
}

export const startNewGroup = (): AppThunk => {
    return async(dispatch, getState) => {

        const userId = getState().auth.uid;

        // async code here
        try {
            const response = await qrAttendanceApi.post('/group/create', {
                name: 'Default',
                userId: userId
            });

            const { group } = response.data;

            const newGroup = {
                id: group.id,
                date: group.createdAt,
                name: group.name
            }

            // sync code here
            dispatch(addEmptyGroup(newGroup));
            dispatch(setActiveGroup(newGroup));

        } catch (error: any) {
            console.log('Message error: ', error.data.msg)
        }
    }
}

export const startLoadingGroups = (userId: string): AppThunk => {
    return async(dispatch) => {

        // async code here
        try {
            const response = await qrAttendanceApi.get(`/group/all/${userId}`);

            const { groups } = response.data;

            const mappedGroups: Group[] = groups.map((group: any) => ({
                id: group.id,
                name: group.name,
                date: group.createdAt
            }));

            dispatch(setGroups(mappedGroups));

        } catch (error: any) {
            dispatch(logout(error.response.data.msg));
        }
    }
}
