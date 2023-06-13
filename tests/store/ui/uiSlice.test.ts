import clearAllMocks = jest.clearAllMocks;
import {onHideQrCode, onShowQrCode, onToggleQrCodeModal, uiSlice} from "../../../src/store/ui/uiSlice";
import {qrCodeModalOpenedState} from "../../fixtures/uiStates";

describe('Tests for uiSlice', () => {
    beforeEach(() => clearAllMocks());

    const initialState = {
        isQrCodeModalOpen: false,
        isRegistryModalOpen: false,
        isShowingQrCode: false,
        isTitleModalOpen: false
    };

    test('should return the default values', () => {
        const state = uiSlice.getInitialState();
        expect(state).toEqual(initialState);
    });

    test('onShowQrCode should set the isShowingQrCode on true', () => {
        const state = uiSlice.reducer(initialState, onShowQrCode());
        expect(state.isShowingQrCode).toBeTruthy();
    });

    test('onHideQrCode should set the isShowingQrCode on false', () => {
        const state = uiSlice.reducer(initialState, onHideQrCode());
        expect(state.isShowingQrCode).toBeFalsy();
    });

    test('onToggleQrCodeModal should set the isQrCodeModalOpen on true', () => {
        const state = uiSlice.reducer(initialState, onToggleQrCodeModal());
        expect(state.isQrCodeModalOpen).toBeTruthy();
    });

    test('onToggleQrCodeModal should set the isQrCodeModalOpen on false', () => {
        const state = uiSlice.reducer(qrCodeModalOpenedState, onToggleQrCodeModal());
        expect(state.isQrCodeModalOpen).toBeFalsy();
    });
});
