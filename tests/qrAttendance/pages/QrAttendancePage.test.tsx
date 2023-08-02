import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {authSlice} from "../../../src/store/auth";
import {groupSlice, qrCodeSlice, registrySlice} from "../../../src/store/qrAttendance";
import {authenticatedState} from "../../fixtures/authStates";
import {
    withQrCodesState,
    withActiveGroupAndGroupsState,
    withActiveRegistryAndRegistriesState
} from "../../fixtures/qrAttendanceStates";
import {QrAttendancePage} from "../../../src/qrAttendance/pages/QrAttendancePage";
import {ThemeProvider} from "@mui/material";
import {purpleTheme} from "../../../src/theme";
import {uiSlice} from "../../../src/store/ui/uiSlice";
import {initialState as uiInitialState} from "../../fixtures/uiStates";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        auth: authSlice.reducer,
        group: groupSlice.reducer,
        qrCode: qrCodeSlice.reducer,
        registry: registrySlice.reducer,

    },
    preloadedState: {
        ui: {...uiInitialState},
        auth: {...authenticatedState},
        group: {...withActiveGroupAndGroupsState},
        qrCode: {...withQrCodesState},
        registry: {...withActiveRegistryAndRegistriesState}
    }
});

describe('Tests for <QrAttendancePage />', () => {
    beforeEach(() => jest.clearAllMocks());

    test('should render the component successfully', async () => {
        render(
            <Provider store={store}>
                <ThemeProvider theme={purpleTheme}>
                    <MemoryRouter>
                        <QrAttendancePage/>
                    </MemoryRouter>
                </ThemeProvider>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getAllByText('QrAttendance').length).toBeGreaterThanOrEqual(1);
        });
    });
});
