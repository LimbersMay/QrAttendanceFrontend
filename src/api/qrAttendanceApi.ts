import axios from "axios";
import {getEnvironments} from "../helpers/getEnvironments";

const { VITE_APIURL } = getEnvironments();

export const qrAttendanceApi = axios.create({
    baseURL: 'https://qrattendancebackend.up.railway.app/api',
    withCredentials: true,
    params: {}
});

