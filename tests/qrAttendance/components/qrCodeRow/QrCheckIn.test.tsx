import {fireEvent, render, screen} from "@testing-library/react";
import {QrCheckIn} from "../../../../src/qrAttendance/components/qrCodeRow/QrCheckIn";
import {withActiveGroupAndGroupsState, withQrCodesState} from "../../../fixtures/qrAttendanceStates";
import {configureStore} from "@reduxjs/toolkit";
import {uiSlice} from "../../../../src/store/ui/uiSlice";
import {groupSlice, qrCodeSlice} from "../../../../src/store/qrAttendance";
import {withShowingQrCodeTrue} from "../../../fixtures/uiStates";
import {Provider} from "react-redux";
import * as useQrCodeStore from "../../../../src/hooks/useQrCodeStore";
import * as useUiStore from "../../../../src/hooks/useUiStore";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        qrCode: qrCodeSlice.reducer,
        group: groupSlice.reducer

    },
    preloadedState: {
        ui: {...withShowingQrCodeTrue},
        qrCode: {...withQrCodesState},
        group: {...withActiveGroupAndGroupsState}
    }
});

describe('tests for <QrCheckIn />', () => {

    const mockHideQrCode = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('should match the snapshot', () => {
        const {container} = render(
            <Provider store={store}>
                <QrCheckIn/>
            </Provider>
        );

        expect(container).toMatchSnapshot();
    });

    test('should call hideQrCode when the close button is clicked', () => {

        const spyUseUiStore = jest.spyOn(useUiStore, 'useUiStore');
        const spyUseQrCodeStore = jest.spyOn(useQrCodeStore, 'useQrCodeStore');

        (spyUseUiStore as jest.Mock).mockReturnValue({
            isShowingQrCode: true,
            hideQrCode: mockHideQrCode
        });

        (spyUseQrCodeStore as jest.Mock).mockReturnValue({
            activeQrCode: withQrCodesState.qrCodes[0]
        });

        render(
            <QrCheckIn/>
        );

        const closeButton = screen.getByTestId('close-button');
        fireEvent.click(closeButton);

        expect(mockHideQrCode).toHaveBeenCalled();
    });

    test('should show the name of the qrCode', () => {

        render(
            <Provider store={store}>
                <QrCheckIn/>
            </Provider>
        );

        const titleElement = screen.getByTestId('qrCode-title');
        expect(titleElement.textContent).toContain(withQrCodesState.qrCodes[0].name);
    });
});
