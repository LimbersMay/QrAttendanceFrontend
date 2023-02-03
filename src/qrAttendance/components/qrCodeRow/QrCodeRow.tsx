import {useState} from "react";

import {IconButton, MenuItem, Select, SelectChangeEvent, TableCell, TableRow} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {Save} from "@mui/icons-material";

import {useForm} from "../../../hooks/useForm";
import {ConditionalTextField} from "../ConditionalTextField";
import {QrCode, Registry} from "../../interfaces";
import {useAppDispatch} from "../../../store";
import {startDeleteQrCodeWithDependencies, startUpdateQrCode} from "../../../store/qrAttendance";
import {QrCodeMenuOptions} from "./QrCodeMenuOptions";
import {SnackbarUtilities} from "../../../utilities/snackbar-manager";
import {QrCodeDatePicker} from "./QrCodeDatePicker";
import dayjs from "dayjs";
import {QrCheckIn} from "./QrCheckIn";
import {generateExcelFromRegistries} from "../../helpers/generateExcelFromRegistries";

export const QrCodeRow = ({
           qrCodeRow,
           handleOpenSubTable,
           open,
    registries
}:{ qrCodeRow: QrCode, handleOpenSubTable: Function, open: boolean, registries: Registry[] }) => {

    const dispatch = useAppDispatch();

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isQrShowing, setIsQrShowing] = useState<boolean>(false);

    const [isEnable, setIsEnable] = useState<boolean>(qrCodeRow.enabled);
    const [ date, setDate ] = useState<string>(qrCodeRow.date);

    const {formState, onInputChange} = useForm(qrCodeRow);
    const {name} = formState;

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
            enabled: isEnable,
            date: date
        }));
    }

    const handleDelete = () => {
        dispatch(startDeleteQrCodeWithDependencies(qrCodeRow.id));
        SnackbarUtilities.sucess(`QR Code ${qrCodeRow.name} deleted successfully`);
    }

    const handleToggleShowQr = () => {
        setIsQrShowing(!isQrShowing);
    }

    const handleDownload = () => {
        generateExcelFromRegistries(qrCodeRow.id, registries);
    }

    const onChangeDate = (date: string) => {
        setDate(date);
    }

    return (
        /* Rows of the table with QrCode components */
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
                {registries.length}
            </TableCell>
            <TableCell align="center">
                {
                    isEditing
                        ? <QrCodeDatePicker date={qrCodeRow.date} onChangeDate={onChangeDate}/>
                        : dayjs(date).format('DD/MM/YYYY')
                }
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
                            handleShow={handleToggleShowQr}
                            handleDownload={handleDownload}
                        />
                }
            </TableCell>

            {
                isQrShowing
                &&
                <QrCheckIn
                    isQrShowing={isQrShowing}
                    url={`${qrCodeRow.url}/${qrCodeRow.formId}`}
                    title={qrCodeRow.name}
                    handleToggleShowQr={handleToggleShowQr}
                />
            }

        </TableRow>
    )
}