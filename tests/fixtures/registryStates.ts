import {Registry} from "../../src/qrAttendance/interfaces";
import {RegistryState} from "../../src/store/qrAttendance";

export const registries: Registry[] = [
    {
        id: '1',
        name: 'Limbers',
        career: 'System engineering',
        group: 'group 1',
        checkInTime: '22-02-2023',
        firstSurname: 'Limbert',
        secondSurname: 'May Ek',
        qrCodeId: '3941-122'
    },
    {
        id: '1-alastor',
        name: 'Albert',
        career: 'Civil engineering',
        group: 'group 2',
        checkInTime: '22-02-2023',
        firstSurname: 'Hernandez',
        secondSurname: 'Alcocer',
        qrCodeId: '3941-12ws'
    }
]

export const initialState: RegistryState = {
    registries: [],
    active: null
}

export const withRegistriesState: RegistryState = {
    active: null,
    registries: [...registries]
}
