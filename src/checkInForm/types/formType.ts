import {Socket} from "socket.io-client";

export interface FormType {
    io: Socket;
    name: string;
    firstSurname: string;
    secondSurname: string;
    formId: string;
}
