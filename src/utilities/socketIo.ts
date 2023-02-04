
import io from 'socket.io-client';
const socket = io('https://qrattendancebackend.up.railway.app:8004', {
    withCredentials: true,
    protocols: ['websocket', 'polling', 'flashsocket'],
});

export default socket;
