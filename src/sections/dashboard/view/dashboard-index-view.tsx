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
import AppErrorLog from '../components/error-log-table';

// ----------------------------------------------------------------------

export default function DashboardView() {
  const tableLabels = [
    { id: 'system', label: 'System Error', align: 'left' },
    { id: 'errorMessage', label: 'Error Message', align: 'left' },
    { id: 'errorType', label: 'Error Type', align: 'left' },
    { id: 'timestamp', label: 'Timestamp', align: 'left' },
  ];

  const theme = useTheme();
  const settings = useSettingsContext();
  const { data: profile } = useSWR(endpoints.auth.me, fetcher);
  const { data: metricsData, isLoading: metricsLoading } = useSWR(endpoints.metrics, fetcher);
  const { data: usersData, mutate } = useSWR(endpoints.users, fetcher);
  const { data: errorLogs } = useSWR(endpoints.errors, fetcher);
  console.log(errorLogs, 'error Logs');

  const [user, setLoggedUser] = useState<any>(null);
  const [users, setUsers] = useState<[]>([]);
  const [errorLogsList, setErrorLogsList] = useState<[]>([]);

  useEffect(() => {
    if (profile) {
      setLoggedUser(profile.profile);
    }
  }, [profile]);

  useEffect(() => {
    if (usersData) {
      setUsers(usersData.slice(0, 5));
    }
  }, [usersData]);
  useEffect(() => {
    if (errorLogs) {
      setErrorLogsList(errorLogs.slice(0, 5));
    }
  }, [errorLogs]);

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
        <Grid xs={12} lg={12} my={4}>
          <AppUser
            title="App Users"
            tableData={users}
            tableLabels={[
              { id: 'name', label: 'Name' },
              { id: 'email', label: 'Email' },
              { id: 'phoneNumber', label: 'Phone Number' },
              { id: 'createdAt', label: 'Registration Timestamp', align: 'left' },
              { id: 'subscriptionStatus', label: 'Subscription Status', align: 'left' },
              { id: 'isEmailVerified', label: 'Email Verification', align: 'left' },
              { id: 'activeTenancies', label: 'Active Tenancies' },
              { id: 'inactiveTenancy', label: 'Inactive Tenancies' },
              { id: 'fileUploadSize', label: 'Total Upload' },
              { id: 'status', label: 'Status' },
              { id: '' },
            ]}
            refetch={mutate}
          />
        </Grid>
        <Grid xs={12} lg={12} my={4}>
          <AppErrorLog
            title="Error Logs"
            subheader="List of application error logs"
            tableData={errorLogsList}
            tableLabels={tableLabels}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
