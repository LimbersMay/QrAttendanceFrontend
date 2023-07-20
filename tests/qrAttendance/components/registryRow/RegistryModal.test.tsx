import {configureStore} from "@reduxjs/toolkit";
import {uiSlice} from "../../../../src/store/ui/uiSlice";
import {registrySlice} from "../../../../src/store/qrAttendance";
import {withRegistryModalOpenTrue} from "../../../fixtures/uiStates";
import {withActiveRegistryAndRegistriesState} from "../../../fixtures/qrAttendanceStates";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {Provider} from "react-redux";
import {RegistryModal} from "../../../../src/qrAttendance/components/RegistryRow/RegistryModal";
import * as useRegistryStore from "../../../../src/hooks/useRegistryStore";
import * as useUiStore from "../../../../src/hooks/useUiStore";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        registry: registrySlice.reducer
    },
    preloadedState: {
        ui: {...withRegistryModalOpenTrue},
        registry: {...withActiveRegistryAndRegistriesState}
    }
});

describe('tests for <RegistryModal />', () => {

    beforeEach(() => jest.clearAllMocks());

    test('should match the snapshot', () => {
        const {container} = render(
            <Provider store={store}>
                <RegistryModal />
            </Provider>
        );

        expect(container).toMatchSnapshot();
    });

    test('should show the name of the registry', () => {
        render(
            <Provider store={store}>
                <RegistryModal />
            </Provider>
        );

        const registryName = screen.getByLabelText('registry-title');

        expect(registryName.textContent).toContain(`${withActiveRegistryAndRegistriesState.active?.name}`);
    });

    test('should call the startUpdateRegistry and toggleRegistryModal when submit the form', async () => {

        const mockStartUpdateRegistry = jest.fn();
        const mockToggleRegistryModal = jest.fn();

        const useRegistryStoreSpy = jest.spyOn(useRegistryStore, 'useRegistryStore');
        const useUiStoreSpy = jest.spyOn(useUiStore, 'useUiStore');

        (useRegistryStoreSpy as jest.Mock).mockReturnValue({
            startUpdateRegistry: mockStartUpdateRegistry,
            active: withActiveRegistryAndRegistriesState.active
        });

        (useUiStoreSpy as jest.Mock).mockReturnValue({
            toggleRegistryModal: mockToggleRegistryModal,
            isRegistryModalOpen: true
        });

        render(
            <Provider store={store}>
                <RegistryModal />
            </Provider>
        );

        const registryModalForm = screen.getByLabelText('registry-modal-form');
        fireEvent.submit(registryModalForm);

        await waitFor(() => {
            expect(mockStartUpdateRegistry).toHaveBeenCalled();
            expect(mockToggleRegistryModal).toHaveBeenCalled();
        });
    });
});
