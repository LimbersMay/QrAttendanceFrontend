import {Registry} from "./Registry";

export interface QrCode {
    id: string,
    name: string,
    registries: number,
    date: string,
    enabled: boolean,
    history: Registry[]
}