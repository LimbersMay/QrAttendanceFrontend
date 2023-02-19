import {useAppDispatch, useAppSelector} from "../store";
import {
    onCloseQrCodeModal, onCloseRegistryModal,
    onHideQrCode,
    onOpenQrCodeModal,
    onOpenRegistryModal,
    onShowQrCode,
    selectUi
} from "../store/ui/uiSlice";

export const useUiSlice = () => {

    const dispatch = useAppDispatch();
    const { isShowingQrCode, isQrCodeModalOpen, isRegistryModalOpen } = useAppSelector(selectUi);

    const openQrCodeModal = () => {
        dispatch(onOpenQrCodeModal());
    }

    const closeQrCodeModal = () => {
        dispatch(onCloseQrCodeModal());
    }

    const showQrCode = () => {
        dispatch((onShowQrCode()));
    }

    const hideQrCode = () => {
        dispatch(onHideQrCode());
    }

    const openRegistryModal = () => {
        dispatch(onOpenRegistryModal());
    }

    const closeRegistryModal = () => {
        dispatch(onCloseRegistryModal());
    }

    return {
        // properties
        isShowingQrCode,
        isQrCodeModalOpen,
        isRegistryModalOpen,

        // methods
        openQrCodeModal,
        closeQrCodeModal,
        showQrCode,
        hideQrCode,
        openRegistryModal,
        closeRegistryModal
    }
}
