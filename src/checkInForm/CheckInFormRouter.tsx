import {Route, Routes} from "react-router-dom";
import {CheckInFormPage} from "./pages/CheckInFormPage";

export const CheckInFormRouter = () => {
    return (
        <Routes>

            <Route path={"/:formId"} element={<CheckInFormPage />}/>
            <Route path={"/*"} element={<CheckInFormPage />}/>
        </Routes>
    )
}
