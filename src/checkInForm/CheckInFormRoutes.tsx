import {Route, Routes} from "react-router-dom";
import {CheckInFormPage} from "./pages/CheckInFormPage";

export const CheckInFormRoutes = () => {
    return (
        <Routes>

            <Route path={"/:formId"} element={<CheckInFormPage />}/>
            <Route path={"/*"} element={<CheckInFormPage />}/>
        </Routes>
    )
}

export default CheckInFormRoutes;
