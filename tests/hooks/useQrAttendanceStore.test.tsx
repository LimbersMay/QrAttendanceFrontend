import {
    groupSlice,
    GroupState,
    qrCodeSlice,
    QrCodeState,
    registrySlice,
    RegistryState
} from "../../src/store/qrAttendance";
import {configureStore} from "@reduxjs/toolkit";
import clearAllMocks = jest.clearAllMocks;
import {initialState} from "../fixtures/qrCodeStates";
import {initialState as registryInitialState} from "../fixtures/registryStates";
import {initialState as groupInitialState, withGroupActiveState} from "../fixtures/groupStates";
import {act, renderHook, waitFor} from "@testing-library/react";
import {Provider} from "react-redux";
import {useQrAttendanceStore} from "../../src/hooks/useQrAttendanceStore";
import {withActiveGroupState, withQrCodesState, withActiveRegistryAndRegistriesState} from "../fixtures/qrAttendanceStates";
import {Registry} from "../../src/qrAttendance/interfaces";
import {qrAttendanceApi} from "../../src/api/qrAttendanceApi";

jest.mock('../../src/utilities/snackbar-manager.tsx', () => ({
    SnackbarUtilities: {
        toast: jest.fn(),
        success: jest.fn(),
        error: jest.fn(),
        warning: jest.fn(),
        info: jest.fn(),
    },
}));

const getMockStore = (groupState: GroupState, qrCodeState: QrCodeState, registryState: RegistryState) => {
    return configureStore({
        reducer: {
            group: groupSlice.reducer,
            qrCode: qrCodeSlice.reducer,
            registry: registrySlice.reducer
        },
        preloadedState: {
            group: {...groupState},
            qrCode: {...qrCodeState},
            registry: {...registryState}
        }
    });
}

describe('Tests for useQrAttendanceStore', () => {
    beforeEach(() => clearAllMocks());

    test('should return the default values', () => {
        const mockStore = getMockStore({...groupInitialState},{...initialState}, {...registryInitialState});

        const {result} = renderHook(() => useQrAttendanceStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        expect(result.current).toEqual({
            startDeleteGroupWithDependencies: expect.any(Function),
            startDeleteQrCodeWithDependencies: expect.any(Function)
        });
    });

    test('startDeleteGroupWithDependencies should delete a group with his associated qrCodes and registries', async () => {
        const mockStore = getMockStore({...withActiveGroupState},{...withQrCodesState}, {...withActiveRegistryAndRegistriesState});

        const {result} = renderHook(() => useQrAttendanceStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const spy = jest.spyOn(qrAttendanceApi, 'delete').mockResolvedValue({});

        let registries: Registry[] = []

        const groupId = `${withActiveGroupState.active?.id}`;
        const qrCodesToDelete = withQrCodesState.qrCodes.filter(qrCode => {

            if (qrCode.groupId === groupId) {

                const qrCodeRegistries = withActiveRegistryAndRegistriesState.registries.filter(registry => registry.qrCodeId === qrCode.id);
                registries.push(...qrCodeRegistries);

                return qrCode;
            }
        });

        await act(async () => {
            await result.current.startDeleteGroupWithDependencies(groupId, qrCodesToDelete);
        });

        const { group, qrCode, registry} = mockStore.getState();

        await waitFor(() => {
            expect(group.groups).not.toContainEqual(withGroupActiveState.active);
            expect(qrCode.qrCodes).not.toContainEqual(qrCodesToDelete);
            expect(registry.registries).not.toContainEqual(registries);
        });

        spy.mockRestore();
    });

    test('startDeleteQrCodeWithDependencies should delete que qrCode with his dependencies', async () => {
        const mockStore = getMockStore({...withActiveGroupState},{...withQrCodesState}, {...withActiveRegistryAndRegistriesState});

        const {result} = renderHook(() => useQrAttendanceStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const spy = jest.spyOn(qrAttendanceApi, 'delete').mockResolvedValue({});

        const qrCodeToDelete = withQrCodesState.activeQrCode;
        const registriesToDelete = withActiveRegistryAndRegistriesState.registries.filter(registry => registry.qrCodeId === qrCodeToDelete?.id)

        await act(async () => {
            await result.current.startDeleteQrCodeWithDependencies();
        });

        const { registry, qrCode } = mockStore.getState();

        await waitFor(() => {
            expect(qrCode.qrCodes).not.toContainEqual(qrCodeToDelete)
            expect(registry.registries).not.toContainEqual(registriesToDelete);
        });

        spy.mockRestore();
    });
});
