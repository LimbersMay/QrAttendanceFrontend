import { Middleware, Dispatch, AnyAction } from 'redux';
import socket from "../../utilities/socketIo";
import {Registry} from "../../qrAttendance/interfaces";
import {addEmptyRegistry} from "../qrAttendance";
import {SnackbarUtilities} from "../../utilities/snackbar-manager";
import {getValidationError} from "../../utilities";

const socketMiddleware: Middleware = (store) => {

    socket.on("new-attendance", (data: Registry) => {
        store.dispatch(addEmptyRegistry(data));
    });

    socket.on("register-attendance-error", (message: string) => {
        SnackbarUtilities.error(getValidationError(message));
    });

    socket.on("register-attendance-success", () => {
        SnackbarUtilities.success('Attendance registered successfully');
    });

    socket.on("already-registered-attendance", (message: string) => {
        SnackbarUtilities.info(getValidationError(message));
    });

    return (next: Dispatch) => (action: AnyAction) => {
        next(action);
    }
}

export default socketMiddleware;

