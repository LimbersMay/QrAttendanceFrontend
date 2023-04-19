import {Group} from "../../src/qrAttendance/interfaces";
import {GroupState} from "../../src/store/qrAttendance";

const groups: Group[] = []

export const initialState: GroupState = {
    active: null,
    groups: []
}