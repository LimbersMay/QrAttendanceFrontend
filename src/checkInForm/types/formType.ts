import {Socket} from "socket.io-client";

export interface FormType {
    io: Socket;
    name: string;
    group: string;
    career: string;
    firstSurname: string;
    secondSurname: string;
    formId: string;
}
