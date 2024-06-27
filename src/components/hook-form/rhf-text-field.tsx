import { Controller, useFormContext } from 'react-hook-form';

import TextField, { TextFieldProps } from '@mui/material/TextField';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  phoneNumber?: boolean;
};

export default function RHFTextField({ name, helperText, type, phoneNumber, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          InputLabelProps={{ shrink: field.value }}
          value={
            // eslint-disable-next-line no-nested-ternary
            phoneNumber ? field.value : type === 'number' && field.value === 0 ? '' : field.value
          }
          onChange={(event) => {
            if (type === 'number') {
              if (phoneNumber) {
                const value = event.target.value.trim();
                if (value === '') {
                  field.onChange('');
                } else {
                  field.onChange(Number(event.target.value));
                }
              } else {
                field.onChange(Number(event.target.value));
              }
            } else {
              field.onChange(event.target.value);
            }
          }}
          onKeyDown={(event) => {
            // Prevent typing 'e' if phoneNumber is true
            if (phoneNumber && (event.key === 'e' || event.key === '.' || event.key === '-')) {
              event.preventDefault();
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}
