import {configureStore} from "@reduxjs/toolkit";
import {authSlice, AuthState} from "../../src/store/auth";
import {authenticatedState, initialState, notAuthenticatedState} from "../fixtures/authStates";
import {act, renderHook, waitFor} from "@testing-library/react";
import {useAuthStore} from "../../src/hooks/useAuthStore";
import {Provider} from "react-redux";
import {authStatusTypes} from "../../src/auth/types";
import {testUserCredentials} from "../fixtures/testUser";
import {qrAttendanceApi} from "../../src/api/qrAttendanceApi";
import {groupSlice, qrCodeSlice, registrySlice} from "../../src/store/qrAttendance";
import {withActiveGroupAndGroupsState, withQrCodesState, withActiveRegistryAndRegistriesState} from "../fixtures/qrAttendanceStates";

const getMockStore = (initialState: AuthState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
            group: groupSlice.reducer,
            qrCode: qrCodeSlice.reducer,
            registry: registrySlice.reducer,
        },
        preloadedState: {
            auth: {...initialState},
            group: {...withActiveGroupAndGroupsState},
            qrCode: {...withQrCodesState},
            registry: {...withActiveRegistryAndRegistriesState}
        }
    });
}

describe('Tests for useAuthStore', () => {

    test('should return the default values', () => {
        const mockStore = getMockStore({...initialState});

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        expect(result.current).toEqual({
            displayName: null,
            errorMessage: null,
            status: authStatusTypes.checking,
            startCreatingUser: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function)
        });
    });

    test('should login the user successfully', async () => {
        const mockStore = getMockStore({...notAuthenticatedState});

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const spy = jest.spyOn(qrAttendanceApi, 'post');
        spy.mockResolvedValue({
            data: {
                body: {...testUserCredentials}
            }
        });

        await act(async () => {
            await result.current.startLogin(testUserCredentials.email, testUserCredentials.password);
        });

        await waitFor(() => {
            expect(result.current).toEqual({
                displayName: testUserCredentials.name,
                errorMessage: null,
                status: authStatusTypes.authenticated,

                startCreatingUser: expect.any(Function),
                startLogin: expect.any(Function),
                startLogout: expect.any(Function)
            });
        });

        spy.mockRestore();
    });

    test('should fail the authentication', async () => {
        const mockStore = getMockStore({...notAuthenticatedState});

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const spy = jest.spyOn(qrAttendanceApi, 'post');
        spy.mockRejectedValue({})

        await act(async () => {
            await result.current.startLogin(testUserCredentials.email, testUserCredentials.password);
        });

        expect(result.current).toEqual({
            displayName: null,
            errorMessage: null,
            status: authStatusTypes.notAuthenticated,
            startCreatingUser: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function)
        });

        spy.mockRestore();
    });

    test('startLogout should logout the user successfully', async () => {

        const mockStore = getMockStore({...authenticatedState});

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const spy = jest.spyOn(qrAttendanceApi, 'post');
        spy.mockResolvedValue({})

        await act(async () => {
            await result.current.startLogout();
        });

        expect(result.current).toEqual({
            displayName: null,
            errorMessage: null,
            status: authStatusTypes.notAuthenticated,
            startCreatingUser: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function)
        });

        spy.mockRestore();
    });

    test('startLogout should clean the store', async () => {
        const mockStore = getMockStore({...authenticatedState});

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const spy = jest.spyOn(qrAttendanceApi, 'post');
        spy.mockResolvedValue({})

        await act(async () => {
            await result.current.startLogout();
        });

        const { auth, group, qrCode, registry} = mockStore.getState();

        expect(auth).toEqual({
            status: authStatusTypes.notAuthenticated,
            uid: null,
            email: null,
            displayName: null,
            errorMessage: null
        });

        expect(group.groups).toEqual([]);
        expect(qrCode.qrCodes).toEqual([]);
        expect(registry.registries).toEqual([]);
        
        spy.mockRestore();
    });

    test('startCreatingUser should create the user', async () => {

        const mockStore = getMockStore({...authenticatedState});

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const spy = jest.spyOn(qrAttendanceApi, 'post');
        spy.mockResolvedValue({
            data: {
                body: {...testUserCredentials}
            }
        });

        await act(async () => {
            await result.current.startCreatingUser(testUserCredentials);
        });

        expect(result.current).toEqual({
            displayName: 'Test User',
            errorMessage: null,
            status: authStatusTypes.authenticated,
            startCreatingUser: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function)
        });

        spy.mockRestore();
    });

    test('startCreatingUser should fail', async () => {

        const mockStore = getMockStore({...authenticatedState});

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const spy = jest.spyOn(qrAttendanceApi, 'post');
        spy.mockRejectedValue({});

        await act(async () => {
            await result.current.startCreatingUser(testUserCredentials);
        });

        expect(result.current).toEqual({
            displayName: null,
            errorMessage: null,
            status: authStatusTypes.notAuthenticated,
            startCreatingUser: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function)
        });

        spy.mockRestore();
    });
});
