import {groups} from "../../fixtures/qrAttendanceStates";
import {fireEvent, render, screen} from "@testing-library/react";
import {SideBarItem} from "../../../src/qrAttendance/components/SideBarItem";
import {useGroupStore} from "../../../src/hooks/useGroupStore";

jest.mock("../../../src/hooks/useGroupStore");

describe('Tests for <SideBarItem />', () => {

    const mockSetActiveGroup = jest.fn();

    test('should render the component successfully', async () => {

        (useGroupStore as jest.Mock).mockReturnValue({
            setActiveGroup: mockSetActiveGroup
        });

        const {container} = render(
            <SideBarItem group={groups[0]}/>
        );

        expect(container).toMatchSnapshot();
    });

    test('should send the selected group when clicking on a card', () => {

        (useGroupStore as jest.Mock).mockReturnValue({
            setActiveGroup: mockSetActiveGroup
        });

        render(<SideBarItem group={groups[0]}/>);

        const groupItem = screen.getByTestId('group-item');
        fireEvent.click(groupItem);

        expect(mockSetActiveGroup).toHaveBeenCalledWith(groups[0]);
    });
});
