import { Helmet } from 'react-helmet-async';

import DashboardView from 'src/sections/dashboard/view/dashboard-index-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Home</title>
      </Helmet>

      <DashboardView />
    </>
  );
}
