import axios from "axios";

export const qrAttendanceApi = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
    params: {}
});

