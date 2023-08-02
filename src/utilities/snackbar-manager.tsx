import {useSnackbar, VariantType, WithSnackbarProps} from "notistack";
import React from "react";

let useSnackbarRef: WithSnackbarProps;
export const SnackbarUtilitiesConfigurator: React.FC = () => {
    useSnackbarRef = useSnackbar();
    return null;
}

export const SnackbarUtilities = {
    toast(msg: string, variant: VariantType = "default") {
        useSnackbarRef.enqueueSnackbar(msg, {variant});
    },
    success(msg: string) {
        this.toast(msg, "success");
    },
    error(msg: string) {
        this.toast(msg, "error");
    },
    warning(msg: string) {
        this.toast(msg, "warning");
    },
    info(msg: string) {
        this.toast(msg, "info");
    }
}
