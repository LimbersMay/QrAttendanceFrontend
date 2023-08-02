import clearAllMocks = jest.clearAllMocks;
import {
    addEmptyRegistry,
    deleteRegistry,
    onSetActiveRegistry,
    registrySlice,
    setRegistries,
    updateRegistry
} from "../../../../src/store/qrAttendance";
import {initialState, registries, withRegistriesState} from "../../../fixtures/registryStates";
import {Registry} from "../../../../src/qrAttendance/interfaces";

describe('Tests for qrCodeSlice', () => {

    beforeEach(() => clearAllMocks());

    test('should return the default values', () => {
        const state =  registrySlice.getInitialState();
        expect(state).toEqual(initialState);
    });

    test('onSetActiveRegistry should set the active registry', () => {
        const newState = registrySlice.reducer(initialState, onSetActiveRegistry(registries[0]));
        expect(newState.active).toEqual(registries[0]);

    });

    test('setRegistries should set the registries', () => {
        const newState = registrySlice.reducer(initialState, setRegistries(registries));
        expect(newState.registries).toEqual([...registries]);
    });

    test('updateRegistry should update the registry', () => {

        const updatedRegistry: Registry = {
            id: '1-alastor',
            name: 'Lucia',
            career: 'Industrial engineering',
            group: 'group3-22-id',
            checkInTime: '22-02-2023',
            firstSurname: 'Lopez',
            secondSurname: 'Flores',
            qrCodeId: '3941-12ws-aa'
        }

        const newState = registrySlice.reducer(withRegistriesState, updateRegistry(updatedRegistry));
        expect(newState.registries).toContain(updatedRegistry);
    });

    test('deleteRegistry should delete the active registry', () => {

        const idRegistryToDelete = '1';

        const newState = registrySlice.reducer(withRegistriesState, deleteRegistry(idRegistryToDelete));
        expect(newState.registries).not.toContainEqual(registries[0]);
    });

    test('addEmptyRegistry should add a registry', () => {

        const newRegistry: Registry = {
            id: '2-registry',
            name: 'Alejandro',
            career: 'Software engineering',
            group: 'group-41-122',
            checkInTime: '22-02-2023',
            firstSurname: 'Magno',
            secondSurname: 'Garcia',
            qrCodeId: '3941-12wsña-aa'
        }

        const newState = registrySlice.reducer(withRegistriesState, addEmptyRegistry(newRegistry));
        expect(newState.registries).toEqual([...registries, newRegistry]);
    });
});
