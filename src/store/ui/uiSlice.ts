import {createSlice} from '@reduxjs/toolkit';
import {RootState} from "../store";

interface uiInitialState {
    isQrCodeModalOpen: boolean;
    isRegistryModalOpen: boolean;
    isShowingQrCode: boolean;
    isTitleModalOpen: boolean;
}

const initialState: uiInitialState = {
    isQrCodeModalOpen: false,
    isRegistryModalOpen: false,
    isShowingQrCode: false,
    isTitleModalOpen: false
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        onShowQrCode: (state) => {
            state.isShowingQrCode = true;
        },
        onHideQrCode: (state) => {
            state.isShowingQrCode = false;
        },
        onToggleQrCodeModal: (state) => {
            state.isQrCodeModalOpen = !state.isQrCodeModalOpen;
        },
        onToggleRegistryModal: (state) => {
            state.isRegistryModalOpen = !state.isRegistryModalOpen;
        },
        onToggleTitleModal: (state) => {
            state.isTitleModalOpen = !state.isTitleModalOpen;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onToggleQrCodeModal, onShowQrCode, onHideQrCode, onToggleRegistryModal, onToggleTitleModal } = uiSlice.actions;
export const selectUi = (state: RootState) => state.ui;