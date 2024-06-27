import { Link, Typography } from "@mui/material";


import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';


export default function Terms() {
    return (
        <Typography
            component="div"
            sx={{
                textAlign: 'center',
                typography: 'subtitle',
                fontWeight: 'bold',
                color: 'primary.main',
                mt: 'auto',
                pt: 7,
            }}
        >
           <Link color="primary.main" sx={{ cursor: "pointer"}} component={RouterLink} href={paths.privacyPolicy} target="_blank" >
                Privacy Policy
            </Link>
            {' | '}
            <Link color="primary.main" sx={{ cursor: "pointer"}} component={RouterLink} href={paths.termsConditions} target="_blank">
                Terms of Use
            </Link>
        </Typography >
    );
}
