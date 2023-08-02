import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export const QrCodeDatePicker = ({ date, onChangeDate }: { date: string | undefined, onChangeDate: any }) => {
    const [value, setValue] = React.useState<Dayjs | null>(
        dayjs(date),
    );

    const handleChange = (newValue: Dayjs | null) => {
        console.log('date: ', value?.toISOString())
        setValue(newValue);
        onChangeDate(newValue?.toISOString());
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={1}>
                <DesktopDatePicker
                    label="Date"
                    inputFormat="DD/MM/YYYY"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
        </LocalizationProvider>
    );
}