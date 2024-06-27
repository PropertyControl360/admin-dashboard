import Stack from '@mui/material/Stack';
import { CardProps } from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { ColorSchema } from 'src/theme/palette';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  color?: ColorSchema;
  icon: string;
  isLoading: boolean;
  count?: number;
}

export default function DataDisplayCard({
  title,
  icon,
  isLoading,
  color = 'primary',
  count,
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        width: 1,
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'background.paper',
        ...sx,
      }}
      {...other}
    >
      <Stack spacing={1} sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Iconify icon={icon} width={36} color={theme.palette.primary.main} />
            <Typography variant="subtitle1">{title}</Typography>
          </Stack>
        </Stack>
        <Typography fontSize={32} fontWeight={600} sx={{ alignSelf: "flex-end"}}>
          {
          isLoading ? 
            'Loading...' 
            : 
           count
        }
        </Typography>
      </Stack>
    </Stack>
  );
}
