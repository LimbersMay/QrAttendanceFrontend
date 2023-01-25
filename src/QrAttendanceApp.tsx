import {AppTheme} from "./theme";
import {AppRouter} from "./routes/AppRouter";
import {SnackbarProvider} from "notistack";
import {SnackbarUtilitiesConfigurator} from "./utilities/snackbar-manager";

export const QrAttendanceApp = () => {
    return (
        <SnackbarProvider>
            <SnackbarUtilitiesConfigurator/>
            <AppTheme>
                <AppRouter />
            </AppTheme>
        </SnackbarProvider>

    )
}