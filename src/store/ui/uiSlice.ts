import {createSlice} from '@reduxjs/toolkit';
import {RootState} from "../store";

interface uiInitialState {
    isQrCodeModalOpen: boolean;
    isShowingQrCode: boolean;
}

const initialState: uiInitialState = {
    isQrCodeModalOpen: false,
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
        }
    }
});


// Action creators are generated for each case reducer function
export const { onOpenQrCodeModal, onCloseQrCodeModal } = uiSlice.actions;
export const selectUi = (state: RootState) => state.ui;