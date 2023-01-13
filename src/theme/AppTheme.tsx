import {CssBaseline, ThemeProvider} from "@mui/material";
import {purpleTheme} from "./purpleTheme";

export const AppTheme = ({ children }: { children: any }) => {
    return (
        <ThemeProvider theme={purpleTheme}>
            <CssBaseline />
            { children }
        </ThemeProvider>
    )
}