import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {render, screen} from "@testing-library/react";
import {uiSlice} from "../../../../src/store/ui/uiSlice";
import {registrySlice} from "../../../../src/store/qrAttendance";
import {initialState} from "../../../fixtures/uiStates";
import {
    withActiveRegistryAndRegistriesState
} from "../../../fixtures/qrAttendanceStates";
import {RegistryRow} from "../../../../src/qrAttendance/components/RegistryRow/RegistryRow";
import {registries} from "../../../fixtures/registryStates";

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        registry: registrySlice.reducer
    },
    preloadedState: {
        ui: {...initialState},
        registry: {...withActiveRegistryAndRegistriesState}
    }
});

describe('tests for <RegistryRow />', () => {
    test('should match the snapshot', () => {
        const {container} = render(
            <Provider store={store}>
                <table>
                    <tbody>
                    <RegistryRow registryRow={registries[0]}/>
                    </tbody>
                </table>
            </Provider>
        );

        expect(container).toMatchSnapshot();
    });

    test('should show the name of the registry', () => {
        render(
            <Provider store={store}>
                <table>
                    <tbody>
                        <RegistryRow registryRow={registries[0]}/>
                    </tbody>
                </table>
            </Provider>
        );

        expect(screen.getByText(registries[0].name)).toBeTruthy();
    });
});
