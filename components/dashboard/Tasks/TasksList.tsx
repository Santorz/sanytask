import { FC, ReactNode } from 'react';
import { TaskInterface } from '../../../parse-sdk/hooks';
import { Heading, VStack, Button } from '@chakra-ui/react';
import { decrypt } from '../../../utils/crypto-js-utils';

interface TasksListInterface {
  tasksArr: TaskInterface[];
  children?: ReactNode;
}

const TasksList: FC<TasksListInterface> = (props) => {
  const { tasksArr } = props;
  return (
    <>
      <VStack spacing='3' alignItems='left'>
        <Heading size='lg'>My Tasks</Heading>

        <VStack as='main' spacing='4'>
          {tasksArr.map((task, index) => {
            const { id, dueDate, title } = task;
            return (
              <Button key={id} height='70px' w='full' rounded='xl' shadow='md'>
                {decrypt(title)}
              </Button>
            );
          })}
        </VStack>
      </VStack>
    </>
  );
};

export default TasksList;
