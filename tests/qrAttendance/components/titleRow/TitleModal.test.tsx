import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {TitleModal} from "../../../../src/qrAttendance/components/titleRow/TitleModal";
import {groups} from "../../../fixtures/qrAttendanceStates";

const mockToggleTitleModal = jest.fn();

const mockStartUpdateGroup = jest.fn();
const mockSetActiveGroup = jest.fn();

jest.mock('../../../../src/hooks/useUiStore', () => ({
    useUiStore: () => ({
        toggleTitleModal: mockToggleTitleModal,
        isTitleModalOpen: true,
    }),
}));

jest.mock('../../../../src/hooks/useGroupStore', () => ({
    useGroupStore: () => ({
        startUpdateGroup: mockStartUpdateGroup,
        setActiveGroup: mockSetActiveGroup,
        active: groups[0]
    }),
}));

describe('tests for <TitleModal />', () => {

    test('should match the snapshot', () => {

        const {container} = render(
            <TitleModal/>
        );

        expect(container).toMatchSnapshot();
    });

    test('should show the name of the group', () => {

        render(
            <TitleModal/>
        );

        const title = screen.getByLabelText('groupTitle');
        expect(title.textContent).toContain(groups[0].name);
    });

    test('should call startUpdateGroup, toggleTitleModal and setActiveGroup when the form is submitted', () => {

        render(
            <TitleModal/>
        );

        const form = screen.getByLabelText('titleModalForm');
        fireEvent.submit(form);

        waitFor(() => {
            expect(mockStartUpdateGroup).toHaveBeenCalled();
            expect(mockToggleTitleModal).toHaveBeenCalled();
            expect(mockSetActiveGroup).toHaveBeenCalled();
        });
    });
});
