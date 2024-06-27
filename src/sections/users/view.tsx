import useSWR from 'swr';
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import { Grid } from '@mui/material';

import { useSettingsContext } from 'src/components/settings';
import { fetcher, endpoints } from 'src/utils/axios';
import { _mock } from 'src/_mock';
import AppUser from '../dashboard/components/app-user';


// ----------------------------------------------------------------------

export default function UsersView() {
  
  const settings = useSettingsContext();
  const { data: usersData, mutate } = useSWR(endpoints.users, fetcher);

  const [users, setUsers] = useState<[]>([]);



  useEffect(() => {
    if (usersData) {
      setUsers(usersData);
    }
  }, [usersData]);
 

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3} sm={12}>
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
              { id: 'status', label: 'Status' },
              { id: '' },
            ]}
            refetch={mutate}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
