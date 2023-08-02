import {fireEvent, render, screen} from "@testing-library/react";
import {QrCodeMenuOptions} from "../../../../src/qrAttendance/components/qrCodeRow/QrCodeMenuOptions";
import {qrCodes} from "../../../fixtures/qrAttendanceStates";
import {useGroupStore, useQrAttendanceStore, useQrCodeStore, useUiStore} from "../../../../src/hooks";


const mockSetActiveQrCode = jest.fn();
const mockShowQrCode = jest.fn();
const mockToggleQrCodeModal = jest.fn();
const mockSetActiveGroup = jest.fn();
const mockStartDeleteQrCodeWithDependencies = jest.fn();

jest.mock('../../../../src/hooks/useGroupStore');
(useGroupStore as jest.Mock).mockImplementation(() => ({
    setActiveGroup: mockSetActiveGroup
}));

jest.mock('../../../../src/hooks/useQrCodeStore');
(useQrCodeStore as jest.Mock).mockImplementation(() => ({
    setActiveQrCode: mockSetActiveQrCode
}));


jest.mock('../../../../src/hooks/useUiStore');
(useUiStore as jest.Mock).mockImplementation(() => ({
    showQrCode: mockShowQrCode,
    toggleQrCodeModal: mockToggleQrCodeModal
}));

jest.mock('../../../../src/hooks/useQrAttendanceStore');
(useQrAttendanceStore as jest.Mock).mockImplementation(() => ({
    startDeleteQrCodeWithDependencies: mockStartDeleteQrCodeWithDependencies
}));

describe('tests for <QrCodeMenuOptions />', () => {

    beforeEach(() => jest.clearAllMocks());

    test('should match the snapshot', () => {

        const {container} = render(
            <QrCodeMenuOptions handleDownload={() => {
            }} qrCode={qrCodes[0]}/>
        );

        expect(container).toMatchSnapshot();
    });

    test("should set the activeQrCode when the menu is clicked", () => {

        render(
            <QrCodeMenuOptions
                handleDownload={() => {}}
                qrCode={qrCodes[0]}
            />
        );

        const menuButton = screen.getByTestId('qr-code-menu-button');
        fireEvent.click(menuButton);

        expect(mockSetActiveQrCode).toHaveBeenCalledWith(qrCodes[0]);
    });

    test("should call the showQrCode function when the show button is clicked", () => {

        render(
            <QrCodeMenuOptions handleDownload={() => {
            }} qrCode={qrCodes[0]}/>
        );

        // get by aria-label
        const showButton = screen.getByLabelText('showQrCodeButton');
        fireEvent.click(showButton);

        expect(mockShowQrCode).toHaveBeenCalled();
    });

    test("should call the toggleQrCodeModal function when the edit button is clicked", () => {

            render(
                <QrCodeMenuOptions handleDownload={() => {
                }} qrCode={qrCodes[0]}/>
            );

            // get by aria-label
            const editButton = screen.getByLabelText('editQrCodeButton');
            fireEvent.click(editButton);

            expect(mockToggleQrCodeModal).toHaveBeenCalled();
    });

    test('should call the handleDownload function when the download button is clicked', () => {

        const mockHandleDownload = jest.fn();

        render(
            <QrCodeMenuOptions handleDownload={mockHandleDownload} qrCode={qrCodes[0]}/>
        );

        // get by aria-label
        const downloadButton = screen.getByLabelText('downloadQrCodeButton');
        fireEvent.click(downloadButton);

        expect(mockHandleDownload).toHaveBeenCalled();

    });

    test("should call the startDeleteQrCodeWithDependencies function when the delete button is clicked", () => {

        render(
            <QrCodeMenuOptions handleDownload={() => {
            }} qrCode={qrCodes[0]}/>
        );

        // get by aria-label
        const deleteButton = screen.getByLabelText('deleteQrCodeButton');
        fireEvent.click(deleteButton);

        expect(mockStartDeleteQrCodeWithDependencies).toHaveBeenCalled();
    });
});
