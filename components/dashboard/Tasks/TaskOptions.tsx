import { FC, ReactNode, useState } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { FaTrash, FaEdit, FaCheck, FaEllipsisH } from 'react-icons/fa';
import useResponsiveSSR from '../../../utils/useResponsiveSSR';

interface TaskOptionsInterface {
  children?: ReactNode;
  index: number;
  id: string;
}

const TaskOptions: FC<TaskOptionsInterface> = ({ index, id }) => {
  // Hooks
  const { isMobile } = useResponsiveSSR();

  // Main JSX
  return (
    <Menu placement='bottom-end'>
      <MenuButton
        alignSelf='center'
        lineHeight='1rem'
        role='button'
        aria-label={`Task ${index + 1} options`}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onKeyDown={(e) => {
          if (e.code === 'Enter' || e.code === 'Space') {
            e.stopPropagation();
          }
        }}
        as={IconButton}
        variant='ghost'
        h='25px'
        p='0'
        icon={<FaEllipsisH />}
        mb={{ base: '0', md: '2' }}
      />

      <MenuList>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
          }}
          icon={<FaCheck />}
        >
          Mark as done
        </MenuItem>
        <MenuItem icon={<FaEdit />}>Edit task</MenuItem>
        <MenuItem icon={<FaTrash />}>Delete Task</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default TaskOptions;
