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

import {useState} from "react";
import {RegistryRow} from "../components/RegistryRow";

import {QrCodeRow} from "../components/QrCodeRow";
import {QrCode} from "../interfaces";
import {TitleRow} from "../components/TitleRow";
import {useSelector} from "react-redux";
import {selectQrAttendance} from "../../store/qrAttendance";

const createData = (
    name: string,
    registries: number,
    date: string,
    enabled: boolean,
    id: string,
) => {
    return {
        name,
        registries,
        date,
        enabled,
        id,
        history: [
            {
                id: 'jasjajs',
                date: '2020-01-05',
                name: 'Limbert Otoniel',
                sourname: 'May',
                lastname: 'Ek'
            },
            {
                id: '19394',
                date: '2020-01-02',
                name: 'Josue',
                sourname: 'Manuel',
                lastname: 'Hau'
            },
        ],
    };
}

const Row = (props: { row: QrCode }) => {

    const { row } = props;
    const [open, setOpen] = useState(false);

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
                                        <TableCell align="center">Sourname</TableCell>
                                        <TableCell align="center">Lastname</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
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

const rows = [
    createData('Virtual session', 10, '2023-05-12',true, 'nfjsd3454'),
    createData('face-to-face session', 5, '2022-01-12',false, '2n4n3k3')
];

export const GroupViewTable = () => {

    const { active: group } = useSelector(selectQrAttendance);

    if (!group) return null;

    const { qrCodes } = group;

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TitleRow group={group} />
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
                    {qrCodes.map((qrCode) => (
                        <Row key={qrCode.id} row={qrCode} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
