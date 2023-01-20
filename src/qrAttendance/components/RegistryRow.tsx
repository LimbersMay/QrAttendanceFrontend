import {useState} from "react";

import {
    TableCell,
    IconButton,
    TableRow
} from "@mui/material";
import {Delete, Edit, Save} from "@mui/icons-material";

import {useForm} from "../../hooks/useForm";
import {ConditionalTextField} from "./ConditionalTextField";
import {Registry} from "../interfaces";
import {useAppDispatch} from "../../store";
import {startDeleteRegistry, startUpdateRegistry} from "../../store/qrAttendance";

export const RegistryRow = ({registryRow }: { registryRow: Registry}) => {

    const dispatch = useAppDispatch();

    const [isRowEditing, setIsRowEditing] = useState(false);
    const {formState, onInputChange} = useForm(registryRow);

    const { name, sourname, lastname, date } = formState;

    const handleEdit = () => {
        setIsRowEditing(true);
    }

    const handleSave = () => {
        dispatch(startUpdateRegistry({
            ...registryRow,
            ...formState
        }));
        setIsRowEditing(false);
    }

    const handleDelete = () => {
        dispatch(startDeleteRegistry(registryRow.id));
    }

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                <ConditionalTextField
                    name="date"
                    value={date}
                    onChange={onInputChange}
                    condition={isRowEditing}
                />
            </TableCell>
            <TableCell>
                <ConditionalTextField
                    name="name"
                    value={name}
                    onChange={onInputChange}
                    condition={isRowEditing}
                />
            </TableCell>
            <TableCell align="center">
                <ConditionalTextField
                    name="sourname"
                    value={sourname}
                    onChange={onInputChange}
                    condition={isRowEditing}
                    styles={{width: '100px'}}
                />
            </TableCell>
            <TableCell align="center">
                <ConditionalTextField
                    name="lastname"
                    value={lastname}
                    onChange={onInputChange}
                    condition={isRowEditing}
                    styles={{width: '90px'}}
                />
            </TableCell>
            <TableCell align="center">
                {
                    isRowEditing
                        ? <IconButton onClick={handleSave}><Save/></IconButton>
                        : <IconButton onClick={handleEdit}><Edit /></IconButton>
                }
                <IconButton onClick={handleDelete}>
                    <Delete />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}