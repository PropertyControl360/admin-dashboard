import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';


import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import { fetcher, endpoints } from 'src/utils/axios';
import Logo from 'src/components/logo';
import { useSettingsContext } from 'src/components/settings';
import SvgColor from 'src/components/svg-color';


import { NAV, HEADER } from '../config-layout';
import AccountPopover from '../common/account-popover';
import LanguagePopover from '../common/language-popover';
import NotificationsPopover from '../common/notifications-popover';
import EnvironmentToggle from '../common/environment-toggle';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  
  const location = useLocation();


  const { data: profile } = useSWR(endpoints.auth.me, fetcher);

  const [user, setLoggedUser] = useState<any>(null);

  useEffect(() => {
    if (profile) {
      setLoggedUser(profile.profile);
    }
  }, [profile]);
  const theme = useTheme();

  const settings = useSettingsContext();

  const isNavHorizontal = settings.themeLayout === 'horizontal';

  const isNavMini = settings.themeLayout === 'mini';

  const lgUp = useResponsive('up', 'lg');

  const offset = useOffSetTop(HEADER.H_DESKTOP);

  const offsetTop = offset && !isNavHorizontal;

  const renderContent = (
    <>
      {lgUp && isNavHorizontal && <Logo sx={{ mr: 2.5 }} variant="single" />}

      {!lgUp && (
        <IconButton onClick={onOpenNav}>
          <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
        </IconButton>
      )}
      <Grid container sx={{ width: '100%' }} justifyContent="space-between" alignItems="center">
        <Grid item xs={0} md={4} lg={3.4} sx={{}}>
          <Typography
            variant="h5"
            sx={{
              display: { xs: 'none', md: 'block' },
              color: 'text.primary',
            }}
          >
            Hi, Welcome back 👋
          </Typography>
        </Grid>
       
      </Grid>
      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >
        <LanguagePopover />
        <EnvironmentToggle />

        <NotificationsPopover />

        <AccountPopover user={user} />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        backgroundColor: theme.palette.background.paper,
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
          height: HEADER.H_DESKTOP,
          ...(offsetTop && {
            height: HEADER.H_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: 'background.paper',
            height: HEADER.H_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
