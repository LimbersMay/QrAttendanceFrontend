import {AppThunk} from "../store";
import {checkingCredentials, login} from "./authSlice";
import {qrAttendanceApi} from "../../api/qrAttendanceApi";

export const startCreatingUser = ({name, email, sourname, lastname, password}: {name: string, email: string, sourname: string, lastname: string, password: string}): AppThunk => {
    return async (dispatch, getState) => {
        // async code here
        dispatch(checkingCredentials());

        const response = await qrAttendanceApi.post('/api/user/register', {
            name,
            email,
            fathersName: sourname,
            mothersName: lastname,
            password
        });

        const { user } = response.data;

        // sync code here
        dispatch(login({
            uid: user.id,
            displayName: user.name,
            email: user.email,
        }));
    }
}

export const startLogin = (email: string, password: string): AppThunk => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const response = await qrAttendanceApi.post('/api/auth/login-local', {
            email,
            password
        });

        dispatch(login({
            uid: response.data.user.id,
            displayName: response.data.user.name,
            email: response.data.user.email,
        }))
    }
}
