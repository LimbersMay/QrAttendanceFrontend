import axios from "axios";
import {getEnvironments} from "../helpers/getEnvironments";

const { VITE_APIURL } = getEnvironments();

export const qrAttendanceApi = axios.create({
    baseURL: `${VITE_APIURL}/api`,
    withCredentials: true,
    params: {}
});

