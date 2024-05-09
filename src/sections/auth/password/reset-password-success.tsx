
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Logo from 'src/components/logo/logo';

import Terms from '../terms';


// ----------------------------------------------------------------------

export default function ResetPasswordSuccessView() {

    const renderHead = (
        <Stack spacing={1} sx={{}} alignItems="center">
            <Logo sx={{ width: 200, height: 'unset' }} />
        </Stack >
    );


    return (
        <Stack flexDirection="column" alignItems="center" flexGrow={1}>
            <Stack flexDirection="column" width="100%" flexGrow={1}>
                {renderHead}

                <Stack flexDirection="column" flexGrow={1} justifyContent="center" mb={10}>
                    <Typography variant="h3" mt={3} textAlign="center">Thank you! We&apos;ve sent your reset password link. Please check your email</Typography>
                </Stack>
                <Terms />
            </Stack>
        </Stack>
    );
}
