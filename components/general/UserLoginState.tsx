import {
  FC,
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react';
import Parse from 'parse';
import { useRouter } from 'next/router';
import { useCustomToast } from '../../utils/useCustomToast';
import { encryptWithoutUserData } from '../../utils/crypto-js-utils';

// NB: When sending to the context, you should encrypt
//     When receiving from the context, you should decrypt

// Interfaces
export interface UserLoginStateInterface {
  children?: ReactNode;
  invokeSignOut: () => void;
  setSessionExpDate: (date: string) => void;
  sessionExpDate: string;
  encLoggedInString: string;
  setEncLoggedInString: (encLoggedInString: boolean) => void;
  isLocalUserPresentFunc: () => boolean;
}

// contexts
export const UserLoginStateContext =
  createContext<UserLoginStateInterface>(null);

// Vars

// Main JSX
const UserLoginState: FC = (props) => {
  const { children } = props;

  // Hooks
  const { showCustomToast, closeAllToasts } = useCustomToast();
  const router = useRouter();

  // States
  const [userVarLib, setUserVarLib] = useState(null);

  const { getSessionExpDate, isLocalUserPresentFunc, setSessionExpMain } =
    userVarLib || {};

  const [sessionExpDate, setSessionExp] = useState(
    getSessionExpDate && getSessionExpDate()
      ? encryptWithoutUserData(getSessionExpDate())
      : null
  );
  const [encLoggedInString, setIsLoggedIn] = useState(
    encryptWithoutUserData(
      Parse.User.current() ? true.toString() : false.toString()
    )
  );

  // Funcs
  const invokeSignOut = useCallback(async () => {
    if (userVarLib && typeof window !== 'undefined') {
      localStorage.removeItem('sessionExpDate');
      closeAllToasts();
      showCustomToast('logout');
      await Parse.User.logOut();
      setIsLoggedIn(encryptWithoutUserData(false.toString()));
      closeAllToasts();
      router.push('/');
    }
  }, [userVarLib, showCustomToast, closeAllToasts, router]);

  // useEffects
  useEffect(() => {
    (async () => {
      if (typeof window !== 'undefined') {
        const userVarLib = await import('../../parse-sdk/userVars');
        setUserVarLib(userVarLib);
      }
    })();
  }, [userVarLib]);

  // Funcs
  const setSessionExpDate = useCallback(
    (date: string) => {
      const expDate = encryptWithoutUserData(date);
      setSessionExp(expDate);
      setSessionExpMain(expDate);
    },
    [setSessionExpMain]
  );

  const setEncLoggedInString = useCallback((encLoggedInString: boolean) => {
    setIsLoggedIn(encryptWithoutUserData(encLoggedInString.toString()));
  }, []);

  return (
    <UserLoginStateContext.Provider
      value={{
        invokeSignOut,
        sessionExpDate,
        setSessionExpDate,
        encLoggedInString,
        setEncLoggedInString,
        isLocalUserPresentFunc,
      }}
    >
      {children}
    </UserLoginStateContext.Provider>
  );
};

export default UserLoginState;