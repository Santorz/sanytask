import { FC, ReactNode } from 'react';
import { TaskInterface } from '../../../parse-sdk/hooks';
import { Heading, Flex, VStack, SimpleGrid } from '@chakra-ui/react';
import EachTaskDesktop from './EachTaskDesktop';

interface TasksGridInterface {
  tasksArr: TaskInterface[];
  children?: ReactNode;
}

const TasksGrid: FC<TasksGridInterface> = (props) => {
  const { tasksArr } = props;
  return (
    <>
      <VStack spacing='3' alignItems='left'>
        <Flex alignItems='center' justify='space-between'>
          <Heading size='lg' fontWeight='normal' fontFamily='body'>
            My Tasks
          </Heading>
        </Flex>

        <SimpleGrid
          columns={{ md: 2, lg: 3, xl: 4 }}
          w='full'
          spacingX={{ md: '20', lg: '6', xl: '5' }}
          spacingY='8'
          alignItems='center'
          justifyContent='space-evenly'
        >
          {tasksArr.map((task, index) => {
            const { id } = task;
            return <EachTaskDesktop key={id} index={index} {...task} />;
          })}
        </SimpleGrid>
      </VStack>
    </>
  );
};

export default TasksGrid;
