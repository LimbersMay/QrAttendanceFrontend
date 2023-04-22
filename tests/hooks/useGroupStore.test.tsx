import {configureStore} from "@reduxjs/toolkit";
import {groupSlice, GroupState} from "../../src/store/qrAttendance";
import clearAllMocks = jest.clearAllMocks;

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
});
