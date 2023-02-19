import {useAppDispatch, useAppSelector} from "../store";
import {onCloseQrCodeModal, onHideQrCode, onOpenQrCodeModal, onShowQrCode, selectUi} from "../store/ui/uiSlice";

export const useUiSlice = () => {

    const dispatch = useAppDispatch();
    const { isShowingQrCode, isQrCodeModalOpen } = useAppSelector(selectUi);

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

    return {
        // properties
        isShowingQrCode,
        isQrCodeModalOpen,

        // methods
        openQrCodeModal,
        closeQrCodeModal,
        showQrCode,
        hideQrCode
    }
}
