import {AppThunk} from "../../store";
import {updateGroup} from "./groupSlice";
import {Group} from "../../../qrAttendance/interfaces";

export const startUpdateGroup = (group: Group): AppThunk => {
    return async(dispatch) => {

        // async code here

        // sync code here
        dispatch(updateGroup(group));
    }
}
