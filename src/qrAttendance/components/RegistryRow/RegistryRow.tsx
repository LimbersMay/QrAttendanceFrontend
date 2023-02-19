import {
    TableCell,
    TableRow
} from "@mui/material";
import {Registry} from "../../interfaces";
import {RegistryRowMenuOptions} from "./RegistryMenuOptions";
import dayjs from "dayjs";
import {RegistryModal} from "./RegistryModal";

export const RegistryRow = ({registryRow}: { registryRow: Registry }) => {

    const {name, group, firstSurname, secondSurname, checkInTime, career} = registryRow;

    return (
        <TableRow>
            <TableCell component="th" scope="row">
                { dayjs(checkInTime).format('MMMM D, YYYY h:mm A') }
            </TableCell>
            <TableCell align="center">
                { group }
            </TableCell>
            <TableCell align="center">
                { career }
            </TableCell>
            <TableCell align="center" sx={{display: {xs: 'none', sm: 'table-cell'}}}>
                { firstSurname }
            </TableCell>
            <TableCell align="center" sx={{display: {xs: 'none', sm: 'table-cell'}}}>
                { secondSurname }
            </TableCell>
            <TableCell align="center">
                { name }
            </TableCell>
            <TableCell align="center" sx={{display: {xs: 'none', sm: 'table-cell'}}}>
                <RegistryRowMenuOptions
                    registry={registryRow}
                />
            </TableCell>

            <RegistryModal />
        </TableRow>
    )
}