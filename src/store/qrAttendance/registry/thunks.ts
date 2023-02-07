import {AppThunk} from "../../store";
import {Registry} from "../../../qrAttendance/interfaces";
import {deleteRegistry, setRegistries, updateRegistry} from "./registrySlice";
import {qrAttendanceApi} from "../../../api/qrAttendanceApi";

export const startDeleteRegistry = (registryId: string): AppThunk => {
    return async(dispatch) => {

        //  async code here
        await qrAttendanceApi.delete(`/registry/delete/${registryId}`);

        // sync code here
        dispatch(deleteRegistry(registryId));
    }
}

export const startUpdateRegistry = (registry: Registry): AppThunk => {
    return async(dispatch) => {
        // async code here

        await qrAttendanceApi.put(`/registry/update`, {
            id: registry.id,
            updatedFields: {
                name: registry.name,
                group: registry.group,
                career: registry.career,
                firstSurname: registry.firstSurname,
                secondSurname: registry.secondSurname,
                checkinTime: registry.checkinTime
            }
        });

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
                checkinTime: registry.checkinTime,
                name: registry.name,
                group: registry.group,
                career: registry.career,
                firstSurname: registry.firstSurname,
                secondSurname: registry.secondSurname
            }
        })

        // sync code here
        dispatch(setRegistries(registriesMapped));
    }
}
