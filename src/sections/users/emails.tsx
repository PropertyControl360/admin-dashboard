import useSWR from "swr";
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from "react-router";

import { Container, Grid, Stack, useTheme } from "@mui/material";

import { endpoints, fetcher, fetcherWithId } from "src/utils/axios";

import { useSettingsContext } from "src/components/settings";

import AppErrorLog from "../dashboard/components/error-log-table";
import AppUser from "../dashboard/components/app-user";
import DataDisplayCard from "../dashboard/components/finance-display-card";
import EmailDetails from "./Email/Logs";

// eslint-disable-next-line arrow-body-style
const UserEmailDetail = () => {
  const tableLabels = [
    { id: 'email', label: 'Email', align: 'left' },
    { id: 'message', label: 'Email Message', align: 'left' },
    { id: 'reason', label: 'Email Reason', align: 'left' },
    { id: 'status', Label: 'Email status', align: 'left' },
    { id: 'timestamp', label: 'Timestamp', align: 'left' },
  ];

  const settings = useSettingsContext();
  const { id = '' } = useParams();

  const { data: emailLogs } = useSWR(
    [`${endpoints.email}/getAll`, id], fetcherWithId
  );
  const { data: metricsData, isLoading } = useSWR(
    [`${endpoints.email}/count`, id], fetcherWithId
  );


  console.log('emailLogs', emailLogs, metricsData);


  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3} sm={12}>
        <Grid sm={12} spacing={3} width="100%" my={4}>
          <Stack direction={{ sm: 'column', md: 'row' }} spacing={3} gap={3}>
            <DataDisplayCard
              title="Total Email Sent Per day"
              icon="mdi:email-check"
              color="success"
              isLoading={isLoading}
              count={metricsData?.totalEmailSentToday || 0}
            />
            <DataDisplayCard
              title="Failed Emails per day"
              icon="mdi:email-remove"
              color="error"
              isLoading={isLoading}
              count={metricsData?.totalEmailSentNotToday || 0}
            />
            <DataDisplayCard
              title="Total Email sent"
              icon="mdi:email-check"
              color="success"
              isLoading={isLoading}
              count={metricsData?.totalEmailSent || 0}
            />
            <DataDisplayCard
              title="Total Failed Emails"
              icon="mdi:email-remove"
              color="error"
              isLoading={isLoading}
              count={metricsData?.totalEmailNotSent || 0}
            />
          </Stack>
        </Grid>

        <Grid xs={12} lg={12} my={4}>
          <EmailDetails
            title="Email Logs"
            subheader="Email logs"
            tableData={[]}
            tableLabels={tableLabels}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserEmailDetail;