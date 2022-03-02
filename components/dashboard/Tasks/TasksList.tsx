import { FC, ReactNode } from 'react';
import { TaskInterface } from '../../../parse-sdk/hooks';
import EachTaskMobile from './EachTaskMobile';
import { Heading, VStack } from '@chakra-ui/react';

interface TasksListInterface {
  tasksArr: TaskInterface[];
  children?: ReactNode;
}

const TasksList: FC<TasksListInterface> = (props) => {
  const { tasksArr } = props;
  return (
    <>
      <VStack spacing='1.5' alignItems='left'>
        <Heading fontSize='1.3rem' pl='2' fontWeight='normal' fontFamily='body'>
          My Tasks
        </Heading>
        <VStack as='main' spacing='4' px='0.5'>
          {tasksArr.map((task, index) => {
            const { id, dueDate, title } = task;
            return <EachTaskMobile key={id} {...task} index={index} />;
          })}
        </VStack>
      </VStack>
    </>
  );
};

export default TasksList;
