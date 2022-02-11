import {
  FC,
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react';
import Parse from 'parse';
import { encryptWithoutUserData } from '../../utils/crypto-js-utils';

// NB: When sending to the context, you should encrypt
//     When receiving from the context, you should decrypt

// Interfaces
export interface UserLoginStateInterface {
  children?: ReactNode;
  invokeSignOut: () => void;
  setSessionExpDate: (date: string) => void;
  sessionExpDate: string;
  isUserLoggedIn: string;
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
  isLocalUserPresentFunc: () => boolean;
}

// contexts
export const UserLoginStateContext =
  createContext<UserLoginStateInterface>(null);

// Vars

// Main JSX
const UserLoginState: FC = (props) => {
  const { children } = props;

  // States
  const [userVarLib, setUserVarLib] =
    useState<
      typeof import('/opt/lampp/htdocs/my-next-task/parse-sdk/userVars')
    >(null);

  const { getSessionExpDate, isLocalUserPresentFunc, setSessionExpMain } =
    userVarLib || {};

  const [sessionExpDate, setSessionExp] = useState(
    getSessionExpDate && getSessionExpDate()
      ? encryptWithoutUserData(getSessionExpDate())
      : null
  );
  const [isUserLoggedIn, setIsLoggedIn] = useState(
    encryptWithoutUserData(
      isLocalUserPresentFunc && userVarLib && isLocalUserPresentFunc()
        ? isLocalUserPresentFunc().toString()
        : false.toString()
    )
  );

  // Funcs
  const invokeSignOut = useCallback(async () => {
    if (userVarLib && typeof window !== 'undefined') {
      localStorage.removeItem('sessionExpDate');
      await Parse.User.logOut();
      setIsLoggedIn(encryptWithoutUserData(false.toString()));
    }
  }, [userVarLib]);

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

  const setSessionExpDate = (date: string) => {
    const expDate = encryptWithoutUserData(date);
    setSessionExp(expDate);
    setSessionExpMain(expDate);
  };

  const setIsUserLoggedIn = (isUserLoggedIn: boolean) => {
    setIsLoggedIn(encryptWithoutUserData(isUserLoggedIn.toString()));
  };

  return (
    <UserLoginStateContext.Provider
      value={{
        invokeSignOut,
        sessionExpDate,
        setSessionExpDate,
        isUserLoggedIn,
        setIsUserLoggedIn,
        isLocalUserPresentFunc,
      }}
    >
      {children}
    </UserLoginStateContext.Provider>
  );
};

export default UserLoginState;
