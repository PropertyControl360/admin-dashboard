import { Helmet } from 'react-helmet-async';

import CreatePasswordView from 'src/sections/auth/password/create-password';

// ----------------------------------------------------------------------

export default function LoginPage() {
    return (
        <>
            <Helmet>
                <title> Password Reset</title>
            </Helmet>

            <CreatePasswordView />
        </>
    );
}
