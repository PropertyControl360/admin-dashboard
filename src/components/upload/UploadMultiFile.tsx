import { useDropzone, DropzoneOptions } from 'react-dropzone';

import { Box, Theme, SxProps, styled } from '@mui/material';

import BlockContent from './BlockContent';
import MultiFilePreview from './MultiFilePreview';
import RejectionFiles from './RejectionFiles';

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  color: '#0085FF',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
  border: `2px dashed`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
}));

export interface MultiFilePreviewProps extends DropzoneOptions {
  error?: boolean;
  showPreview?: boolean;
  files: File[];
  onRemove: (file: File | string) => void;
  onRemoveAll: () => void;
  helperText?: React.ReactNode;
  sx?: SxProps<Theme>;
  description?: string;
  dropZoneStyle? : {
    variants :  'subtitle2' | 'body2',
    padding : number
  };
  uploadBoxStyle?:any
}

export default function UploadMultiFile({
  error,
  showPreview = false,
  files,
  onRemove,
  onRemoveAll,
  helperText,
  sx,
  description,
  dropZoneStyle,
  uploadBoxStyle,
  ...other
}: MultiFilePreviewProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    ...other,
  });

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...uploadBoxStyle,
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter',
          }),
        }}
      >
        <input {...getInputProps()} />

        <BlockContent description={description} dropZoneStyle={dropZoneStyle}/>
      </DropZoneStyle>

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

      <MultiFilePreview
        files={files}
        showPreview={showPreview}
        onRemove={onRemove}
        onRemoveAll={onRemoveAll}
      />

      {helperText && helperText}
    </Box>
  );
}

UploadMultiFile.defaultProps = {
  error: false,
  showPreview: false,
  helperText: null,
  sx: {},
};
