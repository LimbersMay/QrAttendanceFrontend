import {TextField} from "@mui/material";
import {ChangeEventHandler} from "react";

export const ConditionalTextField = ({ onChange, condition, name, value, styles }: { onChange: ChangeEventHandler, condition: boolean, name: string, value: any, styles?: Object}) => {
    return (
        condition
            ? <TextField variant={'standard'} sx={styles} onChange={onChange} name={name} value={value}></TextField>
            : value
    )
}