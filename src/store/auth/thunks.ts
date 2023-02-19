import {AppThunk} from "../store";
import {checkingCredentials, login, logout} from "./authSlice";
import {qrAttendanceApi} from "../../api/qrAttendanceApi";
import {setGroups, setQrCodes, setRegistries} from "../qrAttendance";

export const startCreatingUser = ({name, email, lastname, password}: {name: string, email: string, lastname: string, password: string}): AppThunk => {
    return async (dispatch) => {
        // async code here
        dispatch(checkingCredentials());

        try {
            await qrAttendanceApi.post('/auth/register', {
                name,
                email,
                lastname,
                password
            });

            const response = await qrAttendanceApi.post('/auth/login', {
                email,
                password
            });

            const { body: user } = response.data;

            // sync code here
            dispatch(login({
                uid: user.id,
                displayName: user.name,
                email: user.email,
            }));
        } catch (error: any) {
            dispatch(logout(null));
        }
    }
}

export const startLogin = (email: string, password: string): AppThunk => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        try {
            const response = await qrAttendanceApi.post('/auth/login', {
                email,
                password
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const { body: user } = response.data;
            

            dispatch(login({
                uid: user.id,
                displayName: user.name,
                email: user.email,
            }));

        } catch (error: any) {
            dispatch(logout(null));
        }
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

        dispatch(logout(null));
        dispatch(setGroups([]));
        dispatch(setQrCodes([]));
        dispatch(setRegistries([]));
    }
}
