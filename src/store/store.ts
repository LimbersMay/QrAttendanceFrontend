import {AnyAction, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {authSlice} from "./auth";
import {groupSlice, qrCodeSlice, registrySlice} from "./qrAttendance";
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        group: groupSlice.reducer,
        qrCode: qrCodeSlice.reducer,
        registry: registrySlice.reducer,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>
