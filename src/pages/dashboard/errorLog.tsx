import { Helmet } from 'react-helmet-async';

import ErrorLogView from 'src/sections/errorLogs/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Error Log</title>
      </Helmet>

      <ErrorLogView />
    </>
  );
}
