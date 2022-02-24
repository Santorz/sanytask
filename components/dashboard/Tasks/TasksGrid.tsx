import { FC, ReactNode } from 'react';
import { TaskInterface } from '../../../parse-sdk/hooks';
import { Heading, Button, VStack, SimpleGrid } from '@chakra-ui/react';
import { decrypt } from '../../../utils/crypto-js-utils';

interface TasksGridInterface {
  tasksArr: TaskInterface[];
  children?: ReactNode;
}

const TasksGrid: FC<TasksGridInterface> = (props) => {
  const { tasksArr } = props;
  return (
    <>
      <VStack spacing='3' alignItems='left'>
        <Heading size='lg'>My Tasks</Heading>

        <SimpleGrid columns={{ md: 3, lg: 4 }} w='full' gap='5' spacingY='7'>
          {tasksArr.map((task, index) => {
            const { id, dueDate, title } = task;
            return (
              <Button key={id} height='120px' w='full' rounded='xl' shadow='md'>
                {decrypt(title)}
              </Button>
            );
          })}
        </SimpleGrid>
      </VStack>
    </>
  );
};

export default TasksGrid;
