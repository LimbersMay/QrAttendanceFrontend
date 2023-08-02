import clearAllMocks = jest.clearAllMocks;
import {
    addEmptyQrCode,
    deleteQrCode,
    onSetActiveQrCode,
    qrCodeSlice,
    setQrCodes,
    updateQrCode
} from "../../../../src/store/qrAttendance";
import {initialState, qrCodes, withQrCodesState} from "../../../fixtures/qrCodeStates";
import {QrCode} from "../../../../src/qrAttendance/interfaces";

describe('Tests for qrCodeSlice', () => {

    beforeEach(() => clearAllMocks());

    test('should return the default values', () => {
        const state =  qrCodeSlice.getInitialState();
        expect(state).toEqual(initialState);
    });

    test('onSetActiveQrCode should set the active qrCode', () => {
        const newState = qrCodeSlice.reducer(initialState, onSetActiveQrCode(qrCodes[0]));
        expect(newState.activeQrCode).toEqual(qrCodes[0]);

    });

    test('setQrCodes should set the qrCodes', () => {
        const newState = qrCodeSlice.reducer(initialState, setQrCodes(qrCodes));
        expect(newState.qrCodes).toEqual([...qrCodes]);
    });

    test('updateQrCode should update the Qr Code', () => {

        const updatedQrCode: QrCode = {
            id: '1',
            name: 'Group C',
            date: 'Date 1',
            formId: 'form-id-third',
            enabled: false,
            groupId: '22',
            url: 'new url to the form'
        }

        const newState = qrCodeSlice.reducer(withQrCodesState, updateQrCode(updatedQrCode));
        expect(newState.qrCodes).toContain(updatedQrCode);
    });

    test('deleteQrCode should delete the active Qr code', () => {

        const idQrCodeToDelete = '1';

        const newState = qrCodeSlice.reducer(withQrCodesState, deleteQrCode(idQrCodeToDelete));
        expect(newState.qrCodes).not.toContainEqual(qrCodes[0]);
    });

    test('addEmptyQrCode should add a Qr Code', () => {

        const newQrCode: QrCode = {
            id: 'newQrId',
            name: 'New Qr Code',
            date: '22-05-2023',
            enabled: false,
            groupId: '3030-groupid',
            url: 'url-to-form',
            formId: 'mjioas-formid'
        }

        const newState = qrCodeSlice.reducer(withQrCodesState, addEmptyQrCode(newQrCode));
        expect(newState.qrCodes).toEqual([...qrCodes, newQrCode]);
    });
});
