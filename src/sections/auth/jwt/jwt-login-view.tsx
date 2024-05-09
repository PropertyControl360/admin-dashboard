import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { InputLabel } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import Logo from 'src/components/logo/logo';
import Iconify from 'src/components/iconify';
import { RHFCheckbox } from 'src/components/hook-form/rhf-checkbox';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import Terms from '../terms';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
    keep_me: Yup.boolean().default(false)
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema)
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login?.(data.email, data.password, data.keep_me) as any;

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      // eslint-disable-next-line no-nested-ternary
      setErrorMsg(typeof error === 'string' ? error : (error.message === 'password Incorrect password' ? 'Incorrect password' : error.message));
    }
  });

  const renderHead = (
    <Stack spacing={1} sx={{ mb: 5 }} alignItems="center">
      <Logo sx={{ width: 200, height: 'unset' }} />
      <Typography variant="h3" mt={3}>Welcome back!</Typography>
    </Stack>
  );

  const renderForm = (
    <Stack marginY={2}>
      <InputLabel>Email Address  *</InputLabel>
      <RHFTextField name="email"  placeholder='propertyhub@example.com' />
      <InputLabel>Password *</InputLabel>
      <RHFTextField
        name="password"
       
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Stack direction="row" spacing={1} justifyContent="space-between" mt={1}>
        <RHFCheckbox name="keep_me" label="Keep me logged in"sx={{ fontWeight: "bold" }} />
        {/* <FormControlLabel control={<Checkbox />} label="Keep me logged in" sx={{ fontWeight: "bold" }} /> */}
        <Link variant="body2" color="primary" underline="always" sx={{ alignSelf: 'flex-end', my: 'auto' }} component={RouterLink} href={paths.auth.password.reset}>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ mx: 'auto', px: 13, mt: 6.5 }}
      >
        Login
      </LoadingButton>

    </Stack >
  );

  return (
    <Stack flexDirection="column" alignItems="center" flexGrow={1}>
      <Stack flexDirection="column" maxWidth={434} width="100%" flexGrow={1}>
        {/* <ThreeView /> */}
        {renderHead}

        {!!errorMsg && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMsg}
          </Alert>
        )}

        <FormProvider methods={methods} onSubmit={onSubmit}>
        <Typography variant="caption"  sx={{ alignSelf: 'center', opacity: 0.6 }}>Fields marked with * are required.</Typography>

          {renderForm}
        </FormProvider>
        <Terms />
      </Stack>
    </Stack>
  );
}
