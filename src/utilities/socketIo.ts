
import io from 'socket.io-client';
const socket = io('https://qrattendancebackend.up.railway.app', {
    withCredentials: true,
    protocols: ['websocket', 'polling', 'flashsocket'],
    secure: true,
});

export default socket;
