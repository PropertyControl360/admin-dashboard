import useSWR from 'swr';
import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import { fetcher, endpoints } from 'src/utils/axios';
import { _mock } from 'src/_mock';
import AppErrorLog from '../dashboard/components/error-log-table';

// ----------------------------------------------------------------------

export default function ErrorLogView() {
  const tableLabels = [
    { id: 'system', label: 'System Error', align: 'left' },
    { id: 'errorMessage', label: 'Error Message', align: 'left' },
    { id: 'errorType', label: 'Error Type', align: 'left' },
    { id: 'timestamp', label: 'Timestamp', align: 'left' },
  ];

  const settings = useSettingsContext();
  const { data: errorLogs } = useSWR(endpoints.errors, fetcher);

  const [errorLogsList, setErrorLogsList] = useState<[]>([]);
  useEffect(() => {
    if (errorLogs) {
      setErrorLogsList(errorLogs);
    }
  }, [errorLogs]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3} sm={12}>
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
