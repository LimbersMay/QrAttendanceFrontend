import {QrCode} from "./QrCode";

export interface Group {
    id: number;
    name: string;
    qrCodes: QrCode[];
}
