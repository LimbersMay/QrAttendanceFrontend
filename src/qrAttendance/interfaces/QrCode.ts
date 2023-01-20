import {Registry} from "./Registry";

export interface QrCode {
    id: string,
    groupId: string,
    name: string,
    registries: number,
    date: string,
    enabled: boolean
}