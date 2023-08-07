import {Routes, Route, Navigate, useSearchParams} from "react-router-dom";
import {AuthRoutes} from "../auth/routes/AuthRoutes";
import {QrAttendanceRoutes} from "../qrAttendance/routes/QrAttendanceRoutes";
import {useCheckAuth} from "../hooks";
import {authStatusTypes} from "../auth/types";
import {CheckingAuth} from "../iu";
import {CheckInFormRouter} from "../checkInForm/CheckInFormRouter";

export const AppRouter = () => {

    const [query] = useSearchParams();
    const token = query.get('token');

    if (token) {
        localStorage.setItem('token', token);
        window.location.href = '/';
    }

    const status = useCheckAuth();

    if (status === authStatusTypes.checking) {
        return <CheckingAuth />;
    }

    return (
        <Routes>

            {
                status === authStatusTypes.authenticated
                    ? <Route path="/*" element={<QrAttendanceRoutes />}/>
                    : <>
                        <Route path="/auth/*" element={<AuthRoutes />}/>
                        <Route path="/checkIn/*" element={<CheckInFormRouter />} />
                    </>
            }

            <Route path="/checkIn/*" element={<CheckInFormRouter />} />
            <Route path="/*" element={<Navigate to="/auth/login" />}/>

        </Routes>
    )
}