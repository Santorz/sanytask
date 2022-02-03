import Head from 'next/head';
import {
  Heading,
  Box,
  Button,
  Text,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import Logo from '../../components/general/Logo';
import { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { TasksContext } from '../../components/general/TasksConfig';
import { decrypt } from '../../utils/crypto-js-utils';

const Dashboard = () => {
  // Hooks
  const isSmartPhoneOnly = useMediaQuery({ query: '(max-width: 48em)' });
  const logoTextColor = useColorModeValue('brand.500', 'white');
  const { isTasksLoading, tasks, isError, tasksError, triggerTasksFetch } =
    useContext(TasksContext);

  return (
    <>
      <Head>
        <title>Dashboard | my-next-task</title>
      </Head>
      <Flex py='1' px={['2', '3', '3', '4']} justify='space-between'>
        {/* Logo with either horizontal or verical text */}
        {isSmartPhoneOnly && (
          <VStack>
            <Logo />
            <Heading size='xs' mt='0 !important' color={logoTextColor}>
              my-next-task
            </Heading>
          </VStack>
        )}
        {!isSmartPhoneOnly && (
          <HStack spacing='2'>
            <Logo />
            <Heading size='md' mt='0 !important' color={logoTextColor}>
              my-next-task
            </Heading>
          </HStack>
        )}
      </Flex>
      <Heading size='2xl' fontWeight='normal'>
        Dashboard
      </Heading>
      {/* This shows while loading and there's no error */}
      {isTasksLoading && !tasks && !isError && <Heading>Loading</Heading>}

      {/* This shows after loading and there's no error */}
      {!isTasksLoading &&
        !isError &&
        tasks &&
        tasks.map((task) => {
          const { id, title, dueDate } = task;
          return (
            <h1 key={id}>
              {decrypt(title)} || {new Date(dueDate).toDateString()}
            </h1>
          );
        })}

      {/* This shows if there is an error while loading*/}
      {!tasks && isError && (
        <Box>
          <Text fontSize='lg' color='red'>
            {tasksError}
          </Text>
          <Button onClick={() => triggerTasksFetch()} colorScheme='brand'>
            Retry
          </Button>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
