import axios from "axios";

export const qrAttendanceApi = axios.create({
    baseURL: 'http://localhost:3000'
});