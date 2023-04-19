import {useGroupSlice} from "../../src/hooks/useGroupSlice";
import {renderHook} from "@testing-library/react";
import {configureStore} from "@reduxjs/toolkit";
import {groupSlice, GroupState} from "../../src/store/qrAttendance";
import {initialState} from "../fixtures/groupStates";
import clearAllMocks = jest.clearAllMocks;
import {Provider} from "react-redux";

const getMockStore = (initialState: GroupState) => {
    return configureStore({
        reducer: {
            group: groupSlice.reducer
        },
        preloadedState: {
            group: {...initialState}
        }
    })
}

describe('Tests for useGroupSlice', () => {

    beforeEach(() => clearAllMocks());

    test('should return the default values', () => {

        const mockStore = getMockStore({ ...initialState});

        const { result } = renderHook(() => useGroupSlice(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{ children }</Provider>
        });

        expect(result.current).toEqual({
            groups: expect.any(Array),
            active: null,
            startUpdateGroup: expect.any(Function),
            setActiveGroup: expect.any(Function),
            startNewGroup: expect.any(Function)
        });
    });
});
