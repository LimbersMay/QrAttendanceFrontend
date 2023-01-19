import {useSelector} from "react-redux";
import {QrAttendanceLayout} from "../layout/QrAttendanceLayout";

import {GroupViewTable, NothingSelectedView} from "../views";
import {selectQrAttendance} from "../../store/qrAttendance";

export const QrAttendancePage = () => {

    const { active } =  useSelector(selectQrAttendance);

    return (
        <QrAttendanceLayout>
            { /*<Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum commodo nisl sit amet nulla accumsan dapibus. Nulla imperdiet sapien eget lorem condimentum accumsan. Duis volutpat sem ultricies imperdiet commodo. Vivamus vitae vehicula nibh. Nam sodales nisl sit amet odio aliquet, quis efficitur arcu vehicula. Curabitur molestie sagittis odio in fringilla. Duis molestie, libero id euismod pretium, mauris augue euismod ligula, id sagittis dolor ipsum eu libero. Nullam condimentum leo ipsum, a molestie enim venenatis in. Suspendisse potenti. Ut malesuada finibus molestie. Nunc faucibus ligula purus, ac gravida nunc varius eu. Donec in justo et lacus blandit dignissim quis id libero. Sed turpis libero, gravida a efficitur eget, aliquet at eros. Ut laoreet tempor viverra. Curabitur vestibulum justo at sem vehicula iaculis. Fusce ipsum purus, ultricies sodales erat id, auctor semper lectus.</Typography> */}

            {/*<NothingSelectedView />*/}
            {/*<GroupViewTable/>*/}

            {
                (!!active)
                    ? <GroupViewTable />
                    : <NothingSelectedView />
            }

        </QrAttendanceLayout>
    )
}
