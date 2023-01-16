import * as React from 'react';
import {
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    MenuItem,
    Select,
    SelectChangeEvent
} from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import {
    DeleteOutline,
    Delete,
    EditOutlined,
    Save,
    Edit,
    DownloadOutlined,
    Download,
    VisibilityOutlined,
    Visibility
} from '@mui/icons-material';
import {useState} from "react";
import {TextField} from "@mui/material";
import {useForm} from "../../hooks/useForm";
import {Registry} from "../components/Registry";

interface registry {
    date: string,
    name: string,
    sourname: string,
    lastname: string
}

interface QrCode {
    name: string,
    registries: number,
    date: string,
    enabled: boolean,
    history: registry[]
}

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

const Row = (props: { row: ReturnType<typeof createData> }) => {

    const { row } = props;
    const [open, setOpen] = useState(false);

    const [ isEditing, setIsEditing ] = useState(false);
    const [ registryEditId, setRegistryEditId ] = useState('');

    const initialForm = {
        name: row.name,
        registries: row.registries,
        date: row.date,
        enabled: false,
        id: ''
    }

    const { formState: qrCodeFormState, onInputChange } = useForm(initialForm);
    const { name, registries, date } = qrCodeFormState;

    const [isEnable, setIsEnable] = useState<boolean>(row.enabled);

    const onSelectChange = (event: SelectChangeEvent) => {

        const { value } = event.target;

        if (value === 'YES') return setIsEnable(true);

        setIsEnable(false);
    }

    const handleQrSave = () => {
        setIsEditing(false);
    }

    const handleQrDelete = (row: ReturnType<typeof createData>) => {

    }

    const handleQrEdit = (row: ReturnType<typeof createData>) => {
        setIsEditing(true);
    }

    const handleRegistrySave = (id: string) => {
        setRegistryEditId('');
    }

    const handleRegistryEdit = (registryId: string) => {
        setRegistryEditId(registryId);
    }

    const isEnabled = (enabled: boolean): string => {
        return enabled ? 'YES' : 'NO';
    }

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {
                        isEditing
                            ? <TextField name="name" onChange={onInputChange} value={name}></TextField>
                            : name
                    }
                </TableCell>
                <TableCell align="center">
                    {
                        isEditing
                            ? <TextField sx={{width: '100px'}} name="registries" onChange={onInputChange} value={registries}></TextField>
                            : registries
                    }
                </TableCell>
                <TableCell align="center">
                    {
                        isEditing
                            ? <TextField sx={{width: '140px'}} onChange={onInputChange} name="date" value={date}></TextField>
                            : date
                    }
                </TableCell>
                <TableCell align="center">
                    {
                        isEditing
                            ? <Select value={isEnabled(isEnable)} onChange={onSelectChange}>
                                <MenuItem value="YES">Yes</MenuItem>
                                <MenuItem value="NO">No</MenuItem>
                              </Select>
                            : isEnabled(isEnable)
                    }
                </TableCell>
                <TableCell align="center">
                    <IconButton onClick={() => handleQrDelete(row)}>
                        <Visibility />
                    </IconButton>
                    <IconButton onClick={() => handleQrDelete(row)}>
                        <Download />
                    </IconButton>
                    {
                        isEditing
                            ? <IconButton onClick={handleQrSave}><Save /></IconButton>
                            : <IconButton onClick={() => handleQrEdit(row)}><Edit /></IconButton>
                    }
                    <IconButton onClick={() => handleQrDelete(row)}>
                        <Delete />
                    </IconButton>
                </TableCell>
            </TableRow>

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
                                        <TableCell>First name</TableCell>
                                        <TableCell align="center">Sourname</TableCell>
                                        <TableCell align="center">Lastname</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <Registry key={historyRow.id} registryRow={historyRow} />
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
    createData('face-to-face session', 5, '2022-01-12',false, '2n4n3k3'),
];

export const GroupViewTable = () => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
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
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
