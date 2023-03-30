import {useAppDispatch, useAppSelector} from "../store";
import {selectRegistry, setActiveRegistry, startDeleteRegistry, startUpdateRegistry} from "../store/qrAttendance";
import {Registry} from "../qrAttendance/interfaces";

export const useRegistrySlice = () => {

    const dispatch = useAppDispatch();
    const {registries, active} = useAppSelector(selectRegistry);

    const updateRegistry = (registry: Registry) => {
        dispatch(startUpdateRegistry(registry));
    }

    const handleSetActiveRegistry = (registry: Registry | null) => {
        dispatch(setActiveRegistry(registry));
    }

    const handleDeleteRegistry = () => {
        dispatch(startDeleteRegistry(`${active?.id}`));
    }

    return {
        // properties
        registries,
        active,

        // methods
        updateRegistry,
        handleSetActiveRegistry,
        handleDeleteRegistry
    }
}
