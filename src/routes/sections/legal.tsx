import { lazy } from 'react';

import { GuestGuard } from 'src/auth/guard';


// ----------------------------------------------------------------------

// Legal
const TermsConditionsPage = lazy(() => import('src/pages/legal/terms-and-conditions'));
const PrivacyPolicyPage = lazy(() => import('src/pages/legal/privacy-policy'));

// ----------------------------------------------------------------------

export const legalRoutes = [
    {
        path: 'legal/termsAndConditions',
        element: (
            <GuestGuard>
                <TermsConditionsPage />
            </GuestGuard>
        ),
    },
    {
        path: 'legal/privacy',
        element: (
            <GuestGuard>
                <PrivacyPolicyPage />
            </GuestGuard>
        ),
    },
];
