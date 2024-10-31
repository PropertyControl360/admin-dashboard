import useSWR from "swr";
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from "react-router";

import { Container, Grid } from "@mui/material";

import { endpoints, fetcherWithId } from "src/utils/axios";

import { useSettingsContext } from "src/components/settings";

import AppErrorLog from "../dashboard/components/error-log-table";

// eslint-disable-next-line arrow-body-style
const UserDetail = () => {
  const { id = '' } = useParams();
  const tableLabels = [
    { id: 'user', label: 'User', align: 'left' },
    { id: 'errorMessage', label: 'Error Message', align: 'left' },
    { id: 'errorType', label: 'Error Type', align: 'left' },
    { id: 'timestamp', label: 'Timestamp', align: 'left' },
  ];

  const settings = useSettingsContext();
  const { data: errorLogs } = useSWR([endpoints.errors, id], fetcherWithId);

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
            subheader="Error logs"
            tableData={errorLogsList}
            tableLabels={tableLabels}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserDetail;