import {useState} from "react";

import {
    TextField,
    TableCell,
    IconButton,
    TableRow
} from "@mui/material";
import {Delete, Edit, Save} from "@mui/icons-material";

import {useForm} from "../../hooks/useForm";

interface Registry {
    id: string,
    date: string,
    name: string,
    sourname: string,
    lastname: string
}

export const Registry = ({registryRow }: { registryRow: Registry}) => {

    const [isRowEditing, setIsRowEditing] = useState(false);
    const {formState, onInputChange} = useForm(registryRow);

    const { name, sourname, lastname, date } = formState;

    const handleEdit = () => {
        setIsRowEditing(true);
    }

    const handleSave = () => {
        setIsRowEditing(false);
    }

    const handleDelete = () => {
        console.log('delete');
    }

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                {
                    isRowEditing
                        ? <TextField sx={{width: '140px'}} onChange={onInputChange} name="date" value={date}></TextField>
                        : date
                }
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell align="center">{sourname}</TableCell>
            <TableCell align="center">
                { lastname}
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