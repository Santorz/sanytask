import { FC, ReactNode, MouseEvent } from 'react';
import { HStack, IconButton, Heading, Icon } from '@chakra-ui/react';
import { PaginatedTasksInterface } from './TasksComponent';
import useResponsiveSSR from '../../../utils/useResponsiveSSR';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

interface PaginationControllerInterface extends PaginatedTasksInterface {
  endOffset: number;
  children?: ReactNode;
  size: 'small' | 'big';
  tasksLength: number | null;
  currentPage: number;
  pageCount: number;
  handlePageChange: (event: MouseEvent<HTMLButtonElement>) => void;
}

const PaginationController: FC<PaginationControllerInterface> = (props) => {
  // Props
  const {
    tasksLength,
    handlePageChange,
    size,
    tasksPerPage,
    tasksOffset,
    endOffset,
    slicedTasks,
    currentPage,
    pageCount,
  } = props;
  props;
  const isSmall = size === 'small';

  //   Hooks
  const { isMobile } = useResponsiveSSR();

  // Mian JSx
  return (
    <>
      {tasksLength && tasksLength >= 1 && (
        <HStack
          as='section'
          align='center'
          w={isMobile ? 'full' : ''}
          justifyContent={isMobile ? 'space-between' : ''}
          spacing={
            !isMobile && !isSmall ? '16' : !isMobile && isSmall ? '8' : ''
          }
        >
          {/* Previous Button */}
          <IconButton
            variant='ghost'
            aria-label='Previous'
            colorScheme='brand'
            name='prev'
            onClick={handlePageChange}
            disabled={currentPage <= 1}
            icon={<FaChevronLeft />}
            fontSize='3xl'
            opacity={currentPage <= 1 ? '0.3 !important' : '1'}
          />
          <Heading size='sm'>
            Showing {tasksOffset + 1} to{' '}
            {slicedTasks.length < tasksPerPage
              ? slicedTasks.length + tasksOffset
              : endOffset}{' '}
            of {tasksLength} tasks
          </Heading>

          {/* Next Button */}
          <IconButton
            variant='ghost'
            aria-label='Next'
            colorScheme='brand'
            name='next'
            onClick={handlePageChange}
            disabled={currentPage >= pageCount}
            icon={<FaChevronRight />}
            fontSize='3xl'
            opacity={currentPage >= pageCount ? '0.3 !important' : '1'}
          />
        </HStack>
      )}
    </>
  );
};

export default PaginationController;
