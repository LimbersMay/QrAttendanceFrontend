import {memo, useState} from "react";

import dayjs from "dayjs";
import {IconButton, TableCell, TableRow} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {QrCode, Registry} from "../../interfaces";
import {useAppDispatch} from "../../../store";
import {setActiveQrCode, startDeleteQrCodeWithDependencies} from "../../../store/qrAttendance";
import {QrCodeMenuOptions} from "./QrCodeMenuOptions";
import {SnackbarUtilities} from "../../../utilities/snackbar-manager";
import {QrCheckIn} from "./QrCheckIn";
import {generateExcelFromRegistries} from "../../helpers/generateExcelFromRegistries";
import {QrCodeModal} from "./QrCodeModal";
import {useUiSlice} from "../../../hooks/useUiSlice";

export const QrCodeRow = memo(({
           qrCodeRow,
           handleOpenSubTable,
           open,
    registries
}:{ qrCodeRow: QrCode, handleOpenSubTable: Function, open: boolean, registries: Registry[] }) => {

    const dispatch = useAppDispatch();

    const { openQrCodeModal } = useUiSlice();

    const [isQrShowing, setIsQrShowing] = useState<boolean>(false);

    const handleEdit = () => {
        openQrCodeModal()
        dispatch(setActiveQrCode(qrCodeRow));
    }

    const handleDelete = () => {
        dispatch(startDeleteQrCodeWithDependencies(qrCodeRow.id));
        SnackbarUtilities.sucess(`QR Code ${qrCodeRow.name} deleted successfully`);
    }

    const handleToggleShowQr = () => {
        setIsQrShowing(!isQrShowing);
    }

    const handleDownload = () => {
        generateExcelFromRegistries(qrCodeRow,registries);
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
                { qrCodeRow.name }
            </TableCell>
            <TableCell align="center">
                {registries.length}
            </TableCell>
            <TableCell align="center" sx={{display: {xs: 'none', sm: 'table-cell'}}}>
                { dayjs(qrCodeRow.date).format('DD/MM/YYYY') }
            </TableCell>
            <TableCell align="center">
                { qrCodeRow.enabled ? 'YES' : 'NO'}
            </TableCell>
            <TableCell align="center">
                {
                    <QrCodeMenuOptions
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

            <QrCodeModal/>

        </TableRow>
    )
});