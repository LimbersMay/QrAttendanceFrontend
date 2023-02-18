import React, {useState} from "react";

import {
    TableCell,
    IconButton,
    TableRow, MenuItem, Select, SelectChangeEvent
} from "@mui/material";
import {Save} from "@mui/icons-material";

import {useForm} from "../../../hooks/useForm";
import {ConditionalTextField} from "../ConditionalTextField";
import {Registry} from "../../interfaces";
import {useAppDispatch} from "../../../store";
import {startDeleteRegistry, startUpdateRegistry} from "../../../store/qrAttendance";
import {RegistryRowMenuOptions} from "./RegistryMenuOptions";
import {RegistryDatePicker} from "./RegistryDatePicker";
import dayjs from "dayjs";

export const RegistryRow = ({registryRow}: { registryRow: Registry }) => {

    const dispatch = useAppDispatch();

    const [isRowEditing, setIsRowEditing] = useState(false);
    const {formState, onInputChange} = useForm(registryRow);

    const {name, group, firstSurname, secondSurname} = formState;

    const [date, setDate] = useState<string>(registryRow.checkinTime);
    const [career, setCareer] = useState<string>(registryRow.career);

    const handleEdit = () => {
        setIsRowEditing(true);
    }

    const onChangeDate = (date: string) => {
        setDate(date);
    }

    const onSelectChange = (event: SelectChangeEvent) => {
        setCareer(event.target.value);
    }

    const handleSave = () => {
        dispatch(startUpdateRegistry({
            ...registryRow,
            ...formState,
            checkinTime: date,
            career: career
        }));

        setIsRowEditing(false);
    }

    const handleDelete = () => {
        dispatch(startDeleteRegistry(registryRow.id));
    }

    return (
        <TableRow>
            <TableCell component="th" scope="row">

                {
                    isRowEditing
                        ? <RegistryDatePicker date={date} onChangeDate={onChangeDate}/>
                        : dayjs(date).format('MMMM D, YYYY h:mm A')
                }

            </TableCell>
            <TableCell align="center">
                <ConditionalTextField
                    name="group"
                    value={group}
                    onChange={onInputChange}
                    condition={isRowEditing}
                />
            </TableCell>
            <TableCell align="center">
                {
                    isRowEditing
                        ? <Select fullWidth variant={'outlined'} value={career} onChange={onSelectChange}>
                            <MenuItem value="Computer Systems Engineering">Computer Systems Engineering</MenuItem>
                            <MenuItem value="Civil Engineering">Civil Engineering</MenuItem>
                            <MenuItem value="Environmental Engineering">Environmental Engineering</MenuItem>
                            <MenuItem value="Industrial Engineering">Industrial Engineering</MenuItem>
                            <MenuItem value="Engineering in Administration">Engineering in Administration</MenuItem>
                            <MenuItem value="Bussines Management Engineering">Bussines Management Engineering</MenuItem>
                        </Select>
                        : career
                }
            </TableCell>
            <TableCell align="center" sx={{display: {xs: 'none', sm: 'table-cell'}}}>
                <ConditionalTextField
                    name="firstSurname"
                    value={firstSurname}
                    onChange={onInputChange}
                    condition={isRowEditing}
                    styles={{width: '100px'}}
                />
            </TableCell>
            <TableCell align="center" sx={{display: {xs: 'none', sm: 'table-cell'}}}>
                <ConditionalTextField
                    name="secondSurname"
                    value={secondSurname}
                    onChange={onInputChange}
                    condition={isRowEditing}
                    styles={{width: '90px'}}
                />
            </TableCell>
            <TableCell align="center">
                <ConditionalTextField
                    name="name"
                    value={name}
                    onChange={onInputChange}
                    condition={isRowEditing}
                />
            </TableCell>
            <TableCell align="center" sx={{display: {xs: 'none', sm: 'table-cell'}}}>
                {
                    isRowEditing
                        ? <IconButton onClick={handleSave}>
                            <Save/>
                        </IconButton>
                        : <RegistryRowMenuOptions
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                }
            </TableCell>
        </TableRow>
    )
}