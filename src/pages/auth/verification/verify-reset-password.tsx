import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Logo from "src/components/logo";

const renderLogo = (
    <Stack spacing={1} sx={{ mb: 5 }} alignItems="center">
        <Logo sx={{ width: 140, height: 'unset' }} />
        <Typography variant="h4" mt={3}>Password Changed Successfully</Typography>
        
    </Stack >
);
function ResetEmailSuccess() {
    return (
        <>
        {renderLogo}
        <div className="reset-email-wrapper">
            <div className="success-message">
                <p>Your password has successfully been changed.</p>
                <p>Please click <a href="https://uat-web.propertycontrol360.com">PropertyControl360</a> to continue login </p>
            </div>
        </div>
        </>
    )
}

export default ResetEmailSuccess