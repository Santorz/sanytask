import { createContext, useState, useCallback } from 'react';
import Head from 'next/head';
import { Container } from '@chakra-ui/react';

// Components' Import
import NavContainer from '../../components/dashboard/DashboardNavContainer';
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
  const [dashboardHash, setDashboardHash] = useState('');

  const setHash = useCallback((name: string) => {
    setDashboardHash(name);
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard | my-next-task</title>
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
        </Container>
        {/* End of Main Dashboard Body */}
      </DashboardHashContext.Provider>
    </>
  );
};

export default Dashboard;
