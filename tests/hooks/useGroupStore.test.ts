import {configureStore} from "@reduxjs/toolkit";
import {groupSlice, GroupState} from "../../src/store/qrAttendance";
import clearAllMocks = jest.clearAllMocks;
import {groups, initialState} from "../fixtures/groupStates";
import {act, renderHook} from "@testing-library/react";
import {useGroupStore} from "../../src/hooks/useGroupStore";
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

describe('Tests for useGroupStore', () => {
    beforeEach(() => clearAllMocks());

    test('should return the default values', () => {

        const mockStore = getMockStore({...initialState});

        const {result} = renderHook(() => useGroupStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        expect(result.current).toEqual({
            groups: expect.any(Array),
            active: null,
            startUpdateGroup: expect.any(Function),
            setActiveGroup: expect.any(Function),
            startNewGroup: expect.any(Function)
        });
    });

    test('startUpdateGroup should update the group', () => {
        const mockStore = getMockStore({...initialState});

        const { result } = renderHook(() => useGroupStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });
    });

    test('setActiveGroup should call onSetActiveGroup', async () => {
        const mockStore = getMockStore({...initialState});

        const { result } = renderHook(() => useGroupStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async () => {
            await result.current.setActiveGroup(groups[0]);
        });

        expect(result.current.active).toEqual(groups[0]);
    });
});
