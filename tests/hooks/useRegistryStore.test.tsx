import clearAllMocks = jest.clearAllMocks;
import {registrySlice, RegistryState} from "../../src/store/qrAttendance";
import {configureStore} from "@reduxjs/toolkit";
import {initialState, registries, withActiveRegistryState, withRegistriesState} from "../fixtures/registryStates";
import {act, renderHook, waitFor} from "@testing-library/react";
import {useRegistryStore} from "../../src/hooks/useRegistryStore";
import {Provider} from "react-redux";
import {qrAttendanceApi} from "../../src/api/qrAttendanceApi";

const getMockStore = (initialState: RegistryState) => {
    return configureStore({
        reducer: {
            registry: registrySlice.reducer
        },
        preloadedState: {
            registry: {...initialState}
        }
    });
}

describe('Tests for useRegistryStore', () => {
    beforeEach(() => clearAllMocks());

    test('should return the default values', () => {

        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useRegistryStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        })

        expect(result.current).toEqual({
            registries: [],
            active: null,
            startUpdateRegistry: expect.any(Function),
            setActiveRegistry: expect.any(Function),
            startDeleteRegistry: expect.any(Function),
            startLoadingRegistries: expect.any(Function)
        })
    });

    test('startUpdateRegistry should update the registry', async () => {
        const updatedRegistry = {
            ...registries[0],
            name: 'Fixed name',
            secondSurname: 'Fixed secondSurname'
        }

        const mockStore = getMockStore({...withRegistriesState});
        const { result } = renderHook(() => useRegistryStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const spy = jest.spyOn(qrAttendanceApi, 'put').mockResolvedValue({});

        await act( async () => {
            await result.current.startUpdateRegistry(updatedRegistry);
        });

        await waitFor(() => {
            expect(result.current.registries).toContainEqual(updatedRegistry);
        })

        spy.mockRestore();
    });

    test('setActiveRegistry should set the active registry', async () => {
        const mockStore = getMockStore({...withRegistriesState});
        const { result } = renderHook(() => useRegistryStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async () => {
            await result.current.setActiveRegistry(registries[0]);
        });

        expect(result.current.active).toEqual(registries[0]);
    });

    test('startLoadingRegistries should load the registries', async () => {
        const mockStore = getMockStore({...withRegistriesState});
        const { result } = renderHook(() => useRegistryStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const registriesFromApi = registries.map(registry => ({
            id: registry.id,
            qrCodeId: registry.qrCodeId,
            checkinTime: registry.checkInTime,
            name: registry.name,
            group: registry.group,
            career: registry.career,
            firstSurname: registry.firstSurname,
            secondSurname: registry.secondSurname
        }))

        const spy = jest.spyOn(qrAttendanceApi, 'get').mockResolvedValue({
            data: {
                body: registriesFromApi
            }
        });

        await act(async () => {
            await result.current.startLoadingRegistries();
        });

        expect(result.current.registries).toEqual(registries);
        spy.mockRestore();
    });

    test('startDeleteRegistry', async () => {
        const mockStore = getMockStore({...withActiveRegistryState});
        const {result} = renderHook(() => useRegistryStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const spy = jest.spyOn(qrAttendanceApi, 'delete').mockResolvedValue({});

        await act(async () => {
            await result.current.startDeleteRegistry();
        });

        expect(result.current.registries).not.toContainEqual(withActiveRegistryState.active);
        spy.mockRestore();
    });

});
