import {Grid, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {TurnedInNot} from "@mui/icons-material";

import {Group} from "../interfaces";

export const SideBarItem = ({ group }: {group: Group}) => {
    return (
        <ListItem key={group.id} disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={group.name}/>
                    <ListItemText secondary={'22/04/2021'}/>
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}