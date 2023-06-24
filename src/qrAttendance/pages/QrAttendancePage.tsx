import {useEffect} from "react";
import {QrAttendanceLayout} from "../layout/QrAttendanceLayout";
import {GroupViewTable, NothingSelectedView} from "../views";
import {useAppDispatch} from "../../store";
import {startConnectWebSocket} from "../../store/websockets/thunks";
import socket from "../../utilities/socketIo";
import {useQrCodeStore} from "../../hooks/useQrCodeStore";
import {useGroupStore} from "../../hooks/useGroupStore";
import {useRegistryStore} from "../../hooks/useRegistryStore";

export const QrAttendancePage = () => {

    const dispatch = useAppDispatch();

    const { active } =  useGroupStore();
    const { startLoadingQrCodes } = useQrCodeStore();
    const { startLoadingGroups } = useGroupStore();
    const { startLoadingRegistries } = useRegistryStore();

    // If the user logs in, we load his information
    useEffect(() => {
        (async () => {
            await startLoadingGroups();
            await startLoadingQrCodes();
            await startLoadingRegistries();
            dispatch(startConnectWebSocket(socket));
        })()
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
