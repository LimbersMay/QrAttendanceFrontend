import {useRegistryStore, useUiStore} from "../../../../src/hooks";
import {registries} from "../../../fixtures/registryStates";
import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import {RegistryRowMenuOptions} from "../../../../src/qrAttendance/components/RegistryRow/RegistryMenuOptions";

jest.fn();

const mockToggleRegistryModal = jest.fn();

const mockSetActiveRegistry = jest.fn();
const mockStartDeleteRegistry = jest.fn();

jest.mock('../../../../src/hooks/useUiStore');
(useUiStore as jest.Mock).mockImplementation(() => ({
    toggleRegistryModal: mockToggleRegistryModal
}));

jest.mock('../../../../src/hooks/useRegistryStore');
(useRegistryStore as jest.Mock).mockImplementation(() => ({
    setActiveRegistry: mockSetActiveRegistry,
    startDeleteRegistry: mockStartDeleteRegistry
}));

describe('tests for <RegistryMenuOptions />', () => {

    beforeEach(() => jest.clearAllMocks());

    test('should match the snapshot', () => {

        const {container} = render(
            <RegistryRowMenuOptions registry={registries[0]}/>
        );

        expect(container).toMatchSnapshot();
    });

    test("should set the activeQrCode when the menu is clicked", () => {

        render(
            <RegistryRowMenuOptions registry={registries[0]}/>
        );

        const menuButton = screen.getByTestId('registry-menu-button');
        fireEvent.click(menuButton);

        expect(mockSetActiveRegistry).toHaveBeenCalledWith(registries[0]);
    });

    test("should call toggleRegistryModal when the edit button is clicked", () => {

        render(
            <RegistryRowMenuOptions registry={registries[0]}/>
        );

        const qrCodeButton = screen.getByLabelText('editRegistryButton');
        fireEvent.click(qrCodeButton);

        expect(mockToggleRegistryModal).toHaveBeenCalled();
    });

    test("should call startDeleteRegistry when the delete button is clicked", () => {

        render(
            <RegistryRowMenuOptions registry={registries[0]}/>
        );

        const qrCodeButton = screen.getByLabelText('deleteRegistryButton');
        fireEvent.click(qrCodeButton);

        expect(mockStartDeleteRegistry).toHaveBeenCalled();
    });
});
