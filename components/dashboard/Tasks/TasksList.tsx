import { FC, useContext } from 'react';
import { Container } from '@chakra-ui/react';
import { TasksContext } from '../../general/TasksConfig';
import { motion } from 'framer-motion';
import useResponsiveSSR from '../../../utils/useResponsiveSSR';
import TasksListMobile from './TasksListMobile';
import TasksListTabandAbove from './TasksListTabandDesktop';

const TasksList: FC = () => {
  // Hooks
  const tasksContextObj = useContext(TasksContext);
  const { isMobile, isTabletAndAbove } = useResponsiveSSR();

  // Framer motion page variant
  const variants = {
    hidden: {
      opacity: 0,
      x: 0,
      y: 0,
    },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 0 },
  };
  return (
    <motion.main
      initial='hidden'
      animate='enter'
      exit='exit'
      variants={variants}
      transition={{ type: 'linear', duration: '.5' }}
      key='taskslist'
    >
      <Container
        w='full'
        maxW='full'
        as='main'
        px={['2', '3', '3', '4']}
        mt='1'
      >
        {isMobile && <TasksListMobile {...tasksContextObj} />}
        {isTabletAndAbove && <TasksListTabandAbove {...tasksContextObj} />}
      </Container>
    </motion.main>
  );
};

export default TasksList;
