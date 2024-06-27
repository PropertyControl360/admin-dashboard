import { useDropzone, DropzoneOptions } from 'react-dropzone';

import { Box, Stack,Theme, SxProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import MultiFilePreview from './MultiFilePreview';
import RejectionFiles from './RejectionFiles';

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  color: '#0085FF',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
  border: `2px dashed`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
}));

interface Props extends DropzoneOptions {
  error?: boolean;
  file?: string | File;
  helperText?: React.ReactNode;
  sx?: SxProps<Theme>;
  description?: string;
  files: File[];
  onRemove: (file: File | string) => void;
  onRemoveAll: () => void;
  dropZoneStyle? : any;
}

export default function UploadSingleFile({
  error = false,
  file,
  helperText,
  sx,
  description,
  files,
  onRemove,
  onRemoveAll,
  dropZoneStyle,
  ...other
}: Props) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    ...other,
  });
  return (
    <>
      {file && files.length > 0 ? (
        <MultiFilePreview files={files} onRemove={onRemove} onRemoveAll={onRemoveAll} />
      ) : (
        <Box sx={{ width: '100%', ...sx }}>
          <DropZoneStyle
            {...getRootProps()}
            sx={{
              ...dropZoneStyle,
              ...(isDragActive && { opacity: 0.72 }),
              ...((isDragReject || error) && {
                color: 'error.main',
                borderColor: 'error.light',
                bgcolor: 'error.lighter',
              }),
            }}
          >
            <input {...getInputProps()} />

            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="center"
              direction={{ xs: 'column', md: 'row' }}
              sx={{ textAlign: { xs: 'center', md: 'left' } }}
            >
              <Box>
                <Typography  variant="button">
                  {description}
                </Typography>
              </Box>
            </Stack>
          </DropZoneStyle>
          {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}
          {helperText && helperText}
        </Box>
      )}
    </>
  );
}

UploadSingleFile.defaultProps = {
  error: false,
  file: undefined,
  helperText: undefined,
  sx: {},
};
