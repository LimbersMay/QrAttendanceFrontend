import {Group} from "../../src/qrAttendance/interfaces";
import {GroupState} from "../../src/store/qrAttendance";

export const groups: Group[] = [
    {
        id: '1',
        date: '2021-01-01',
        name: 'Soft 1'
    },
    {
        id: '2',
        date: '2021-01-02',
        name: 'Admin 1'
    },
    {
        id: '3',
        date: '2021-01-03',
        name: 'Cont 2'
    }
]

export const initialState: GroupState = {
    active: null,
    groups: []
}

export const withGroupsState = {
    active: null,
    groups: [...groups]
}
