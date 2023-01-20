import {AppThunk} from "../../store";
import {addEmptyGroup, deleteGroup, setActiveGroup, updateGroup} from "./groupSlice";
import {Group} from "../../../qrAttendance/interfaces";

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
    return async(dispatch) => {

        // async code here
        const newGroup: Group = {
            name: 'Default',
            date: new Date().toUTCString(),
            id: new Date().toISOString() // get the if from the backend
        }

        // sync code here
        dispatch(addEmptyGroup(newGroup));
        dispatch(setActiveGroup(newGroup));
    }
}
