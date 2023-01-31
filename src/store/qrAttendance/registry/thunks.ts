import {AppThunk} from "../../store";
import {Registry} from "../../../qrAttendance/interfaces";
import {deleteRegistry, setRegistries, updateRegistry} from "./registrySlice";
import {qrAttendanceApi} from "../../../api/qrAttendanceApi";

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

export const startLoadingRegistries = (): AppThunk => {
    return async(dispatch) => {
        // async code here

        const response = await qrAttendanceApi.get('/registry/all');
        const { body: registries } = response.data;

        const registriesMapped: Registry[] = registries.map((registry: any) => {
            return {
                id: registry.id,
                qrCodeId: registry.qrCodeId,
                date: registry.date,
                name: registry.name,
                firstSurname: registry.firstSurname,
                secondSurname: registry.secondSurname
            }
        })

        // sync code here
        dispatch(setRegistries(registriesMapped));
    }
}
