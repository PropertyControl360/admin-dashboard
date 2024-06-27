import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const { loading } = useAuthContext();

  return <>{loading ? <SplashScreen /> : <Container>{children}</Container>}</>;
}

// ----------------------------------------------------------------------

function Container({ children }: Props) {

  

  // const check = useCallback(() => {
  //   if (authenticated) {
  //     router.replace(returnTo);
  //   }
  // }, [authenticated, returnTo, router]);

  // useEffect(() => {
  //   check();
  // }, [check]);

  return <>{children}</>;
}
