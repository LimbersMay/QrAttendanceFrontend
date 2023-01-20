import {AppThunk} from "../../store";
import {Registry} from "../../../qrAttendance/interfaces";
import {deleteRegistry, updateRegistry} from "./registrySlice";

export const startAddNewRegistry = (): AppThunk => {
    return async(dispatch) => {

    }
}

export const startDeleteRegistry = (registryId: string): AppThunk => {
    return async(dispatch) => {

        //  async code here

        // sync code here
        dispatch(deleteRegistry(registryId));
    }
}

export const startUpdateRegistry = (registry: Registry): AppThunk => {
    return async(dispatch) => {
        // async code here

        // sync code here
        dispatch(updateRegistry(registry));
    }
}
