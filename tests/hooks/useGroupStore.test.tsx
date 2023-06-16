import {configureStore} from "@reduxjs/toolkit";
import {groupSlice, GroupState} from "../../src/store/qrAttendance";
import clearAllMocks = jest.clearAllMocks;
import {groups, initialState, withGroupsState} from "../fixtures/groupStates";
import {act, renderHook} from "@testing-library/react";
import {useGroupStore} from "../../src/hooks/useGroupStore";
import {Provider} from "react-redux";
import {qrAttendanceApi} from "../../src/api/qrAttendanceApi";

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

    test('startUpdateGroup should update the group', async () => {
        const mockStore = getMockStore({...withGroupsState});

        const { result } = renderHook(() => useGroupStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const spy = jest.spyOn(qrAttendanceApi, 'put').mockResolvedValue({});

        const updatedGroup = {
            ...groups[0],
            name: 'Updating the name of this group'
        }

        await act(async () => {
           await result.current.startUpdateGroup(updatedGroup)
        });

        expect(result.current.groups).toContainEqual(updatedGroup);

        spy.mockRestore();
    });

    test('setActiveGroup should set activeGroup', async () => {
        const mockStore = getMockStore({...initialState});

        const { result } = renderHook(() => useGroupStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async () => {
            await result.current.setActiveGroup(groups[0]);
        });

        expect(result.current.active).toEqual(groups[0]);
    });

    test('startNewGroup should add an empty group', async () => {

        const newGroup = {
            id: '1234-as-css',
            createdAt: '22-05-2023',
            name: 'Default group'
        }

        const mockStore = getMockStore({...withGroupsState});
        const { result } = renderHook(() => useGroupStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const spy = jest.spyOn(qrAttendanceApi, 'post').mockResolvedValue({
            data: {
                body: {...newGroup}
            }
        });

        await act(async () => {
            await result.current.startNewGroup();
        })

        expect(result.current.groups).toContainEqual({
            id: newGroup.id,
            date: newGroup.createdAt,
            name: newGroup.name
        });

        spy.mockRestore();
    });
});
