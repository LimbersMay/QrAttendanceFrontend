import {useSelector} from "react-redux";
import {QrAttendanceLayout} from "../layout/QrAttendanceLayout";

import {GroupViewTable, NothingSelectedView} from "../views";
import {selectGroup, startLoadingGroups, startLoadingQrCodes, startLoadingRegistries} from "../../store/qrAttendance";
import {useEffect} from "react";
import {useAppDispatch} from "../../store";
import {startConnectWebSocket} from "../../store/websockets/thunks";
import socket from "../../utilities/socketIo";

export const QrAttendancePage = () => {

    const dispatch = useAppDispatch();

    const { active } =  useSelector(selectGroup);

    // Una vez iniciado sesión, cargamos la información adicional del usuario
    useEffect(() => {
        dispatch(startLoadingGroups());
        dispatch(startLoadingQrCodes());
        dispatch(startLoadingRegistries())
        dispatch(startConnectWebSocket(socket));
    }, []);

    return (
        <QrAttendanceLayout>

            {
                (!!active)
                    ? <GroupViewTable />
                    : <NothingSelectedView />
            }

        </QrAttendanceLayout>
    )
}
