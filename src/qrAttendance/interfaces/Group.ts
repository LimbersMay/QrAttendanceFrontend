import {QrCode} from "./QrCode";

export interface Group {
    id: number;
    date: string;
    name: string;
    qrCodes: QrCode[];
}
