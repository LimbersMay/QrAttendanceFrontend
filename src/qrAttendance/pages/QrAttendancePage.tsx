import {QrAttendanceLayout} from "../layout/QrAttendanceLayout";
import {NothingSelectedView} from "../views";
import {IconButton} from "@mui/material";
import {AddOutlined} from "@mui/icons-material";
import {NoteView} from "../views/NoteView";

export const QrAttendancePage = () => {

    // const dispatch = useDispatch();
    // const { isSaving, active } =  useSelector(state => state.journal);
    //
    // const onClickNewNote = () => {
    //     dispatch(startNewNote());
    // }

    return (
        <QrAttendanceLayout>
            { /*<Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum commodo nisl sit amet nulla accumsan dapibus. Nulla imperdiet sapien eget lorem condimentum accumsan. Duis volutpat sem ultricies imperdiet commodo. Vivamus vitae vehicula nibh. Nam sodales nisl sit amet odio aliquet, quis efficitur arcu vehicula. Curabitur molestie sagittis odio in fringilla. Duis molestie, libero id euismod pretium, mauris augue euismod ligula, id sagittis dolor ipsum eu libero. Nullam condimentum leo ipsum, a molestie enim venenatis in. Suspendisse potenti. Ut malesuada finibus molestie. Nunc faucibus ligula purus, ac gravida nunc varius eu. Donec in justo et lacus blandit dignissim quis id libero. Sed turpis libero, gravida a efficitur eget, aliquet at eros. Ut laoreet tempor viverra. Curabitur vestibulum justo at sem vehicula iaculis. Fusce ipsum purus, ultricies sodales erat id, auctor semper lectus.</Typography> */}

            {/*<NothingSelectedView />*/}
            {/*<NoteView.tsx />*/}
            <NoteView />

            {/*{*/}
            {/*    (!!active)*/}
            {/*        ? <NoteView.tsx />*/}
            {/*        : <NothingSelectedView />*/}
            {/*}*/}

            <IconButton
                //onClick={onClickNewNote}
                //disabled={isSaving}
                size='large'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': {backgroundColor: 'error.main', opacity: 0.9},
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}
            >
                <AddOutlined sx={{
                    fontSize: 30
                }}/>
            </IconButton>

        </QrAttendanceLayout>
    )
}
