import { FC, ReactNode, MouseEvent } from 'react';
import { HStack, Button } from '@chakra-ui/react';
import useResponsiveSSR from '../../../utils/useResponsiveSSR';

interface PaginationControllerInterface {
  children?: ReactNode;
  size: 'small' | 'big';
  tasksLength: number | null;
  handlePageChange: (event: MouseEvent<HTMLButtonElement>) => void;
}

const PaginationController: FC<PaginationControllerInterface> = (props) => {
  // Props
  const { tasksLength, handlePageChange, size } = props;
  const isSmall = size === 'small';

  //   Hooks
  const { isMobile } = useResponsiveSSR();

  // Mian JSx
  return (
    <>
      {tasksLength && tasksLength > 0 && (
        <HStack
          w={isMobile ? 'full' : ''}
          justifyContent={isMobile ? 'space-between' : ''}
          spacing={
            !isMobile && !isSmall ? '24' : !isMobile && isSmall ? '12' : ''
          }
        >
          <Button>Previous</Button>
          <Button>Next</Button>
        </HStack>
      )}
    </>
  );
};

export default PaginationController;
