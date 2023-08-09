import {useSelector} from "react-redux";
import {login, logout, selectAuth} from "../store/auth";
import {useAppDispatch} from "../store";
import {useEffect} from "react";
import {qrAttendanceApi} from "../api/qrAttendanceApi";

export const useCheckAuth = () => {

    const { status } = useSelector(selectAuth);
    const dispatch = useAppDispatch();

    useEffect(() => {

        qrAttendanceApi.get("/auth/authenticated", {
            withCredentials: true
        }).then((response) => {

            const { user } = response.data;

            if (!user) {
                return dispatch(logout(null));
            }

            const { id, name, email } = user;
            dispatch(login({
                uid: id,
                displayName: name,
                email: email,
            }));
        }).catch(() => {
            dispatch(logout(null));
        });

    }, []);

    return status;
}
