import { Middleware, Dispatch, AnyAction } from 'redux';
import io from 'socket.io-client';
import { addNewRegistry } from '../qrAttendance';

import {Registry} from "../../qrAttendance/interfaces";

const socketMiddleware: Middleware = (store) => {
    const socket = io('http://localhost:3000');
    const handleNewRegistries = (data: Registry) => {
        store.dispatch(addNewRegistry(data));
    }
    socket.on('new-registries', (data: any) => {
        handleNewRegistries(data);
    });
    return (next: Dispatch) => (action: AnyAction) => {
        next(action);
    }
}

export default socketMiddleware;

