import {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { useRouter } from 'next/router';
import useResponsiveSSR from '../../utils/useResponsiveSSR';
import { decryptWithoutUserData } from '../../utils/crypto-js-utils';
import { UserLoginStateContext } from '../../components/general/UserLoginState';
import Parse from 'parse';

// Components' Import
import Head from 'next/head';
import NavContainer from '../../components/dashboard/DashboardNavContainer';
import { Container } from '@chakra-ui/react';
import TasksSubpage from '../../components/dashboard/Tasks/TasksSubpage';
import CalendarSubpage from '../../components/dashboard/Calendar/CalendarSubpage';
import { AnimatePresence } from 'framer-motion';

// Normal Interfaces
export interface SubPageInterface {
  height: number;
  mbValue: number;
  mainNavHeight: number;
}

// Context Interfaces
interface DashboardHashContextInterface {
  setHash: (name: string) => void;
  dashboardHash: string;
}
const dashboardContextDefaults = {
  setHash: () => {},
  dashboardHash: '',
};

interface fixedMobileNavHeightContextInterface {
  setFixedNavHeight: (height: number) => void;
  fixedMobileNavHeight: number;
}
const fixedMobileNavHeightContextDefaults = {
  setFixedNavHeight: () => {},
  fixedMobileNavHeight: 0,
};

// Contexts
export const DashboardHashContext =
  createContext<DashboardHashContextInterface>(dashboardContextDefaults);
export const FixedMobileNavHeightContext =
  createContext<fixedMobileNavHeightContextInterface>(
    fixedMobileNavHeightContextDefaults
  );

//
// Main Dashboard Component
const Dashboard = () => {
  // Hooks
  const { encLoggedInString, setSessionExpDate } = useContext(
    UserLoginStateContext
  );
  const router = useRouter();
  const { isMobile } = useResponsiveSSR();

  // Refs
  const navContainerRef = useRef<HTMLDivElement>(null);

  // States
  const [dashboardHash, setDashboardHash] = useState('');
  const [fixedMobileNavHeight, setFixedMobileNavHeight] = useState(0);
  const [subPagesHeight, setSubPagesHeight] = useState(0);
  const [mainNavHeight, setMainNavHeight] = useState(0);
  // const [subPagesProps, setSubPagesProps] = useState({
  //   height: 0,
  //   mbValue: 0,
  //   mainNavHeight: 0,
  // });

  // Custom setState funcs
  const setHash = useCallback((name: string) => {
    setDashboardHash(name);
  }, []);
  const setFixedNavHeight = useCallback((height: number) => {
    setFixedMobileNavHeight(height);
  }, []);

  // useEffects

  // set subpages height
  useEffect(() => {
    const setRespHeights = () => {
      const navHeightOnly = navContainerRef.current.clientHeight;
      setMainNavHeight(navHeightOnly);
      setSubPagesHeight(
        isMobile
          ? window.innerHeight - mainNavHeight - fixedMobileNavHeight
          : window.innerHeight - mainNavHeight
      );
    };
    setRespHeights();
    window.addEventListener('resize', setRespHeights);
    return () => window.removeEventListener('resize', setRespHeights);
  }, [fixedMobileNavHeight, isMobile, mainNavHeight]);

  // set encoded session expiry date
  useEffect(() => {
    const isLoggedInBool =
      encLoggedInString !== null &&
      decryptWithoutUserData(encLoggedInString) === 'true';

    if (!localStorage.getItem('sessionExpDate') && isLoggedInBool) {
      // Set session expiry date in local storage
      Parse.Session.current()
        .then((session) => {
          if (encLoggedInString) {
            setSessionExpDate(
              new Date(session.attributes.expiresAt).toISOString()
            );
          } else {
            //
          }
        })
        .catch((err: Error) => {
          console.log(err.message);
        });
    }
  }, [encLoggedInString, router, setSessionExpDate]);

  //usEffect to prevent hash change if user is not logged in
  useEffect(() => {
    const isLoggedInBool =
      encLoggedInString !== null &&
      decryptWithoutUserData(encLoggedInString) === 'true';

    const checkandPrevent = () => {
      if (!isLoggedInBool) {
        router.events.emit('routeChangeError');
        throw 'Hash change is not allowed';
      }
    };

    router.events.on('hashChangeStart', checkandPrevent);

    return () => router.events.off('hashChangeStart', checkandPrevent);
  }, [encLoggedInString, router]);

  // Vars
  const subPagesProps = {
    height: subPagesHeight,
    mbValue: isMobile ? fixedMobileNavHeight : 0,
    mainNavHeight: mainNavHeight,
  };

  // Main JSX
  return (
    <>
      <Head>
        <title>Dashboard | my-next-task</title>
        <meta
          name='description'
          content="Your tasks' dashboard is where you create, edit, modiify and organize your tasks. It includes a calendar where you can see the tasks for each day. You can also manage your account in the dashboard. Feel free to explore the dashboard."
        />
      </Head>

      <DashboardHashContext.Provider value={{ setHash, dashboardHash }}>
        <Container w='full' m='0' maxWidth='100%' p='0'>
          {/* Nav Container */}
          <FixedMobileNavHeightContext.Provider
            value={{
              setFixedNavHeight,
              fixedMobileNavHeight,
            }}
          >
            <NavContainer ref={navContainerRef} />
            {/* End of Nav Container */}
          </FixedMobileNavHeightContext.Provider>

          {/* Main Dashboard Body */}
          <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            {dashboardHash === '' && <TasksSubpage {...subPagesProps} />}
            {dashboardHash === 'calendar' && (
              <CalendarSubpage {...subPagesProps} />
            )}
          </AnimatePresence>
          {/* End of Main Dashboard Body */}
        </Container>
      </DashboardHashContext.Provider>
    </>
  );
};

export default Dashboard;
