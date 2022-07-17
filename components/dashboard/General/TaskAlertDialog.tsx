import {
  FC,
  useCallback,
  useRef,
  useState,
  useContext,
  useEffect,
  ReactNode,
  MutableRefObject,
} from 'react';
import {
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogFooter,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  TaskAlertDialogTriggerContext,
  dialog_action_type,
} from '../Tasks/TasksComponent';
import { deleteTask, markTaskDone } from '../../../utils/taskFuncs';
import { useCustomToast } from '../../../utils/useCustomToast';

const TaskAlertDialog: FC = () => {
  // Hooks
  const { setAlertDialogTrigger } = useContext(TaskAlertDialogTriggerContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue(
    'rgba(250,250,250,0.75)',
    'rgba(0,0,0,0.6)'
  );
  const overlayBgColor = useColorModeValue(
    'rgb(8 51 85 / 25%)',
    'rgb(0 56 88 / 10%)'
  );
  //   Refs
  const cancelRef = useRef();
  //   State values
  const [actionName, setActionName] = useState<dialog_action_type>(null);
  const [taskId, setTaskId] = useState<string>(null);

  //   Funcs
  const mainOpen = useCallback(
    () => (actionName: dialog_action_type, id: string) => {
      onOpen();
      setActionName(actionName);
      setTaskId(id);
    },
    [onOpen]
  );
  const mainClose = useCallback(() => {
    setActionName(null);
    setTaskId(null);
    onClose();
  }, [onClose]);

  // useEffects
  useEffect(() => {
    setAlertDialogTrigger(mainOpen);
  }, [mainOpen, setAlertDialogTrigger]);

  // Main JSX
  return (
    <>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        onClose={mainClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay
          backdropFilter='blur(15px) saturate(180%)'
          backgroundColor={overlayBgColor}
        />

        <AlertDialogContent
          userSelect='none'
          mt={{ base: '10', md: '-4' }}
          bgColor={bgColor}
          backdropFilter='blur(20px) saturate(180%)'
        >
          <CustomDialogHeader actionName={actionName} />
          <AlertDialogCloseButton />
          <CustomDialogBody actionName={actionName} />
          <AlertDialogFooter>
            <CustomDialogButton
              onClose={mainClose}
              cancelRef={cancelRef}
              id={taskId}
              actionName={actionName}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

interface custHeaderandBodyInterface {
  children?: ReactNode;
  actionName: dialog_action_type;
}
interface custBtnInterface extends custHeaderandBodyInterface {
  id: string;
  cancelRef: MutableRefObject<undefined>;
  onClose: () => void;
}
const CustomDialogHeader: FC<custHeaderandBodyInterface> = (props) => {
  const { actionName } = props;
  return (
    <AlertDialogHeader>
      {actionName === 'delete'
        ? `${actionName.charAt(0).toUpperCase() + actionName.slice(1)} Task`
        : actionName === 'mark-done'
        ? 'Mark task as done'
        : actionName}{' '}
      ?
    </AlertDialogHeader>
  );
};

const CustomDialogBody: FC<custHeaderandBodyInterface> = (props) => {
  const { actionName } = props;
  return (
    <AlertDialogBody>
      {actionName === 'delete' ? (
        <>
          Are you sure you want to delete this task? <br /> This action cannot
          be undone.
        </>
      ) : actionName === 'mark-done' ? (
        <>
          Are you sure you want to mark this task as done? <br /> It will be
          removed from your list of tasks.
        </>
      ) : (
        `Are you sure you want to ${actionName}?`
      )}
    </AlertDialogBody>
  );
};
const CustomDialogButton: FC<custBtnInterface> = (props) => {
  // Props
  const { actionName, id, cancelRef, onClose } = props;

  // Hooks
  const { showCustomToast, closeAllToasts } = useCustomToast();

  // Funcs
  // main delete function
  const mainDelete = useCallback(
    async (id: string) => {
      showCustomToast(
        'process2',
        actionName === 'delete'
          ? 'Deleting task'
          : actionName === 'mark-done'
          ? 'Marking task as done...'
          : actionName
      );
      onClose();
      const { status, message } = await deleteTask(id);
      if (status === 'success') {
        closeAllToasts();
        showCustomToast('success', 'Task deleted successfully');
      } else {
        closeAllToasts();
        showCustomToast('error', 'Failed to delete task');
      }
    },
    [actionName, closeAllToasts, onClose, showCustomToast]
  );

  // main mark-done function
  const mainMarkDone = useCallback(
    async (id: string) => {
      showCustomToast('process2', 'Marking task as done...');
      onClose();
      const { status, message } = await markTaskDone(id);
      if (status === 'success') {
        closeAllToasts();
        showCustomToast('success', 'Task marked as done successfully');
      } else {
        closeAllToasts();
        showCustomToast('error', 'Failed to marked task as done ');
      }
    },
    [closeAllToasts, onClose, showCustomToast]
  );

  // Main JSX
  return (
    <>
      <Button
        colorScheme=''
        color={useColorModeValue('black', 'white.50')}
        ref={cancelRef}
        onClick={onClose}
      >
        No
      </Button>

      {/* Confirmation buttons */}
      {actionName === 'delete' ? (
        <>
          <Button colorScheme='red' ml={3} onClick={() => mainDelete(id)}>
            Yes
          </Button>
        </>
      ) : actionName === 'mark-done' ? (
        <>
          <Button colorScheme='brand' ml={3} onClick={() => mainMarkDone(id)}>
            Yes
          </Button>
        </>
      ) : (
        <Button ml={3} onClick={onClose}>
          Yes
        </Button>
      )}
    </>
  );
};

export default TaskAlertDialog;
