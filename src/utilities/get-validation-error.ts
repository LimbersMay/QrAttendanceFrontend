import {TypeWithKey} from "../models";

export const getValidationError = (errorCode: string) => {
    const codeMatcher: TypeWithKey<string> = {
        ERR_NETWORK: "NETWORK ERROR",
        GROUP_NOT_FOUND: "GROUP NOT FOUND",
    }

    return codeMatcher[errorCode] || "Something went wrong";
}