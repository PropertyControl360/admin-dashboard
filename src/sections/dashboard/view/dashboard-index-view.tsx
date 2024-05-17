import useSWR from 'swr';
import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';
import { fetcher, endpoints } from 'src/utils/axios';
import { _mock } from 'src/_mock';
import { Grid, Stack } from '@mui/material';
import DataDisplayCard from '../components/finance-display-card';
import AppUser from '../components/app-user';




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
  const { data: metricsData , isLoading: metricsLoading} = useSWR(endpoints.metrics, fetcher);
  const { data: usersData } = useSWR(endpoints.users, fetcher);
 

  

  const [user, setLoggedUser] = useState<any>(null);
  const [users, setUsers] = useState<[]>([]);

  useEffect(() => {
    if (profile) {
      setLoggedUser(profile.profile);
    }
  }, [profile]);

  useEffect (() => {
    if (usersData)
      {
        setUsers(usersData)
      }
  }, [usersData])


  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
    <Grid container spacing={3} sm={12}>
      <Grid sm={12} spacing={3} width="100%" my={4}>
        <Stack direction={{ sm: 'column', md: 'row' }} spacing={3} gap={3}>
          <DataDisplayCard
            title="Active Users"
            icon="mdi:user-multiple-check-outline"
            color="success"
            isLoading={metricsLoading}
            count={metricsData?.activeUsers}
          />
           <DataDisplayCard
            title="Registered Users"
            icon="mdi:users-plus-outline"
            color="success"
            isLoading={metricsLoading}
            count={metricsData?.registeredUsers}
          />
           <DataDisplayCard
            title="Pending User Activations"
            icon="mdi:user-clock-outline"
            color="success"
            isLoading={metricsLoading}
            count={metricsData?.usersWaitingForActivation}
          />
           <DataDisplayCard
            title="Expired User Activations"
            icon="mdi:user-cancel-outline"
            color="success"
            isLoading={metricsLoading}
            count={metricsData?.usersWithExpiredActivation}
          />
         
         

         
        </Stack>
      </Grid>
      <Grid xs={12} lg={8}>
          <AppUser
            title="App Users"
            tableData={users}
            tableLabels={[
              { id: 'name', label: 'Name' },
              { id: 'email', label: 'Email' },
              { id: 'phoneNumber', label: 'Phone Number' },
              { id: 'status', label: 'Status' },
              { id: '' },
            ]}
          />
        </Grid>
      </Grid>
      </Container>
  );
}
