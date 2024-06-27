import { Controller, useFormContext } from 'react-hook-form';

import { FormHelperText } from '@mui/material';

import { UploadAvatar, UploadSingleFile } from '../upload';
import UploadMultiFile, { MultiFilePreviewProps } from '../upload/UploadMultiFile';


interface RHFUploadAvatarProps {
  name: string;
  sx?:any;
}

export function RHFUploadAvatar({ name, sx, ...other }: RHFUploadAvatarProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <div>
            <UploadAvatar error={checkError} sx={sx ?? {}} {...other} file={field.value} />
            {checkError && (
              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {error.message}
              </FormHelperText>
            )}
          </div>
        );
      }}
    />
  );
}

interface RHFUploadSingleFileProps extends Omit<MultiFilePreviewProps, 'files'> {
  name: string;
  dropZoneStyle? : any;
}

export function RHFUploadSingleFile({ name,dropZoneStyle, ...other }: RHFUploadSingleFileProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <UploadSingleFile
            accept={{ 'image/*': [] }}
            file={field.value}
            files={field.value}
            error={checkError}
            dropZoneStyle={dropZoneStyle}
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    />
  );
}


interface RHFUploadMultiFileProps extends Omit<MultiFilePreviewProps, 'files'> {
  name: string;
  description: string;
  dropZoneStyle? : {
    variants :  'subtitle2' | 'body2',
    padding : number
  };
  uploadBoxStyle? : any
}
export function RHFUploadMultiFile({ name, description,dropZoneStyle,uploadBoxStyle, ...other }: RHFUploadMultiFileProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && field.value?.length === 0;

        return (
          <UploadMultiFile
            accept={{ 'image/*': [] }}
            files={field.value}
            error={checkError}
            dropZoneStyle={dropZoneStyle}
            uploadBoxStyle={uploadBoxStyle}
            description={description}
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error?.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    />
  );
}
