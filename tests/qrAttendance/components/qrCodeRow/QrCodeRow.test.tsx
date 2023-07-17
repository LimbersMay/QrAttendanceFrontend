import {render, screen} from "@testing-library/react";
import {QrCodeRow} from "../../../../src/qrAttendance/components/qrCodeRow/QrCodeRow";
import {qrCodes, withActiveGroupAndGroupsState, withQrCodesState} from "../../../fixtures/qrAttendanceStates";
import {registries} from "../../../fixtures/registryStates";
import {configureStore} from "@reduxjs/toolkit";
import {groupSlice, qrCodeSlice} from "../../../../src/store/qrAttendance";
import {Provider} from "react-redux";
import {uiSlice} from "../../../../src/store/ui/uiSlice";
import {initialState} from "../../../fixtures/uiStates";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        qrCode: qrCodeSlice.reducer,
        group: groupSlice.reducer

    },
    preloadedState: {
        ui: {...initialState},
        qrCode: {...withQrCodesState},
        group: {...withActiveGroupAndGroupsState}
    }
})

describe('Tests for <QrCodeRow />', () => {
    test('Should match the snapshot', () => {

        const { container } = render(
            <Provider store={store}>
                <table>
                    <tbody>
                        <QrCodeRow qrCodeRow={qrCodes[0]} handleOpenSubTable={() => {}} open={false} registries={registries} />
                    </tbody>
                </table>
            </Provider>
        );

        expect(container).toMatchSnapshot();
    });

    test('should show the name of the qrCode', () => {
         render(
            <Provider store={store}>
                <QrCodeRow qrCodeRow={qrCodes[0]} handleOpenSubTable={() => {}} open={false} registries={registries} />
            </Provider>
        );

        expect(screen.getByText(qrCodes[0].name)).toBeTruthy();
    });
});
