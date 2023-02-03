import { Middleware, Dispatch, AnyAction } from 'redux';
import socket from "../../utilities/socketIo";
import {Registry} from "../../qrAttendance/interfaces";
import {addNewRegistry} from "../qrAttendance";
import {SnackbarUtilities} from "../../utilities/snackbar-manager";
import {getValidationError} from "../../utilities";

const socketMiddleware: Middleware = (store) => {

    socket.on("new-attendance", (data: Registry) => {
        store.dispatch(addNewRegistry(data));
    });

    socket.on("register-attendance-error", (message: string) => {
        SnackbarUtilities.error(getValidationError(message));
    });

    socket.on("register-attendance-success", () => {
        SnackbarUtilities.sucess('Attendance registered successfully');
    });

    return (next: Dispatch) => (action: AnyAction) => {
        next(action);
    }
}

export default socketMiddleware;

