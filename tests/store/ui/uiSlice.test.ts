import clearAllMocks = jest.clearAllMocks;
import {
    onHideQrCode,
    onShowQrCode,
    onToggleQrCodeModal,
    onToggleRegistryModal, onToggleTitleModal,
    uiSlice
} from "../../../src/store/ui/uiSlice";

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

    test('onToggleQrCodeModal should toggle the isQrCodeModalOpen', () => {
        const openedQrCodeModal = uiSlice.reducer(initialState, onToggleQrCodeModal());
        const closedQrCodeModal = uiSlice.reducer(openedQrCodeModal, onToggleQrCodeModal());

        expect(openedQrCodeModal.isQrCodeModalOpen).toBeTruthy();
        expect(closedQrCodeModal.isQrCodeModalOpen).toBeFalsy();
    });

    test('onToggleRegistryModal should toggle the isRegistryModalOpen', () => {
        const openedRegistryModal = uiSlice.reducer(initialState, onToggleRegistryModal());
        const closedRegistryModal = uiSlice.reducer(openedRegistryModal, onToggleRegistryModal());

        expect(openedRegistryModal.isRegistryModalOpen).toBeTruthy();
        expect(closedRegistryModal.isRegistryModalOpen).toBeFalsy();
    });

    test('onToggleTitleModal should toggle the isTitleModalOpen', () => {
        const openedTitleModal = uiSlice.reducer(initialState, onToggleTitleModal());
        const closedTitleModal = uiSlice.reducer(openedTitleModal, onToggleTitleModal());

        expect(openedTitleModal.isTitleModalOpen).toBeTruthy();
        expect(closedTitleModal.isTitleModalOpen).toBeFalsy();
    });
});
