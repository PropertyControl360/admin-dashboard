import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { fDateTime } from 'src/utils/format-time';


// ----------------------------------------------------------------------

type NotificationItemProps = {
  notification: {
    id: number;
    isRead: boolean;
    postcode: string;
    title: string;
    content: string;
    createdBy: string;
    modifiedBy: string;
    createdAt: Date;
    updatedAt: string;
  };
};

export default function NotificationItem({ notification }: NotificationItemProps) {


  const renderText = (
    <ListItemText
      disableTypography
      primary={
        <Typography fontWeight={!notification.isRead ? '600' : '400'} variant="subtitle2">
          {notification.title}
        </Typography>
      }
      secondary={
        <Stack
          direction="row"
          alignItems="center"
          sx={{ typography: 'caption', color: 'text.disabled' }}
          divider={
            <Box
              sx={{
                width: 2,
                height: 2,
                bgcolor: 'currentColor',
                mx: 0.5,
                borderRadius: '50%',
              }}
            />
          }
        >
          {fDateTime(notification.createdAt)}
        </Stack>
      }
    />
  );

  const renderUnReadBadge = !notification.isRead && (
    <Box
      sx={{
        top: 26,
        width: 8,
        height: 8,
        right: 20,
        borderRadius: '50%',
        bgcolor: 'primary.main',
        position: 'absolute',
      }}
    />
  );

  return (
    <ListItemButton
      disableRipple
      sx={{
        px: 2.5,
        py: 1,
        alignItems: 'flex-start',
      }}
    >
      {renderUnReadBadge}
      <Stack sx={{ flexGrow: 1 }}>
        {renderText}
      </Stack>
    </ListItemButton>
  );
}
