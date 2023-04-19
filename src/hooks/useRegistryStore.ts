import {useAppDispatch, useAppSelector} from "../store";
import {
    selectRegistry,
    onSetActiveRegistry,
    updateRegistry, deleteRegistry
} from "../store/qrAttendance";
import {Registry} from "../qrAttendance/interfaces";
import {qrAttendanceApi} from "../api/qrAttendanceApi";

export const useRegistryStore = () => {

    const dispatch = useAppDispatch();
    const {registries, active} = useAppSelector(selectRegistry);

    const startUpdateRegistry = async (registry: Registry) => {
        await qrAttendanceApi.put(`/registry/update`, {
            id: registry.id,
            updatedFields: {
                name: registry.name,
                group: registry.group,
                career: registry.career,
                firstSurname: registry.firstSurname,
                secondSurname: registry.secondSurname,
                checkinTime: registry.checkInTime
            }
        });

        // sync code here
        dispatch(updateRegistry(registry));
    }

    const setActiveRegistry = (registry: Registry | null) => {
        dispatch(onSetActiveRegistry(registry));
    }

    const startDeleteRegistry = async () => {
        const activeRegistryId = `${active?.id}`;

        //  async code here
        await qrAttendanceApi.delete(`/registry/delete/${activeRegistryId}`);

        // sync code here
        dispatch(deleteRegistry(activeRegistryId));
    }

    return {
        // properties
        registries,
        active,

        // methods
        startUpdateRegistry,
        setActiveRegistry,
        startDeleteRegistry
    }
}
