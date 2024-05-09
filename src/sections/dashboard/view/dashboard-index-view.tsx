import useSWR from 'swr';
import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';
import { fetcher, endpoints } from 'src/utils/axios';
import { _mock } from 'src/_mock';




// ----------------------------------------------------------------------

export const _reminders = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.sentence(index),
  description: _mock.sentence(index),
  nextReminder: _mock.time(index),
}));

export default function DashboardView() {
  const theme = useTheme();
  const settings = useSettingsContext();
  const { data: profile } = useSWR(endpoints.auth.me, fetcher);

  

 

  

  const [user, setLoggedUser] = useState<any>(null);

  useEffect(() => {
    if (profile) {
      setLoggedUser(profile.profile);
    }
  }, [profile]);


  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      Admin Dashboard
    </Container>
  );
}
