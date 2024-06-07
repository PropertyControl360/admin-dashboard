// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  LEGAL: '/legal',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
    },
    password: {
      create: `${ROOTS.AUTH}/password/create-password/:token`,
      reset: `${ROOTS.AUTH}/password/reset-password`,
    },
   
    resetPasswordVerify: `/resetPassword/:token`,
    resetPasswordVerifySuccess: `/resetSuccess`,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    users:
    {
      root: `${ROOTS.DASHBOARD}/users`,      
    },
    errorLogs : {
      root : `${ROOTS.DASHBOARD}/errorLogs`,
    }
  },
 // TERMS & CONDITIONS
  termsConditions: `${ROOTS.LEGAL}/termsAndConditions`,

  // this is used as a placeholder change to the above line
  // termsConditions: `https://propertycontrol360.com/terms-and-conditions/`,


  // PRIVACY POLICY
  privacyPolicy: `${ROOTS.LEGAL}/privacy`,

    // this is used as a placeholder change to the above line
  // privacyPolicy: `https://propertycontrol360.com/privacy-policy`,
};
