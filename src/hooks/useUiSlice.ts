import {useAppDispatch, useAppSelector} from "../store";
import {
    onHideQrCode,
    onShowQrCode, onToggleQrCodeModal, onToggleRegistryModal, onToggleTitleModal,
    selectUi
} from "../store/ui/uiSlice";

export const useUiSlice = () => {

    const dispatch = useAppDispatch();
    const { isShowingQrCode, isQrCodeModalOpen, isRegistryModalOpen, isTitleModalOpen } = useAppSelector(selectUi);

    const showQrCode = () => {
        dispatch((onShowQrCode()));
    }

    const hideQrCode = () => {
        dispatch(onHideQrCode());
    }

    const toggleQrCodeModal = () => {
        dispatch(onToggleQrCodeModal());
    }

    const toggleRegistryModal = () => {
        dispatch(onToggleRegistryModal());
    }

    const toggleTitleModal = () => {
        dispatch(onToggleTitleModal());
    }

    return {
        // properties
        isShowingQrCode,
        isQrCodeModalOpen,
        isRegistryModalOpen,
        isTitleModalOpen,

        // methods
        showQrCode,
        hideQrCode,
        toggleTitleModal,
        toggleQrCodeModal,
        toggleRegistryModal
    }
}
