import {
    initialState,
    withQrCodeModalOpenTrue,
    withRegistryModalOpenTrue,
    withShowingQrCodeTrue, withTitleModalOpenTrue
} from "../fixtures/uiStates";
import {uiSlice, uiState} from "../../src/store/ui/uiSlice";
import {configureStore} from "@reduxjs/toolkit";
import {act, renderHook} from "@testing-library/react";
import {Provider} from "react-redux";
import {useUiStore} from "../../src/hooks/useUiStore";
import clearAllMocks = jest.clearAllMocks;

const getMockStore = (preloadedState: uiState = initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: {...preloadedState}
        }
    })
}

describe('Tests for useUiStore', () => {

    beforeEach(() => clearAllMocks());

    test('should return the default values', () => {
        const mockStore = getMockStore();

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        expect(result.current).toEqual({
            isShowingQrCode: false,
            isQrCodeModalOpen: false,
            isRegistryModalOpen: false,
            isTitleModalOpen: false,
            showQrCode: expect.any(Function),
            hideQrCode: expect.any(Function),
            toggleTitleModal: expect.any(Function),
            toggleQrCodeModal: expect.any(Function),
            toggleRegistryModal: expect.any(Function)
        });
    });

    test('showQrCode should set the isShowingQrCode to true', () => {
        const mockStore = getMockStore();

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        act(() => {
            result.current.showQrCode();
        });

        expect(result.current.isShowingQrCode).toBeTruthy();
    });

    test('hideQrCode should set the isShowingQrCode to false', () => {
        const mockStore = getMockStore({...withShowingQrCodeTrue});

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        act(() => {
            result.current.hideQrCode();
        });

        expect(result.current.isShowingQrCode).toBeFalsy();
    });

    test('toggleQrCodeModal should set the isQrCodeModalOpen to true from false', () => {
        const mockStore = getMockStore({...initialState});

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        act(() => {
            result.current.toggleQrCodeModal();
        });

        expect(result.current.isQrCodeModalOpen).toBeTruthy();
    });

    test('toggleQrCodeModal should set the isQrCodeModalOpen to false from true', () => {
        const mockStore = getMockStore({...withQrCodeModalOpenTrue});

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        act(() => {
            result.current.toggleQrCodeModal();
        });

        expect(result.current.isQrCodeModalOpen).toBeFalsy();
    });

    test('toggleRegistryModal should set the isRegistryModalOpen to true from false', () => {
        const mockStore = getMockStore({...initialState});

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        act(() => {
            result.current.toggleRegistryModal();
        });

        expect(result.current.isRegistryModalOpen).toBeTruthy();
    });

    test('toggleRegistryModal should set the isRegistryModalOpen to false from true', () => {
        const mockStore = getMockStore({...withRegistryModalOpenTrue});

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        act(() => {
            result.current.toggleRegistryModal();
        });

        expect(result.current.isRegistryModalOpen).toBeFalsy();
    });

    test('toggleTitleModal should set the isRegistryModalOpen to true from false', () => {
        const mockStore = getMockStore({...initialState});

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        act(() => {
            result.current.toggleTitleModal();
        });

        expect(result.current.isTitleModalOpen).toBeTruthy();
    });

    test('toggleTitleModal should set the isRegistryModalOpen to false from true', () => {
        const mockStore = getMockStore({...withTitleModalOpenTrue});

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        act(() => {
            result.current.toggleTitleModal();
        });

        expect(result.current.isTitleModalOpen).toBeFalsy();
    });
});
