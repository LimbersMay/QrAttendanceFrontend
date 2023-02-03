import {AppThunk} from "../store";
import {Socket} from "socket.io-client";

export const startConnectWebSocket = (io: Socket): AppThunk => {
    return (dispatch, getState) => {
        const userId = getState().auth.uid;
        io.emit('authenticated', userId);
    }
}