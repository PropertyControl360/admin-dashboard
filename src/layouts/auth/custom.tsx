import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

import { bgBlur } from 'src/theme/css';


// ----------------------------------------------------------------------

type Props = {
    title?: string;
    image?: string;
    children: React.ReactNode;
};

export default function AuthCustomLayout({ children, image, title }: Props) {
    const theme = useTheme();

    const renderContent = (
        <Stack
            sx={{
                width: { xs: 1, md: 0.5 },
                padding: 4,
                my: { xs: 0, md: 4 },
                mr: { xs: 0, md: 6 },
                ml: { xs: 0, md: 'auto' },
                ...bgBlur({
                    color: theme.palette.background.default,
                }),
                borderRadius: { xs: 0, md: 4 },
                alignContent: 'center'
            }}

        >
            {children}
        </Stack>
    );

    return (
        <Box sx={{ backgroundImage: `url('/assets/background/auth_bg.png')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', zIndex: -1, }} >
            <Stack
                component="main"
                direction="row"
                sx={{
                    minHeight: '100svh',
                }}
            >
                {renderContent}
            </Stack>
        </Box>
    );
}
