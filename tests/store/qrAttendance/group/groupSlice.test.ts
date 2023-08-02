import {
    addEmptyGroup,
    deleteGroup,
    groupSlice,
    onSetActiveGroup,
    setGroups,
    updateGroup
} from "../../../../src/store/qrAttendance";
import {groups, initialState, withGroupsState} from "../../../fixtures/groupStates";
import {Group} from "../../../../src/qrAttendance/interfaces";
import clearAllMocks = jest.clearAllMocks;

describe('Tests for groupSlice', () => {

    beforeEach(() => clearAllMocks());

    test('should return the default values', () => {
        const state = groupSlice.getInitialState();
        expect(state).toEqual(initialState);
    });

    test('onSetActiveGroup should set the active group', () => {
        const newState = groupSlice.reducer(initialState, onSetActiveGroup(groups[0]));
        expect(newState.active).toEqual(groups[0]);
    });

    test('setGroups should set the groups', () => {

        const state = groupSlice.reducer(initialState, setGroups(groups))
        expect(state.groups).toEqual([...groups]);
    });

    test('updateGroup should update the group', () => {

        const updatedGroup: Group = {
            id: '1',
            name: 'Updated group',
            date: '22-01-23'
        }

        const newState = groupSlice.reducer(withGroupsState, updateGroup(updatedGroup));
        expect(newState.groups).toContain(updatedGroup);
    });

    test('deleteGroup should delete the active group', () => {

        const groupIdToDelete = '1';

        const newState = groupSlice.reducer(withGroupsState, deleteGroup(groupIdToDelete));
        expect(newState.groups).not.toContainEqual(groups[0]);
    });

    test('addEmptyGroup should add a group', () => {

        const newGroup: Group = {
            id: '1',
            name: 'Group one',
            date: '22-01-23'
        }

        const newState = groupSlice.reducer(withGroupsState, addEmptyGroup(newGroup));
        expect(newState.groups).toEqual([...groups, newGroup]);
    });
});
