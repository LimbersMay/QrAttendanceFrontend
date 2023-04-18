import {useAppDispatch, useAppSelector} from "../store";
import {checkingCredentials, login, logout, selectAuth} from "../store/auth";
import {qrAttendanceApi} from "../api/qrAttendanceApi";
import {onSetActiveGroup, setGroups, setQrCodes, setRegistries} from "../store/qrAttendance";

interface CreatingUserProps {
    name: string;
    email: string;
    lastname: string;
    password: string;
}

export const useAuthSlice = () => {

    const dispatch = useAppDispatch();
    const { displayName } = useAppSelector(selectAuth);

    const startCreatingUser = async ({name, email, lastname, password}: CreatingUserProps) => {
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

        // methods
        startCreatingUser,
        startLogin,
        startLogout
    }
}