import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Alert } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';

import Logo from 'src/components/logo/logo';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import Terms from '../terms';


// ----------------------------------------------------------------------

export default function ResetPasswordView() {
    const { forgotPassword } = useAuthContext();
    const [errorMsg, setErrorMsg] = useState('');
    const isFormSubmitted = useBoolean(false);

    const ResetPasswordSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    });

    const defaultValues = {
        email: ''
    };


    const methods = useForm({
        resolver: yupResolver(ResetPasswordSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await forgotPassword?.(data.email);
            isFormSubmitted.setValue(true);
            // navigate to "/auth/reset-password"

        } catch (error) {
            console.error(error);
            setErrorMsg(typeof error === 'string' ? error : error.message);
        }
    });

    const renderHead = (
        <Stack spacing={1} sx={{ mb: 5 }} alignItems="center">
            <Logo sx={{ width: 200, height: 'unset' }} />
            <Typography variant="h3" mt={3}>Reset Your Password</Typography>
        </Stack >
    );

    const renderLogo = (
        <Stack spacing={1} sx={{ mb: 5 }} alignItems="center">
            <Logo sx={{ width: 200, height: 'unset' }} />
        </Stack >
    );


    const renderForm = (
        <Stack>
            <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                Please enter your email address used during registration. We will send you a link to reset the password.
            </Typography>
            <RHFTextField
                name="email"
                placeholder='propertyhub@example.com'
                type="email"
                sx={{ mt: 2.25 }}
            />

            <LoadingButton
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                sx={{ mx: 'auto', px: 13, mt: 6.5 }}
            >
                Send
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
                            <Typography variant="h3" mt={3} textAlign="center">Thank you! We&apos;ve sent your reset password link. Please check your email</Typography>
                            <Stack direction="row" spacing={0.5} justifyContent='center' mt={3} alignItems="center">
                                <Typography variant="body2" alignContent="center">Haven&apos;t got an email?</Typography>

                                <FormProvider methods={methods} onSubmit={onSubmit}>
                                    <LoadingButton
                                        color="primary"
                                        size="small"
                                        type="submit"
                                        variant="text"
                                        loading={isSubmitting}
                                    >
                                        Resend Link
                                    </LoadingButton>
                                </FormProvider>

                            </Stack>
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
                            {renderForm}
                        </FormProvider>
                    </>
                )}

                <Terms />
            </Stack>
        </Stack >
    );
}
