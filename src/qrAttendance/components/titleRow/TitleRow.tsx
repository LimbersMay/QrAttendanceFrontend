import React, {memo, useState} from "react";
import {IconButton, TableCell, tableCellClasses, TableRow, TextField, Tooltip} from "@mui/material";
import {AddOutlined, SearchOutlined, EditOutlined, DeleteOutlined} from "@mui/icons-material";

import {Group, QrCode} from "../../interfaces";
import ConfirmDialog from "./ConfirmDialog";
import {SnackbarUtilities} from "../../../utilities/snackbar-manager";
import {TitleModal} from "./TitleModal";
import {QrCodeModal} from "../qrCodeRow/QrCodeModal";
import {useQrAttendanceStore, useUiStore} from "../../../hooks";

export const TitleRow = memo(({group, qrCodes}: { group: Group, qrCodes: QrCode[] }) => {

    const { toggleTitleModal, toggleQrCodeModal } = useUiStore();
    const {startDeleteGroupWithDependencies} = useQrAttendanceStore();

    const [isTryingToDelete, setIsTryingToDelete] = useState(false);

    const handleToggleDeleteDialog = () => {
        setIsTryingToDelete(!isTryingToDelete);
    }

    const handleDeleteRow = async () => {
        await startDeleteGroupWithDependencies(group.id, qrCodes);
        SnackbarUtilities.success(`Group deleted successfully`);
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
                    { group.name }
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
                    <Tooltip aria-label="addQrCodeButton" title={'Add new qr code'}>
                        <IconButton onClick={toggleQrCodeModal}>
                            <AddOutlined/>
                        </IconButton>
                    </Tooltip>

                    <Tooltip aria-label="editGroupButton" title={'Edit title'}><IconButton onClick={toggleTitleModal}> <EditOutlined/>
                    </IconButton></Tooltip>

                    <Tooltip aria-label="deleteGroupButton" title={'Delete group'}>
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
            <QrCodeModal />
        </>
    )
});