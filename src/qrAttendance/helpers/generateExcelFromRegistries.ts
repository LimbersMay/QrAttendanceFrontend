import * as XLSX from "xlsx";
import {QrCode, Registry} from "../interfaces";
import dayjs from "dayjs";

export const generateExcelFromRegistries = (qrCodeRow: QrCode, registries: Registry[]) => {

    const registriesToExport = registries.filter(registry => registry.qrCodeId === qrCodeRow.id);
    const registriesToExcel = registriesToExport.map(registry => {
        return {
            'CheckInTime': dayjs(registry.checkinTime).format('DD/MM/YYYY HH:mm:ss'),
            'Name': registry.name,
            'Group': registry.group,
            'Career': registry.career,
            'First Surname': registry.firstSurname,
            'Second Surname': registry.secondSurname,
        }
    });

    const ws = XLSX.utils.json_to_sheet(registriesToExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `${qrCodeRow.name}`);
    XLSX.writeFile(wb, `${qrCodeRow.name} - ${dayjs(qrCodeRow.date).format('DD/MM/YYYY')}.xlsx`);
}