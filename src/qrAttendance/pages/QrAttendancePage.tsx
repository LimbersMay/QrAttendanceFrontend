import {useSelector} from "react-redux";
import {QrAttendanceLayout} from "../layout/QrAttendanceLayout";

import {GroupViewTable, NothingSelectedView} from "../views";
import {selectGroup, startLoadingGroups} from "../../store/qrAttendance";
import {useEffect} from "react";
import {useAppDispatch} from "../../store";

export const QrAttendancePage = () => {

    const dispatch = useAppDispatch();

    const { active } =  useSelector(selectGroup);

    // Una vez iniciado sesión, cargamos la información adicional del usuario
    useEffect(() => {
        dispatch(startLoadingGroups());
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
