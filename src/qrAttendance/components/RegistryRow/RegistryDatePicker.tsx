import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export const RegistryDatePicker = ({ date, onChangeDate }: { date: string | undefined, onChangeDate: any }) => {
    const [value, setValue] = React.useState<Dayjs | null>(
        dayjs(date),
    );

    const handleChange = (newValue: Dayjs | null) => {
        setValue(newValue);
        onChangeDate(newValue?.toISOString());
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
                <DateTimePicker
                    label="Date&Time picker"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
        </LocalizationProvider>
    );
}