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
import {RegistryRow} from "../components/RegistryRow";

import {QrCodeRow} from "../components/QrCodeRow";
import {QrCode} from "../interfaces";
import {TitleRow} from "../components/TitleRow";
import {useSelector} from "react-redux";
import {selectGroup, selectQrCode, selectRegistry} from "../../store/qrAttendance";

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
            <QrCodeRow qrCodeRow={row} handleOpenSubTable={handleOpenSubTable} open={open}/>
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
                                        <TableCell>Name(s)</TableCell>
                                        <TableCell align="center">First surname</TableCell>
                                        <TableCell align="center">Second surname</TableCell>
                                        <TableCell align="center">Actions</TableCell>
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

    const { active: group } = useSelector(selectGroup);
    const { qrCodes } = useSelector(selectQrCode);

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
                        <TableCell>QrCode name</TableCell>
                        <TableCell align="center">Registries</TableCell>
                        <TableCell align="center">Date</TableCell>
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
