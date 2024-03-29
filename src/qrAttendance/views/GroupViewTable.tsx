import * as React from 'react';
import {
    Box,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper
} from '@mui/material';

import {useMemo, useState} from "react";
import {RegistryRow} from "../components/RegistryRow/RegistryRow";

import {QrCodeRow} from "../components/qrCodeRow/QrCodeRow";
import {QrCode} from "../interfaces";
import {TitleRow} from "../components/titleRow/TitleRow";
import {useSelector} from "react-redux";
import {selectRegistry} from "../../store/qrAttendance";
import {useGroupStore} from "../../hooks/useGroupStore";
import {useQrCodeStore} from "../../hooks/useQrCodeStore";

const Row = (props: { row: QrCode }) => {

    const { row } = props;
    const [open, setOpen] = useState(false);

    const { registries } = useSelector(selectRegistry);

    // Get the registries of the current qr code
    const qrCodeRegistries = useMemo(() => {
        return registries.filter(registry => registry.qrCodeId === row.id);
    }, [registries, row.id]);

    const handleOpenSubTable = () => {
        setOpen(!open);
    }

    return (
        <>
            <QrCodeRow qrCodeRow={row}
                       handleOpenSubTable={handleOpenSubTable}
                       open={open}
                       registries={qrCodeRegistries}
            />
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Registries
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell align="center">Group</TableCell>
                                        <TableCell align="center">Career</TableCell>
                                        <TableCell align="center" sx={{display: {xs: 'none', sm: 'table-cell'}}}>First surname</TableCell>
                                        <TableCell align="center" sx={{display: {xs: 'none', sm: 'table-cell'}}}>Second surname</TableCell>
                                        <TableCell align="center">Name(s)</TableCell>
                                        <TableCell align="center" sx={{display: {xs: 'none', sm: 'table-cell'}}}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {qrCodeRegistries.map((historyRow) => (
                                        <RegistryRow key={historyRow.id} registryRow={historyRow} />
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

export const GroupViewTable = () => {

    const { active: group } = useGroupStore();
    const { qrCodes } = useQrCodeStore();

    if (!group) return null;

    // Get all QrCodes from the group
    const groupQrCodes = useMemo(() => {
        return qrCodes.filter(qrCode => qrCode.groupId === group.id);
    }, [qrCodes, group.id]);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TitleRow group={group} qrCodes={groupQrCodes} />
                    <TableRow>
                        <TableCell />
                        <TableCell>QR Code name</TableCell>
                        <TableCell align="center">Registries</TableCell>
                        <TableCell align="center" sx={{display: {xs: 'none', sm: 'table-cell'}}}>Date</TableCell>
                        <TableCell align="center">Enabled</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {groupQrCodes.map((qrCode) => (
                        <Row key={qrCode.id} row={qrCode} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
