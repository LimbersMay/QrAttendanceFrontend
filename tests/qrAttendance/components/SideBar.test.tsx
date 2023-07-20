import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "../../../src/store/auth";
import {groupSlice} from "../../../src/store/qrAttendance";
import {authenticatedState} from "../../fixtures/authStates";
import {
    withActiveGroupAndGroupsState
} from "../../fixtures/qrAttendanceStates";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {ThemeProvider} from "@mui/material";
import {purpleTheme} from "../../../src/theme";
import {MemoryRouter} from "react-router-dom";
import {SideBar} from "../../../src/qrAttendance/components";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        group: groupSlice.reducer,

    },
    preloadedState: {
        auth: {...authenticatedState},
        group: {...withActiveGroupAndGroupsState},
    }
})

describe('Tests for <SideBar />', () => {
    beforeEach(() => jest.clearAllMocks());

    test('should render the component successfully', async () => {
        const {container} = await render(
            <Provider store={store}>
                <ThemeProvider theme={purpleTheme}>
                    <MemoryRouter>
                        <SideBar drawerWidth={280} mobileOpen={false} handleDrawerToggle={() => {}}/>
                    </MemoryRouter>
                </ThemeProvider>
            </Provider>
        );

        expect(container).toMatchSnapshot();
    });

    test('should show the user name', () => {

        render(
            <Provider store={store}>
                <ThemeProvider theme={purpleTheme}>
                    <MemoryRouter>
                        <SideBar drawerWidth={280} mobileOpen={false} handleDrawerToggle={() => {}}/>
                    </MemoryRouter>
                </ThemeProvider>
            </Provider>
        );

        expect(screen.getByText(`${authenticatedState.displayName}`)).toBeTruthy();
    });

    test('should render the groups in the store', () => {
        render(
            <Provider store={store}>
                <ThemeProvider theme={purpleTheme}>
                    <MemoryRouter>
                        <SideBar drawerWidth={280} mobileOpen={false} handleDrawerToggle={() => {}}/>
                    </MemoryRouter>
                </ThemeProvider>
            </Provider>
        );

        const groups = screen.getAllByTestId('group-item');
        expect(groups.length).toBe(withActiveGroupAndGroupsState.groups.length);
    });
});
