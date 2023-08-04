import {uiState} from "../../src/store/ui/uiSlice";

export const initialState: uiState = {
    isQrCodeModalOpen: false,
    isRegistryModalOpen: false,
    isShowingQrCode: false,
    isTitleModalOpen: false
}

export const withQrCodeModalOpenTrue = {
    ...initialState,
    isQrCodeModalOpen: true
}

export const withRegistryModalOpenTrue = {
    ...initialState,
    isRegistryModalOpen: true
}

export const withShowingQrCodeTrue = {
    ...initialState,
    isShowingQrCode: true
}

export const withTitleModalOpenTrue = {
    ...initialState,
    isTitleModalOpen: true
}
