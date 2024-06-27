import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { GuestGuard } from 'src/auth/guard';
import AuthCustomLayout from 'src/layouts/auth/custom';
import { SplashScreen } from 'src/components/loading-screen';
import ResetPasswordView from 'src/sections/auth/password/reset-password';
import CreatePasswordView from 'src/sections/auth/password/create-password';
import ResetEmailSuccess from 'src/pages/auth/verification/verify-reset-password';

import { paths } from '../paths';

// ----------------------------------------------------------------------

// JWT
const JwtLoginPage = lazy(() => import('src/pages/auth/jwt/login'));

// ----------------------------------------------------------------------

const authJwt = {
  path: 'jwt',
  element: (
    <Suspense fallback={<SplashScreen />}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      path: 'login',
      element: (
        <GuestGuard>
          <AuthCustomLayout>
            <JwtLoginPage />
          </AuthCustomLayout>
        </GuestGuard>
      ),
    },
  ],
};

const authPassword = {
  path: 'password',
  children: [
    {
      path: 'create-password/:token',
      element: (
        <GuestGuard>
          <AuthCustomLayout>
            <CreatePasswordView />
          </AuthCustomLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'reset-password',
      element: (
        <GuestGuard>
          <AuthCustomLayout>
            <ResetPasswordView />
          </AuthCustomLayout>
        </GuestGuard>
      ),
    },
  ],
};

export const authRoutes = [
  {
    path: 'auth',
    children: [authJwt, authPassword],
  },
  
  {
    path: paths.auth.resetPasswordVerify,
    element: (
      <GuestGuard>
        <AuthCustomLayout>
          <CreatePasswordView />
        </AuthCustomLayout>
      </GuestGuard>
    ),
  },
  {
    path: paths.auth.resetPasswordVerifySuccess,
    element: (
      <GuestGuard>
        <AuthCustomLayout>
          <ResetEmailSuccess />
        </AuthCustomLayout>
      </GuestGuard>
    ),
  }
];
