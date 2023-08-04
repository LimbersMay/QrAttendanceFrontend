import {QrCode} from "../../src/qrAttendance/interfaces";
import {QrCodeState} from "../../src/store/qrAttendance";

export const qrCodes: QrCode[] = [
    {
        id: '1',
        name: 'Group A',
        date: 'Date 1',
        formId: 'form-id-one',
        enabled: false,
        groupId: '22',
        url: 'name'
    },
    {
        id: '2',
        name: 'Group B',
        date: 'Date 2',
        formId: 'form-two-one',
        enabled: false,
        groupId: '22',
        url: 'name'
    }
]

export const initialState: QrCodeState = {
    qrCodes: [],
    activeQrCode: null
}

export const withQrCodesState: QrCodeState = {
    activeQrCode: null,
    qrCodes: [...qrCodes]
}
