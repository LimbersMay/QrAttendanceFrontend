import clearAllMocks = jest.clearAllMocks;
import {onHideQrCode, onShowQrCode, uiSlice} from "../../../src/store/ui/uiSlice";

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
        const newState = uiSlice.reducer(initialState, onShowQrCode());
        expect(newState.isShowingQrCode).toBeTruthy();
    });

    test('onHideQrCode should set the isShowingQrCode on false', () => {
        const newState = uiSlice.reducer(initialState, onHideQrCode());
        expect(newState.isShowingQrCode).toBeFalsy();
    });
});
