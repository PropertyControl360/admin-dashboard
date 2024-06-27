
import IconButton from '@mui/material/IconButton';

import Iconify from '../iconify';

// ----------------------------------------------------------------------

type Props = {
  onDownload?: VoidFunction;
};

export default function DownloadButton({ onDownload }: Props) {

  return (
    <IconButton
      onClick={onDownload}
      sx={{

       
        color: '#0085FF',
        
       

        
      }}
    >
      <Iconify icon="eva:download-fill" width={24} />
    </IconButton>
  );
}
