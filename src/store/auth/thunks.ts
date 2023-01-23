import {AppThunk} from "../store";
import {checkingCredentials, login, logout} from "./authSlice";
import {qrAttendanceApi} from "../../api/qrAttendanceApi";

export const startCreatingUser = ({name, email, sourname, lastname, password}: {name: string, email: string, sourname: string, lastname: string, password: string}): AppThunk => {
    return async (dispatch) => {
        // async code here
        dispatch(checkingCredentials());

        const response = await qrAttendanceApi.post('/user/register', {
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

        const response = await qrAttendanceApi.post('/auth/login-local', {
            email,
            password
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        dispatch(login({
            uid: response.data.user.id,
            displayName: response.data.user.name,
            email: response.data.user.email,
        }))
    }
}

export const startLogout = (): AppThunk => {
    return async(dispatch) => {
        await qrAttendanceApi.post('/auth/logout', {}, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('LOGING OUT');

        dispatch(logout(null));
    }
}
