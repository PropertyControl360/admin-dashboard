import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';
import UserDetail from "src/sections/users/detail";
import UserEmailDetail from "src/sections/users/emails";


// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/dashboard'));
const UsersPage = lazy(() => import('src/pages/dashboard/user'));
const ErrorLogPage = lazy(() => import('src/pages/dashboard/errorLog'));




// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'users', children: [
          { element: <UsersPage />, index: true },
          { path: 'detail/:id', element: < UserDetail /> },
          { path: 'email/:id', element: < UserEmailDetail /> },
        ]
      },
      { path: 'errorLogs', element: <ErrorLogPage /> },
    ],
  },
];
