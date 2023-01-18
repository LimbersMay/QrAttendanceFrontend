import {IconButton, TableCell, tableCellClasses, TableRow, TextField} from "@mui/material";
import {Add, SearchOutlined} from "@mui/icons-material";

export const TitleRow = () => {
    return (
        <TableRow
            sx={{
                [`& .${tableCellClasses.root}`]: {
                    borderBottom: "none"
                }
            }}
        >
            <TableCell />
            <TableCell
                sx={{
                    // TODO: Make this cell look like a title
                    fontSize: "1.4rem",
                }}
                colSpan={3}
            >Group 5A</TableCell>

            {/* TODO: Add a search field */}
            <TableCell align="right">
                <TextField
                    id="outlined-search"
                    label="Search"
                    type="search"
                    variant="outlined"
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <IconButton>
                                <SearchOutlined />
                            </IconButton>
                        )
                    }}
                />
            </TableCell>
            <TableCell align="left">
                <IconButton>
                    <Add />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}