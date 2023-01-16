import {useState} from "react";
import {IconButton, MenuItem, Select, SelectChangeEvent, TableCell, TableRow} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {Delete, Download, Edit, Save, Visibility} from "@mui/icons-material";
import {useForm} from "../../hooks/useForm";
import {ConditionalTextField} from "./ConditionalTextField";
import {QrCode} from "../interfaces";

export const QrCodeRow = ({
           qrCodeRow,
           handleOpenSubTable,
           open
}:{ qrCodeRow: QrCode, handleOpenSubTable: Function, open: boolean }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [isEnable, setIsEnable] = useState<boolean>(qrCodeRow.enabled);

    const {formState, onInputChange} = useForm(qrCodeRow);
    const {name, registries, date} = formState;

    const onSelectChange = (event: SelectChangeEvent) => {
        if (event.target.value === 'YES') return setIsEnable(true);
        setIsEnable(false);
    }

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleSave = () => {
        setIsEditing(false);
    }

    const handleDelete = () => {
        console.log('delete');
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
                <ConditionalTextField name="name" value={name} onChange={onInputChange} condition={isEditing}/>
            </TableCell>
            <TableCell align="center">
                <ConditionalTextField
                    name="registries"
                    value={registries}
                    onChange={onInputChange}
                    condition={isEditing}
                    styles={{width: '100px'}}
                />
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
                <IconButton onClick={handleDelete}>
                    <Visibility/>
                </IconButton>
                <IconButton onClick={handleDelete}>
                    <Download/>
                </IconButton>
                {
                    isEditing
                        ? <IconButton onClick={handleSave}><Save/></IconButton>
                        : <IconButton onClick={handleEdit}><Edit/></IconButton>
                }
                <IconButton onClick={handleDelete}>
                    <Delete/>
                </IconButton>
            </TableCell>
        </TableRow>
    )
}