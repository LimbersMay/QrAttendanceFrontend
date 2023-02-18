import {useAppDispatch, useAppSelector} from "../store";
import {onCloseQrCodeModal, onOpenQrCodeModal, selectUi} from "../store/ui/uiSlice";

export const useUiSlice = () => {

    const dispatch = useAppDispatch();
    const { isShowingQrCode, isQrCodeModalOpen } = useAppSelector(selectUi);

    const openQrCodeModal = () => {
        dispatch(onOpenQrCodeModal());
    }

    const closeQrCodeModal = () => {
        dispatch(onCloseQrCodeModal());
    }

    return {
        // properties
        isShowingQrCode,
        isQrCodeModalOpen,

        // methods
        openQrCodeModal,
        closeQrCodeModal
    }
}
