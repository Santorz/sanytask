import { FC, ReactElement, ReactNode, useContext, KeyboardEvent } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { FaTrash, FaEdit, FaCheck, FaEllipsisH } from 'react-icons/fa';
import { TaskAlertDialogTriggerContext } from './TasksComponent';

// Options for each task
interface TaskOptionsInterface {
  children?: ReactNode;
  index: number;
  id: string;
}
const TaskOptions: FC<TaskOptionsInterface> = (props) => {
  // Props
  const { index } = props;

  // Hooks

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
        fontSize='1.5rem'
      />

      <MenuList mt='-2'>
        <CustomMenuItem {...props} icon={<FaCheck />} name='mark-done'>
          Mark as done
        </CustomMenuItem>
        <CustomMenuItem name='edit' {...props} icon={<FaEdit />}>
          Edit task
        </CustomMenuItem>
        <CustomMenuItem name='delete' {...props} icon={<FaTrash />}>
          Delete Task
        </CustomMenuItem>
      </MenuList>
    </Menu>
  );
};

// Each menu item
interface CustomMenuItemInterface {
  children: ReactNode;
  icon: ReactElement<any, any>;
  name: string;
  index: number;
  id: string;
}
const CustomMenuItem: FC<CustomMenuItemInterface> = (props) => {
  // Props
  const { children, icon, name, index, id } = props;

  // Hooks
  const { triggerTaskAlertDialog } = useContext(TaskAlertDialogTriggerContext);

  // Funcs
  const fireOptionAction = async (targetName: string, targetId: string) => {
    switch (targetName) {
      case 'mark-done':
        triggerTaskAlertDialog('mark-done', targetId);
        break;
      case 'delete':
        triggerTaskAlertDialog('delete', targetId);
        break;
      case 'edit':
        // Open edit modal
        break;

      default:
        break;
    }
  };

  // Event handlers
  const handleKeyBoard = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      e.stopPropagation();
      e.preventDefault();
      const target = e.target as HTMLButtonElement;
      fireOptionAction(target.name, id);
    }
  };

  // Main JSX
  return (
    <MenuItem
      tabIndex={0}
      name={name}
      aria-label={`${name} task ${index + 1}`}
      fontSize={{ base: '20px', md: '1.1rem' }}
      iconSpacing='4'
      type='button'
      role='button'
      onClick={(e) => {
        e.stopPropagation();
        const target = e.target as HTMLButtonElement;
        fireOptionAction(target.name, id);
      }}
      onKeyDown={handleKeyBoard}
      onKeyPress={handleKeyBoard}
      onKeyUp={handleKeyBoard}
      onKeyPressCapture={handleKeyBoard}
      onKeyUpCapture={handleKeyBoard}
      onKeyDownCapture={handleKeyBoard}
      icon={icon}
    >
      {children}
    </MenuItem>
  );
};

export default TaskOptions;
