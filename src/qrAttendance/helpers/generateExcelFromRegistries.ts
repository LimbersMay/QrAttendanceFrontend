import * as XLSX from "xlsx";
import {Registry} from "../interfaces";
import dayjs from "dayjs";

export const generateExcelFromRegistries = (qrCodeId: string, registries: Registry[]) => {

    const registriesToExport = registries.filter(registry => registry.qrCodeId === qrCodeId);
    const registriesToExcel = registriesToExport.map(registry => {
        return {
            'CheckInTime': dayjs(registry.checkinTime).format('DD/MM/YYYY HH:mm:ss'),
            'Name': registry.name,
            'First Surname': registry.firstSurname,
            'Second Surname': registry.secondSurname,
        }
    });

    const ws = XLSX.utils.json_to_sheet(registriesToExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registries");
    XLSX.writeFile(wb, "registries.xlsx");
}