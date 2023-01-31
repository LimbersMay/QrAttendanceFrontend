import {useState} from "react";

import {IconButton, MenuItem, Select, SelectChangeEvent, TableCell, TableRow} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {Save} from "@mui/icons-material";

import {useForm} from "../../hooks/useForm";
import {ConditionalTextField} from "./ConditionalTextField";
import {QrCode} from "../interfaces";
import {useAppDispatch} from "../../store";
import { startDeleteQrCodeWithDependencies, startUpdateQrCode} from "../../store/qrAttendance";
import {QrCodeMenuOptions} from "./QrCodeMenuOptions";

export const QrCodeRow = ({
           qrCodeRow,
           handleOpenSubTable,
           open,
    registriesLength
}:{ qrCodeRow: QrCode, handleOpenSubTable: Function, open: boolean, registriesLength: number }) => {

    const dispatch = useAppDispatch();

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isEnable, setIsEnable] = useState<boolean>(qrCodeRow.enabled);

    const {formState, onInputChange} = useForm(qrCodeRow);
    const {name, date} = formState;

    const onSelectChange = (event: SelectChangeEvent) => {
        if (event.target.value === 'YES') return setIsEnable(true);
        setIsEnable(false);
    }

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleSave = () => {
        setIsEditing(false);
        dispatch(startUpdateQrCode({
            ...qrCodeRow,
            ...formState,
            enabled: isEnable
        }));
    }

    const handleDelete = () => {
        dispatch(startDeleteQrCodeWithDependencies(qrCodeRow.id));
    }

    const handleShow = () => {

    }

    const handleDownload = () => {

    }

    return (
        <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
            <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => handleOpenSubTable(!open)}
                >
                    {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
                <ConditionalTextField
                    name="name"
                    value={name}
                    onChange={onInputChange}
                    condition={isEditing}
                    styles={{width: '120px'}}
                />
            </TableCell>
            <TableCell align="center">
                {registriesLength}
            </TableCell>
            <TableCell align="center">
                <ConditionalTextField
                    name="date"
                    value={date}
                    onChange={onInputChange}
                    condition={isEditing}
                    styles={{width: '100px'}}
                />
            </TableCell>
            <TableCell align="center">
                {
                    isEditing
                        ? <Select variant={'standard'} value={isEnable ? 'YES' : 'NO'} onChange={onSelectChange}>
                            <MenuItem value="YES">Yes</MenuItem>
                            <MenuItem value="NO">No</MenuItem>
                        </Select>
                        : isEnable ? 'YES' : 'NO'
                }
            </TableCell>
            <TableCell align="center">
                {
                    isEditing
                        ? <IconButton onClick={handleSave}><Save/></IconButton>
                        : <QrCodeMenuOptions
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            handleShow={handleShow}
                            handleDownload={handleDownload}
                        />
                }

            </TableCell>
        </TableRow>
    )
}