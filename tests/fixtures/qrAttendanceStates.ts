import {Group, QrCode, Registry} from "../../src/qrAttendance/interfaces";
import {GroupState, QrCodeState, RegistryState} from "../../src/store/qrAttendance";

export const groups: Group[] = [
    {
        id: 'Group-1',
        name: 'System engineering',
        date: '21-02-23'
    },
    {
        id: 'Group-3',
        name: "English A group",
        date: '22-01-23'
    }
]

export const qrCodes: QrCode[] = [
    {
        id: '1',
        name: 'Group A',
        date: 'Date 1',
        formId: 'form-id-one',
        enabled: false,
        groupId: 'Group-1',
        url: 'name'
    },
    {
        id: '2',
        name: 'Group B',
        date: 'Date 2',
        formId: 'form-two-one',
        enabled: false,
        groupId: 'Group-1',
        url: 'name'
    }
]

const registries: Registry[] = [
    {
        id: '1',
        name: 'Limbers',
        career: 'System engineering',
        group: 'group 1',
        checkInTime: '22-02-2023',
        firstSurname: 'Limbert',
        secondSurname: 'May Ek',
        qrCodeId: '1'
    },
    {
        id: '1-alastor',
        name: 'Albert',
        career: 'Civil engineering',
        group: 'group 2',
        checkInTime: '22-02-2023',
        firstSurname: 'Hernandez',
        secondSurname: 'Alcocer',
        qrCodeId: '2'
    }
]

export const withActiveGroupAndGroupsState: GroupState = {
    active: groups[0],
    groups: [...groups]
}

export const withActiveRegistryAndRegistriesState: RegistryState = {
    active: registries[0],
    registries: [...registries]
}

export const withQrCodesState: QrCodeState = {
    activeQrCode: qrCodes[0],
    qrCodes: [...qrCodes]
}
