import {Routes, Route, Navigate} from "react-router-dom";
import {useCheckAuth} from "../hooks";
import {authStatusTypes} from "../auth/types";
import {AuthRoutes, CheckInFormRoutes, QrAttendanceRoutes} from "./routes";

export const AppRouter = () => {

    const status = useCheckAuth();

    return (
        <Routes>

            {
                status === authStatusTypes.authenticated
                    ? <Route path="/*" element={<QrAttendanceRoutes/>}/>
                    : <>
                        <Route path="/auth/*" element={<AuthRoutes/>}/>
                        <Route path="/checkIn/*" element={<CheckInFormRoutes/>}/>
                    </>
            }

            <Route path="/checkIn/*" element={<CheckInFormRoutes/>}/>
            <Route path="/*" element={<Navigate to="/auth/login"/>}/>

        </Routes>
    )
}