import {IconButton, TableCell, tableCellClasses, TableRow, TextField} from "@mui/material";
import {AddOutlined, SearchOutlined, EditOutlined, SaveOutlined, DeleteOutlined} from "@mui/icons-material";
import {useForm} from "../../hooks/useForm";
import {useState} from "react";
import {ConditionalTextField} from "./ConditionalTextField";

const initialStateForm = {
    groupTitle: '5A'
}

export const TitleRow = () => {

    const { formState, onInputChange } = useForm(initialStateForm);
    const [isRowEditing, setIsRowEditing] = useState<boolean>(false);

    const { groupTitle } = formState;

    const handleEditRow = () => {
        setIsRowEditing(true);
    }

    const handleSaveRow = () => {
        setIsRowEditing(false);
    }

    const handleDeleteRow = () => {
        console.log('delete group');
    }

    const handleAddEmptyRow = () => {
        console.log('add row');
    }

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
                colSpan={2}
            >
                <ConditionalTextField
                    onChange={onInputChange}
                    condition={isRowEditing}
                    name={"groupTitle"}
                    value={groupTitle}
                />
            </TableCell>

            {/* TODO: Add a search field */}
            <TableCell align="right" colSpan={2}>
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
                <IconButton onClick={handleAddEmptyRow}>
                    <AddOutlined/>
                </IconButton>
                {
                    isRowEditing
                     ? <IconButton onClick={handleSaveRow}> <SaveOutlined /> </IconButton>
                     : <IconButton onClick={handleEditRow}> <EditOutlined /> </IconButton>
                }
                <IconButton onClick={handleDeleteRow}>
                    <DeleteOutlined/>
                </IconButton>
            </TableCell>

        </TableRow>
    )
}