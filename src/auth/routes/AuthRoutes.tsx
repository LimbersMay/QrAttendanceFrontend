import {Navigate, Route, Routes} from "react-router-dom";
import {LoginPage, SignupPage} from "../pages";

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={<LoginPage />}/>
            <Route path="register" element={<SignupPage />}/>

            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}

export default AuthRoutes;