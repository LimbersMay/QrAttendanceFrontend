import { Routes, Route } from "react-router-dom";
import {AuthRoutes} from "../auth/routes/AuthRoutes";
import {QrAttendanceRoutes} from "../qrAttendance/routes/QrAttendanceRoutes";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/*' element={<QrAttendanceRoutes />} />
            <Route path='/auth/*' element={<AuthRoutes />}/>
        </Routes>
    )
}