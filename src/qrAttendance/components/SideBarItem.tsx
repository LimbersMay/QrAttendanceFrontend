import {Grid, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {TurnedInNot} from "@mui/icons-material";

import {Group} from "../interfaces";
import dayjs from "dayjs";
import {useGroupStore} from "../../hooks/useGroupStore";

export const SideBarItem = ({ group }: {group: Group}) => {

    const { setActiveGroup } = useGroupStore();

    const onClickGroup = () => {
        setActiveGroup(group);
    }

    return (
        <ListItem disablePadding onClick={onClickGroup}>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container alignItems="center">
                    <ListItemText primary={group.name} sx={{mr: '10%'}}/>
                    <ListItemText secondary={dayjs(group.date).format('DD/MM/YYYY')}/>
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}