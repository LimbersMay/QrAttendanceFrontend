import axios from "axios";

export const qrAttendanceApi = axios.create({
    baseURL: 'https://qrattendancebackend.up.railway.app/api',
    withCredentials: true,
    params: {}
});

