import {configureStore} from "@reduxjs/toolkit";
import {groupSlice, GroupState, qrCodeSlice, QrCodeState} from "../../src/store/qrAttendance";
import {act, renderHook, waitFor} from "@testing-library/react";
import {Provider} from "react-redux";
import {qrAttendanceApi} from "../../src/api/qrAttendanceApi";
import {initialState, qrCodes, withQrCodesState} from "../fixtures/qrCodeStates";
import {initialState as groupInitialState, withActiveGroupAndGroupsState} from "../fixtures/groupStates";
import {useQrCodeStore} from "../../src/hooks";

jest.mock('../../src/utilities/snackbar-manager.tsx', () => ({
    SnackbarUtilities: {
        toast: jest.fn(),
        success: jest.fn(),
        error: jest.fn(),
        warning: jest.fn(),
        info: jest.fn(),
    },
}));

const getMockStore = (initialState: QrCodeState, groupState: GroupState = groupInitialState) => {
    return configureStore({
        reducer: {
            qrCode: qrCodeSlice.reducer,
            group: groupSlice.reducer
        },
        preloadedState: {
            qrCode: {...initialState},
            group: {...groupState}
        }
    })
}

describe('Tests for useQrCode', () => {
    beforeEach(() => jest.clearAllMocks());

    test('should return the default values', () => {

        const mockStore = getMockStore({...initialState});

        const {result} = renderHook(() => useQrCodeStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        expect(result.current).toEqual({
            qrCodes: expect.any(Array),
            activeQrCode: null,
            startUpdateQrCode: expect.any(Function),
            setActiveQrCode: expect.any(Function),
            startNewQrCode: expect.any(Function),
            startLoadingQrCodes: expect.any(Function)
        });
    });

    test('startUpdateQrCode should update the qrCode', async () => {

        const updatedQrCode = {
            ...qrCodes[0],
            name: 'Updating the name of this group',
            enabled: true
        }

        const mockStore = getMockStore({...withQrCodesState});
        const {result} = renderHook(() => useQrCodeStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const spy = jest.spyOn(qrAttendanceApi, "put").mockResolvedValue({});

        await act(async () => {
            await result.current.startUpdateQrCode(updatedQrCode)
        });

        await waitFor(() => {
            expect(result.current.qrCodes).toContainEqual(updatedQrCode);
        });

        spy.mockRestore()
    });

    test('setActiveQrCode should set active qrCode', async () => {
        const mockStore = getMockStore({...withQrCodesState});

        const {result} = renderHook(() => useQrCodeStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async () => {
            result.current.setActiveQrCode(qrCodes[0]);
        });

        expect(result.current.activeQrCode).toEqual(qrCodes[0]);
    });

    test('startNewQrCode should add an empty qrCode', async () => {

        const newQrCode = {
            id: 'New QrCode',
            url: 'http://formid',
            formId: '234-formId223',
            manualRegistrationDate: '22-05-2023',
            name: 'Default qrCode',
            enabled: false
        }

        const mockStore = getMockStore({...withQrCodesState}, {...withActiveGroupAndGroupsState});
        const {result} = renderHook(() => useQrCodeStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const spy = jest.spyOn(qrAttendanceApi, 'post').mockResolvedValue({
            data: {
                ...newQrCode
            }
        });

        await act(async () => {
            await result.current.startNewQrCode(
                newQrCode.name,
                newQrCode.manualRegistrationDate,
                newQrCode.enabled
            );
        });

        await waitFor(() => {
            expect(result.current.qrCodes).toContainEqual({
                id: newQrCode.id,
                url: newQrCode.url,
                formId: newQrCode.formId,
                date: newQrCode.manualRegistrationDate,
                name: newQrCode.name,
                enabled: newQrCode.enabled,
                groupId: withActiveGroupAndGroupsState.active?.id
            });
        })

        spy.mockRestore();
    });

    test('startLoadingQrCodes should load the groups', async () => {
        const mockStore = getMockStore({...initialState});

        const {result} = renderHook(() => useQrCodeStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const qrCodesFromApi = qrCodes.map(qrCode => ({
            id: qrCode.id,
            url: qrCode.url,
            formId: qrCode.formId,
            groupId: qrCode.groupId,
            name: qrCode.name,
            manualRegistrationDate: qrCode.date,
            enabled: qrCode.enabled
        }));

        const spy = jest.spyOn(qrAttendanceApi, "get").mockResolvedValue({
            data: [
                ...qrCodesFromApi
            ]
        });

        await act(async () => {
            await result.current.startLoadingQrCodes();
        });

        await waitFor(() => {
            expect(result.current.qrCodes).toEqual(qrCodes);
        })

        spy.mockRestore();
    });
});