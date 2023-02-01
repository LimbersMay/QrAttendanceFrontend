import {getValidationError} from "../utilities";
import {SnackbarUtilities} from "../utilities/snackbar-manager";
import {qrAttendanceApi} from "../api/qrAttendanceApi";

export const AxiosInterceptor = () => {
    qrAttendanceApi.interceptors.request.use((request) => {
        request.withCredentials = true;

        return request;
    });

    qrAttendanceApi.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {

            if (error.response) {
                SnackbarUtilities.error(getValidationError(error.response.data.body));
            }

            if (!error.response) {
                SnackbarUtilities.error(getValidationError('ERR_NETWORK'));
            }
            return Promise.reject(error);
        }
    );
}
