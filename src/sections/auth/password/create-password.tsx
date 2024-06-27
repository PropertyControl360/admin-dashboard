import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';

import Logo from 'src/components/logo/logo';
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import Terms from '../terms';


// ----------------------------------------------------------------------

export default function CreatePasswordView() {
    const [errorMsg, setErrorMsg] = useState('');

    const { token } = useParams();

    const { resetPassword } = useAuthContext();

    const password = useBoolean();
    const repeatPassword = useBoolean();
    const isFormSubmitted = useBoolean(false);

    const CreatePasswordSchema = Yup.object().shape({
        password: Yup.string().required('Password is required').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/
            , "Password must contain at least one uppercase letter, one lowercase letter, one numeric, and one special character"),
        repeatPassword: Yup.string().required(
            'Repeat password is required'
        ).oneOf([Yup.ref('password')], 'Passwords must match'),
    });

    const defaultValues = {
        password: '',
        repeatPassword: '',
    };

    const methods = useForm({
        resolver: yupResolver(CreatePasswordSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await resetPassword?.(token || '', data.password);
            isFormSubmitted.setValue(true);
        } catch (error) {
            console.error(error);
            setErrorMsg(typeof error === 'string' ? error : error.message);
        }
    });

    const renderHead = (
        <Stack spacing={1} sx={{ mb: 5 }} alignItems="center">
            <Logo sx={{ width: 200, height: 'unset' }} />
            <Typography variant="h3" mt={3}> Create new password</Typography>
        </Stack >
    );

    const renderLogo = (
        <Stack spacing={1} sx={{ mb: 5 }} alignItems="center">
            <Logo sx={{ width: 200, height: 'unset' }} />
        </Stack >
    );

    const renderForm = (
        <Stack marginY={2}>

            <RHFTextField
                name="password"
                label="Enter new password *"
                helperText="Password must contain a mixture of uppercase and lowercase letters with at least 1 numerical character and 1 symbol"
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

            <RHFTextField
                name="repeatPassword"
                label="Repeat new password *"
                type={repeatPassword.value ? 'text' : 'password'}
                sx={{ mt: 1.75 }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={repeatPassword.onToggle} edge="end">
                                <Iconify icon={repeatPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <LoadingButton
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{ mx: 'auto', px: 13, mt: 6.5 }}
            >
                Save
            </LoadingButton>

        </Stack >
    );

    return (
        <Stack flexDirection="column" alignItems="center" flexGrow={1}>
            <Stack flexDirection="column" maxWidth={isFormSubmitted.value ? 'unset' : 434} width="100%" flexGrow={1}>


                {isFormSubmitted.value && (
                    <>
                        {renderLogo}
                        <Stack flexDirection="column" flexGrow={1} justifyContent="center" mb={10}>
                            <Typography variant="h3" mt={3} textAlign="center">
                                Thank you! We&apos;ve reset your password. Please login with your new password
                            </Typography>
                        </Stack>
                    </>
                )}

                {!isFormSubmitted.value && (
                    <>
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
                    </>
                )}

                <Terms />
            </Stack>
        </Stack>
    );
}
