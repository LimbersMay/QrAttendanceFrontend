import {memo} from "react";

import dayjs from "dayjs";
import {IconButton, TableCell, TableRow} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {QrCode, Registry} from "../../interfaces";
import {QrCodeMenuOptions} from "./QrCodeMenuOptions";
import {QrCheckIn} from "./QrCheckIn";
import {generateExcelFromRegistries} from "../../helpers/generateExcelFromRegistries";

export const QrCodeRow = memo(({
                                   qrCodeRow,
                                   handleOpenSubTable,
                                   open,
                                   registries
                               }: { qrCodeRow: QrCode, handleOpenSubTable: Function, open: boolean, registries: Registry[] }) => {


    const { name, date, enabled } = qrCodeRow;

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
                {name}
            </TableCell>
            <TableCell align="center">
                {registries.length}
            </TableCell>
            <TableCell align="center" sx={{display: {xs: 'none', sm: 'table-cell'}}}>
                {dayjs(date).format('DD/MM/YYYY')}
            </TableCell>
            <TableCell align="center">
                {enabled ? 'YES' : 'NO'}
            </TableCell>
            <TableCell align="center">
                <QrCodeMenuOptions
                    handleDownload={handleDownload}
                    qrCode={qrCodeRow}
                />
            </TableCell>

            <QrCheckIn/>
        </TableRow>
    )
});