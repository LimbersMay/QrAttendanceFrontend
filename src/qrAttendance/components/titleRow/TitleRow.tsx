import React, {useMemo, useState} from "react";

import {IconButton, TableCell, tableCellClasses, TableRow, TextField, Tooltip} from "@mui/material";
import {AddOutlined, SearchOutlined, EditOutlined, DeleteOutlined} from "@mui/icons-material";
import {useForm} from "../../../hooks/useForm";

import {Group, QrCode} from "../../interfaces";
import ConfirmDialog from "./ConfirmDialog";
import {SnackbarUtilities} from "../../../utilities/snackbar-manager";
import {useQrAttendanceSlice} from "../../../hooks/useQrAttendanceSlice";
import {useQrCodeSlice} from "../../../hooks/useQrCodeSlice";
import {useUiSlice} from "../../../hooks/useUiSlice";
import {TitleModal} from "./TitleModal";

export const TitleRow = React.memo(({group, qrCodes}: { group: Group, qrCodes: QrCode[] }) => {

    const initialStateForm = useMemo(() => ({
        groupTitle: group.name,
    }), [group]);

    const { toggleTitleModal } = useUiSlice();
    const {handleStartNewQrCode} = useQrCodeSlice();
    const {deleteGroupWithDependencies} = useQrAttendanceSlice();

    const {formState} = useForm(initialStateForm);
    const [isTryingToDelete, setIsTryingToDelete] = useState<boolean>(false);

    const {groupTitle} = formState;

    const handleToggleDeleteDialog = () => {
        setIsTryingToDelete(!isTryingToDelete);
    }

    const handleDeleteRow = () => {
        deleteGroupWithDependencies(group.id, qrCodes);
        SnackbarUtilities.sucess(`Group deleted successfully`);
    }

    const handleAddEmptyRow = () => {
        handleStartNewQrCode();
    }

    return (
        <>
            <TableRow
                sx={{
                    [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none"
                    }
                }}
            >
                <TableCell/>
                <TableCell
                    sx={{
                        fontSize: "1.4rem",
                    }}
                    colSpan={2}
                >
                    { groupTitle }
                </TableCell>

                <TableCell
                    align="right"
                    colSpan={2}
                >
                    <TextField
                        // extra small(xs): none
                        // small(sm): table-cell
                        sx={{display: {xs: 'none', sm: 'inline-block'}}}
                        id="outlined-search"
                        label="Search"
                        type="search"
                        variant="outlined"
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <IconButton>
                                    <SearchOutlined/>
                                </IconButton>
                            )
                        }}
                    />
                    <Tooltip title={'Add new qr code'}>
                        <IconButton onClick={handleAddEmptyRow}>
                            <AddOutlined/>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title={'Edit title'}><IconButton onClick={toggleTitleModal}> <EditOutlined/>
                    </IconButton></Tooltip>

                    <Tooltip title={'Delete group'}>
                        <IconButton onClick={handleToggleDeleteDialog}>
                            <DeleteOutlined/>
                        </IconButton>
                    </Tooltip>

                    {
                        isTryingToDelete &&
                        <ConfirmDialog onConfirm={handleDeleteRow} onCancel={handleToggleDeleteDialog}/>
                    }

                </TableCell>
            </TableRow>

            <TitleModal/>
        </>
    )
});