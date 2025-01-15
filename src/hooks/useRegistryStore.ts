import {useAppDispatch, useAppSelector} from "../store";
import {
    selectRegistry,
    onSetActiveRegistry,
    updateRegistry, deleteRegistry, setRegistries
} from "../store/qrAttendance";
import {Registry} from "../qrAttendance/interfaces";
import {qrAttendanceApi} from "../api/qrAttendanceApi";

export const useRegistryStore = () => {

    const dispatch = useAppDispatch();
    const {registries, active} = useAppSelector(selectRegistry);

    const setActiveRegistry = (registry: Registry | null) => {
        dispatch(onSetActiveRegistry(registry));
    }

    const startUpdateRegistry = async (registry: Registry) => {

        await qrAttendanceApi.put(`/registry/${registry.id}`, {
                name: registry.name,
                group: registry.group,
                career: registry.career,
                firstSurname: registry.firstSurname,
                secondSurname: registry.secondSurname,
                checkinTime: registry.checkInTime
        });

        // sync code here
        dispatch(updateRegistry(registry));
    }

    const startDeleteRegistry = async () => {
        const activeRegistryId = `${active?.id}`;

        //  async code here
        await qrAttendanceApi.delete(`/registry/${activeRegistryId}`);

        // sync code here
        dispatch(deleteRegistry(activeRegistryId));
    }

    const startLoadingRegistries = async () => {

        // async code here
        const response = await qrAttendanceApi.get('/registry');
        const registries = response.data;

        const mappedRegistries: Registry[] = registries.map((registry: any) => {
            return {
                id: registry.id,
                qrCodeId: registry.qrCodeId,
                checkInTime: registry.checkinTime,
                name: registry.name,
                group: registry.group,
                career: registry.career,
                firstSurname: registry.firstSurname,
                secondSurname: registry.secondSurname
            }
        })

        // sync code here
        dispatch(setRegistries(mappedRegistries));
    }

    return {
        // properties
        registries,
        active,

        // methods
        startUpdateRegistry,
        setActiveRegistry,
        startDeleteRegistry,
        startLoadingRegistries
    }
}
