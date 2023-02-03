import {AppThunk} from "../store";
import {FormType} from "../../checkInForm/types/formType";

export const startSubmitCheckInForm = ({ io, name, firstSurname, secondSurname, formId }: FormType): AppThunk => {
    return (dispatch) => {
        io.emit('register-attendance', { name, firstSurname, secondSurname, formId });
    }
}
