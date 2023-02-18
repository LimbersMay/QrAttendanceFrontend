
import io from 'socket.io-client';
import {getEnvironments} from "../helpers/getEnvironments";

const { VITE_APIURL } = getEnvironments();

const socket = io(VITE_APIURL, {
    withCredentials: true,
    protocols: ['websocket', 'polling', 'flashsocket'],
    secure: true,
});

export default socket;
