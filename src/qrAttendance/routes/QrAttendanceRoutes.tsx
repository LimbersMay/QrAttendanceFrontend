import {Navigate, Route, Routes} from "react-router-dom";
import {QrAttendancePage} from "../pages/QrAttendancePage";

export const QrAttendanceRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={ <QrAttendancePage />} />
            <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default QrAttendanceRoutes;