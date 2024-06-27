import { useMemo, useEffect, useReducer, useCallback } from 'react';

import axios, { endpoints } from 'src/utils/axios';

import { AuthContext } from './auth-context';
import { setSession, setStorage, isValidToken, setKeep } from './utils';
import { AuthUserType, ActionMapType, AuthStateType } from '../../types';

// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  RESET_PASSWORD = 'RESET_PASSWORD',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
  [Types.FORGOT_PASSWORD]: undefined;
  [Types.RESET_PASSWORD]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';
const STORAGE_KEEP = 'keep_me';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const keepMeValue = localStorage.getItem(STORAGE_KEEP);
      const keepMe = keepMeValue ? JSON.parse(keepMeValue) : false; 
  
   
      let accessToken;
      if (keepMe) {
        accessToken = localStorage.getItem(STORAGE_KEY);
      } else {
        accessToken = sessionStorage.getItem(STORAGE_KEY);
      }

      if (accessToken && isValidToken(accessToken)) {
        
        if (keepMe) {
          setStorage(accessToken);
        } else {
          setSession(accessToken); 
        }

        const res = await axios.get(endpoints.auth.me);

        const { user } = res.data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string, keep_me: boolean) => {
    const data = {
      email,
      password,
      keep_me,
    };

    const res = await axios.post(endpoints.auth.login, data);

    const { token, user } = res.data;
    setKeep(keep_me);
    if (keep_me) {
      setStorage(token);
    } else {
      setSession(token);
    }

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...user,
          accessToken: token,
        },
      },
    });
  }, []);

  

  // FORGOT PASSWORD
  const forgotPassword = useCallback(async (email: string) => {
    const data = {
      email,
    };

    await axios.post(endpoints.auth.forgotPassword, data);

    dispatch({
      type: Types.FORGOT_PASSWORD,
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    setStorage(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // RESET PASSWORD
  const resetPassword = useCallback(async (token: string, password: string) => {
    const data = {
      token,
      password,
    };

    await axios.patch(endpoints.auth.resetPassword, data);

    dispatch({
      type: Types.FORGOT_PASSWORD,
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      logout,
      forgotPassword,
      resetPassword,
    }),
    [login, logout, forgotPassword, resetPassword, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
