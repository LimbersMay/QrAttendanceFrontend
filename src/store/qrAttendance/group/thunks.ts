import {AppThunk} from "../../store";
import {deleteGroup, updateGroup} from "./groupSlice";
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
