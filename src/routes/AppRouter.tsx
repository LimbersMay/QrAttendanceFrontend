import {Routes, Route, Navigate} from "react-router-dom";
import {AuthRoutes} from "../auth/routes/AuthRoutes";
import {QrAttendanceRoutes} from "../qrAttendance/routes/QrAttendanceRoutes";
import {useCheckAuth} from "../hooks/useCheckAuth";
import {authStatusTypes} from "../auth/types";
import {CheckingAuth} from "../iu";

export const AppRouter = () => {

    const status = useCheckAuth();

    if (status === authStatusTypes.checking) {
        return <CheckingAuth />;
    }

    return (
        <Routes>

            {
                status === authStatusTypes.authenticated
                    ? <Route path="/*" element={<QrAttendanceRoutes />}/>
                    : <Route path="/auth/*" element={<AuthRoutes />}/>
            }

            <Route path="/*" element={<Navigate to="/auth/login" />}/>

        </Routes>
    )
}