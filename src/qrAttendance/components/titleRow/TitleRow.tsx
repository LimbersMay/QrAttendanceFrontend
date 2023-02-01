import React, {useMemo, useState} from "react";

import {IconButton, TableCell, tableCellClasses, TableRow, TextField, Tooltip} from "@mui/material";
import {AddOutlined, SearchOutlined, EditOutlined, SaveOutlined, DeleteOutlined} from "@mui/icons-material";
import {useForm} from "../../../hooks/useForm";

import {ConditionalTextField} from "../ConditionalTextField";
import {Group, QrCode} from "../../interfaces";
import {useAppDispatch} from "../../../store";
import {
    startDeleteGroupWithDependencies,
    startNewQrCode,
    startUpdateGroup
} from "../../../store/qrAttendance";
import ConfirmDialog from "./ConfirmDialog";
import {SnackbarUtilities} from "../../../utilities/snackbar-manager";

export const TitleRow = React.memo(({ group, qrCodes }: {group: Group, qrCodes: QrCode[]}) => {

    const initialStateForm = useMemo(() => ({
        groupTitle: group.name,
    }), [group]);

    const dispatch = useAppDispatch();

    const { formState, onInputChange } = useForm(initialStateForm);

    const [isRowEditing, setIsRowEditing] = useState<boolean>(false);
    const [isTryingToDelete, setIsTryingToDelete] = useState<boolean>(false);

    const { groupTitle } = formState;

    const handleEditRow = () => {
        setIsRowEditing(true);
    }

    const handleToggleDeleteDialog = () => {
        setIsTryingToDelete(!isTryingToDelete);
    }

    const handleSaveRow = () => {
        setIsRowEditing(false);
        dispatch(startUpdateGroup({ ...group, name: groupTitle}));
    }

    const handleDeleteRow = () => {
        dispatch(startDeleteGroupWithDependencies(group.id, qrCodes));
        SnackbarUtilities.sucess(`Group deleted successfully`);
    }

    const handleAddEmptyRow = () => {
        dispatch(startNewQrCode(group.id));
    }

    return (
        <TableRow
            sx={{
                [`& .${tableCellClasses.root}`]: {
                    borderBottom: "none"
                }
            }}
        >
            <TableCell />
            <TableCell
                sx={{
                    // TODO: Make this cell look like a title
                    fontSize: "1.4rem",
                }}
                colSpan={2}
            >
                <ConditionalTextField
                    onChange={onInputChange}
                    condition={isRowEditing}
                    name={"groupTitle"}
                    value={groupTitle}
                />
            </TableCell>

            {/* TODO: Add a search field */}
            <TableCell align="right" colSpan={2}>
                <TextField
                    id="outlined-search"
                    label="Search"
                    type="search"
                    variant="outlined"
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <IconButton>
                                <SearchOutlined />
                            </IconButton>
                        )
                    }}
                />
                <Tooltip title={'Add new qr code'} >
                    <IconButton onClick={handleAddEmptyRow}>
                        <AddOutlined/>
                    </IconButton>
                </Tooltip>

                {
                    isRowEditing
                     ? <IconButton onClick={handleSaveRow}> <SaveOutlined /> </IconButton>
                     : <Tooltip title={'Edit title'} ><IconButton onClick={handleEditRow}> <EditOutlined /> </IconButton></Tooltip>
                }
                <Tooltip title={'Delete group'}>
                    <IconButton onClick={handleToggleDeleteDialog}>
                        <DeleteOutlined/>
                    </IconButton>
                </Tooltip>

                {
                    isTryingToDelete && <ConfirmDialog onConfirm={handleDeleteRow} onCancel={handleToggleDeleteDialog} />
                }

            </TableCell>

        </TableRow>
    )
});