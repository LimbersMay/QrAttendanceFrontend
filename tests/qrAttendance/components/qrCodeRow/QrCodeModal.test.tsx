import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {QrCodeModal} from "../../../../src/qrAttendance/components/qrCodeRow/QrCodeModal";
import {uiSlice} from "../../../../src/store/ui/uiSlice";
import {groupSlice, qrCodeSlice} from "../../../../src/store/qrAttendance";
import {withQrCodeModalOpenTrue} from "../../../fixtures/uiStates";
import {withActiveGroupAndGroupsState, withQrCodesState} from "../../../fixtures/qrAttendanceStates";
import * as useQrCodeStore from "../../../../src/hooks/useQrCodeStore";
import * as useUiStore from "../../../../src/hooks/useUiStore";
import * as useGroupStore from "../../../../src/hooks/useGroupStore";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        qrCode: qrCodeSlice.reducer,
        group: groupSlice.reducer

    },
    preloadedState: {
        ui: {...withQrCodeModalOpenTrue},
        qrCode: {...withQrCodesState},
        group: {...withActiveGroupAndGroupsState}
    }
});

describe('tests for <QrCodeModal />', () => {

    const mockStartUpdateQrCode = jest.fn();
    const mockToggleQrCodeModal = jest.fn();
    const mockStartNewQrCode = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('should match snapshot', () => {

        const {container} = render(
            <Provider store={store}>
                <QrCodeModal/>
            </Provider>
        );

        expect(container).toMatchSnapshot();
    });

    test('should show the qr code name in the modal', () => {

        render(
            <Provider store={store}>
                <QrCodeModal/>
            </Provider>
        );

        const qrCodeName = screen.getByTestId('qrCode-title');

        expect(qrCodeName.textContent).toContain(`${withQrCodesState.activeQrCode?.name}`);
    });

    test('should call startUpdateQrCode and toggleQrCodeModal when submit the form if there is an active group', () => {

        const spyUseQrCodeStore = jest.spyOn(useQrCodeStore, 'useQrCodeStore');
        const spyUseUiStore = jest.spyOn(useUiStore, 'useUiStore');
        const spyUseGroupStore = jest.spyOn(useGroupStore, 'useGroupStore');

        (spyUseQrCodeStore as jest.Mock).mockReturnValue({
            activeQrCode: withQrCodesState.qrCodes[0],
            startUpdateQrCode: mockStartUpdateQrCode
        });

        (spyUseUiStore as jest.Mock).mockReturnValue({
            toggleQrCodeModal: mockToggleQrCodeModal,
            isQrCodeModalOpen: true
        });

        (spyUseGroupStore as jest.Mock).mockReturnValue({
            active: withActiveGroupAndGroupsState.active
        });

        render(
            <QrCodeModal/>
        );

        const modalForm = screen.getByTestId('qrCode-modal-form');
        fireEvent.submit(modalForm);

        waitFor(async () => {
            expect(mockToggleQrCodeModal).toHaveBeenCalled();
            expect(mockStartUpdateQrCode).toHaveBeenCalled();
        });
    });

    test('should call startNewQrCode and toggleQrCodeModal when submit the form if there is no active group', () => {

        const spyUseQrCodeStore = jest.spyOn(useQrCodeStore, 'useQrCodeStore');
        const spyUseUiStore = jest.spyOn(useUiStore, 'useUiStore');
        const spyUseGroupStore = jest.spyOn(useGroupStore, 'useGroupStore');

        (spyUseQrCodeStore as jest.Mock).mockReturnValue({
            activeQrCode: withQrCodesState.qrCodes[0],
            startNewQrCode: mockStartNewQrCode
        });

        (spyUseUiStore as jest.Mock).mockReturnValue({
            toggleQrCodeModal: mockToggleQrCodeModal,
            isQrCodeModalOpen: true
        });

        (spyUseGroupStore as jest.Mock).mockReturnValue({
            active: null
        });

        render(
            <QrCodeModal/>
        );

        const modalForm = screen.getByTestId('qrCode-modal-form');
        fireEvent.submit(modalForm);

        waitFor(async () => {
            expect(mockToggleQrCodeModal).toHaveBeenCalled();
            expect(mockStartNewQrCode).toHaveBeenCalled();
        });

    });
});
