import {Provider} from "react-redux";
import {fireEvent, render, screen} from "@testing-library/react";
import {configureStore} from "@reduxjs/toolkit";
import {groups, withActiveGroupAndGroupsState, withQrCodesState} from "../../../fixtures/qrAttendanceStates";
import {TitleRow} from "../../../../src/qrAttendance/components/titleRow/TitleRow";
import {uiSlice} from "../../../../src/store/ui/uiSlice";
import {groupSlice, qrCodeSlice} from "../../../../src/store/qrAttendance";
import {withQrCodeModalOpenTrue} from "../../../fixtures/uiStates";

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

const mockToggleTitleModal = jest.fn();
const mockToggleQrCodeModal = jest.fn();

const mockStartDeleteGroupWithDependencies = jest.fn();

jest.mock('../../../../src/hooks/useUiStore', () => ({
    useUiStore: () => ({
        toggleTitleModal: mockToggleTitleModal,
        toggleQrCodeModal: mockToggleQrCodeModal,
        isTitleModalOpen: false,
        isQrCodeModalOpen: false,
    })
}));

jest.mock('../../../../src/hooks/useQrAttendanceStore', () => ({
    useQrAttendanceStore: () => ({
        startDeleteGroupWithDependencies: mockStartDeleteGroupWithDependencies
    })
}));

describe('tests for <TitleRow />', () => {

    beforeEach(() => jest.clearAllMocks());

    test('should match the snapshot', () => {

        const {container} = render(
            <Provider store={store}>
                <table>
                    <tbody>
                    <TitleRow group={withActiveGroupAndGroupsState.active || groups[0]}
                              qrCodes={withQrCodesState.qrCodes}/>
                    </tbody>
                </table>
            </Provider>
        );

        expect(container).toMatchSnapshot();
    });

    test('should call the toggleQrCodeModal when add button is clicked', () => {

        render(
            <Provider store={store}>
                <table>
                    <tbody>
                    <TitleRow group={withActiveGroupAndGroupsState.active || groups[0]}
                              qrCodes={withQrCodesState.qrCodes}/>
                    </tbody>
                </table>
            </Provider>
        );

        const addButton = screen.getByLabelText('addQrCodeButton');
        fireEvent.click(addButton);

        expect(mockToggleQrCodeModal).toHaveBeenCalled();
    });

    test('should call the toggleTitleModal function when the edit button is clicked', () => {

        render(
            <Provider store={store}>
                <table>
                    <tbody>
                    <TitleRow group={withActiveGroupAndGroupsState.active || groups[0]}
                              qrCodes={withQrCodesState.qrCodes}/>
                    </tbody>
                </table>
            </Provider>
        );

        const editButton = screen.getByLabelText('editGroupButton');
        fireEvent.click(editButton);

        expect(mockToggleTitleModal).toHaveBeenCalled();
    });

    test('should show the confirm dialog when the delete button is clicked', () => {

        render(
            <Provider store={store}>
                <table>
                    <tbody>
                    <TitleRow group={withActiveGroupAndGroupsState.active || groups[0]}
                              qrCodes={withQrCodesState.qrCodes}/>
                    </tbody>
                </table>
            </Provider>
        );

        const deleteButton = screen.getByLabelText('deleteGroupButton');
        fireEvent.click(deleteButton);

        const {rerender} = render(
            <Provider store={store}>
                <table>
                    <tbody>
                    <TitleRow group={withActiveGroupAndGroupsState.active || groups[0]}
                                qrCodes={withQrCodesState.qrCodes}/>
                    </tbody>
                </table>
            </Provider>
        );

        // rerender to show the confirm dialog
        rerender(
            <Provider store={store}>
                <table>
                    <tbody>
                    <TitleRow group={withActiveGroupAndGroupsState.active || groups[0]}
                                qrCodes={withQrCodesState.qrCodes}/>
                    </tbody>
                </table>
            </Provider>
        );

        const confirmTitle = screen.getByLabelText('Confirm');
        expect(confirmTitle).toBeTruthy();
    });
});
