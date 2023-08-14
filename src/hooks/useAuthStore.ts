import {useAppDispatch, useAppSelector} from "../store";
import {checkingCredentials, login, logout, selectAuth} from "../store/auth";
import {qrAttendanceApi} from "../api/qrAttendanceApi";
import {onSetActiveGroup, setGroups, setQrCodes, setRegistries} from "../store/qrAttendance";

export interface CreatingUserProps {
    name: string;
    email: string;
    lastname: string;
    password: string;
}

export const useAuthStore = () => {

    const dispatch = useAppDispatch();
    const { displayName, errorMessage, status } = useAppSelector(selectAuth);

    const startCreatingUser = async ({name, email, lastname, password}: CreatingUserProps) => {
        // async code here
        dispatch(checkingCredentials());

        try {

            // 1. First, create the user
            await qrAttendanceApi.post('/auth/register', {
                name,
                email,
                lastname,
                password
            });

            // 2. Then, login the user
            const response = await qrAttendanceApi.post('/auth/login', {
                email,
                password
            });

            const { user } = response.data;

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

    const startLogin = async (email: string, password: string) => {
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

            const { user } = response.data;

            dispatch(login({
                uid: user.id,
                displayName: user.name,
                email: user.email,
            }));

        } catch (error: any) {
            dispatch(logout(null));
        }
    }

    const startLogout = async () => {
        await qrAttendanceApi.post('/auth/logout', {}, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        dispatch(logout(null));
        dispatch(onSetActiveGroup(null));
        dispatch(setGroups([]));
        dispatch(setQrCodes([]));
        dispatch(setRegistries([]));
    }

    return {
        // properties
        displayName,
        errorMessage,
        status,

        // methods
        startCreatingUser,
        startLogin,
        startLogout
    }
}