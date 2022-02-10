import { FC, ReactNode } from 'react';
import { Flex, Heading, Skeleton, SimpleGrid, VStack } from '@chakra-ui/react';
import useResponsiveSSR from '../../../utils/useResponsiveSSR';

interface TasksSkeletonInterafce {
  number: number;
  children?: ReactNode;
}
// Skeletons for Loading State
const TasksLoaderComponent: FC<TasksSkeletonInterafce> = (props) => {
  const { number } = props;
  const { isMobile, isTabletAndAbove, isTabletOnly } = useResponsiveSSR();
  return (
    <>
      {/* Loader for mobile */}
      {isMobile && (
        <Flex
          direction='column'
          gap='4'
          w='full'
          mx='auto'
          maxW='500px'
          userSelect='none'
        >
          <Heading size='md' fontWeight='normal' textAlign='center'>
            Loading tasks...
          </Heading>

          {Array(number)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} height='70px' w='full' rounded='xl' />
            ))}
        </Flex>
      )}

      {/* Loader for tablet and above */}
      {isTabletAndAbove && (
        <VStack w='full' maxW='full' mx='auto' userSelect='none'>
          <Heading size='lg' fontWeight='normal' mb='3'>
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
                <Skeleton key={i} height='120px' w='full' rounded='xl' />
              ))}
          </SimpleGrid>
        </VStack>
      )}
    </>
  );
};

export default TasksLoaderComponent;
