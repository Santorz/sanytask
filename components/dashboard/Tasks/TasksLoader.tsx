import { FC, ReactNode } from 'react';
import { Flex, Heading, Skeleton, SimpleGrid, VStack } from '@chakra-ui/react';
import useResponsiveSSR from '../../../utils/useResponsiveSSR';

interface TasksSkeletonInterafce {
  number: number;
  children?: ReactNode;
}
// Skeletons for Loading State
const TasksLoaderComponent: FC<TasksSkeletonInterafce> = (props) => {
  const { number, children } = props;
  const { isMobile, isTabletAndAbove, isTabletOnly } = useResponsiveSSR();
  return (
    <>
      {isMobile && (
        <Flex direction='column' gap='4' w='full'>
          <Heading size='md' fontWeight='normal'>
            Loading tasks...
          </Heading>

          {Array(number)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} height='50px' w='full' rounded='xl' />
            ))}
        </Flex>
      )}

      {isTabletAndAbove && (
        <VStack w='full' maxW='full'>
          <Heading size='lg' fontWeight='normal'>
            Loading tasks...
          </Heading>
          <SimpleGrid
            columns={isTabletOnly ? 3 : 4}
            w='full'
            gap='5'
            spacingY='7'
          >
            {Array(number)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} height='160px' w='full' rounded='xl' />
              ))}
          </SimpleGrid>
        </VStack>
      )}
    </>
  );
};

export default TasksLoaderComponent;
