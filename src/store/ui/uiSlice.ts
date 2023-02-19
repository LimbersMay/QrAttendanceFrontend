import {createSlice} from '@reduxjs/toolkit';
import {RootState} from "../store";

interface uiInitialState {
    isQrCodeModalOpen: boolean;
    isRegistryModalOpen: boolean;
    isShowingQrCode: boolean;
}

const initialState: uiInitialState = {
    isQrCodeModalOpen: false,
    isRegistryModalOpen: false,
    isShowingQrCode: false
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        onOpenQrCodeModal: (state) => {
            state.isQrCodeModalOpen = true;
        },
        onCloseQrCodeModal: (state) => {
            state.isQrCodeModalOpen = false;
        },
        onShowQrCode: (state) => {
            state.isShowingQrCode = true;
        },
        onHideQrCode: (state) => {
            state.isShowingQrCode = false;
        },
        onOpenRegistryModal: (state) => {
            state.isRegistryModalOpen = true;
        },
        onCloseRegistryModal: (state) => {
            state.isRegistryModalOpen = false;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onOpenQrCodeModal, onCloseQrCodeModal, onShowQrCode, onHideQrCode, onOpenRegistryModal, onCloseRegistryModal } = uiSlice.actions;
export const selectUi = (state: RootState) => state.ui;