import {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';
import { decryptWithoutUserData } from '../../utils/crypto-js-utils';
import { UserLoginStateContext } from '../../components/general/UserLoginState';
import Parse from 'parse';

// Components' Import
import Head from 'next/head';
import NavContainer from '../../components/dashboard/DashboardNavContainer';
import { Container } from '@chakra-ui/react';
import TasksList from '../../components/dashboard/Tasks/TasksList';
import TasksCalendar from '../../components/dashboard/Tasks/TasksCalendar';
import { AnimatePresence } from 'framer-motion';

// Context Interfaces
interface DashboardHashContextInterface {
  setHash: (name: string) => void;
  dashboardHash: string;
}
const dashboardContextDefaults = {
  setHash: () => {},
  dashboardHash: '',
};

// Contexts
export const DashboardHashContext =
  createContext<DashboardHashContextInterface>(dashboardContextDefaults);

const Dashboard = () => {
  // Hooks
  const { isUserLoggedIn, setSessionExpDate } = useContext(
    UserLoginStateContext
  );
  const router = useRouter();

  // States
  const [dashboardHash, setDashboardHash] = useState('');

  // Custom setState funcs
  const setHash = useCallback((name: string) => {
    setDashboardHash(name);
  }, []);

  // useEffects
  useEffect(() => {
    const isLoggedInBool =
      isUserLoggedIn !== null &&
      decryptWithoutUserData(isUserLoggedIn) === 'true';

    if (!isLoggedInBool) {
      router.replace({
        pathname: '/',
        query: `src=dashboard&reason='isLoggedOut`,
      });
    }

    if (!localStorage.getItem('sessionExpDate') && isLoggedInBool) {
      // Set session expiry date in local storage
      Parse.Session.current()
        .then((session) => {
          if (isUserLoggedIn) {
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
  }, [isUserLoggedIn, router, setSessionExpDate]);

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
          <NavContainer />
          {/* End of Nav Container */}

          {/* Main Dashboard Body */}
          <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            {dashboardHash === '' && <TasksList />}
            {dashboardHash === 'calendar' && <TasksCalendar />}
          </AnimatePresence>
          {/* End of Main Dashboard Body */}
        </Container>
      </DashboardHashContext.Provider>
    </>
  );
};

export default Dashboard;
