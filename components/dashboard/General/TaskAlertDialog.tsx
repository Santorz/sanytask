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
import { deleteTask } from '../../../utils/taskFuncs';
import { useCustomToast } from '../../../utils/useCustomToast';

const TaskAlertDialog: FC = () => {
  // Hooks
  const { setAlertDialogTrigger } = useContext(TaskAlertDialogTriggerContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('rgba(250,250,250,0.6)', 'rgba(0,0,0,0.6)');
  const overlayBgColor = useColorModeValue(
    'rgb(118 221 255 / 10%)',
    'rgb(0 96 128 / 10%)'
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
          backdropFilter='blur(10px)'
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
  const mainDelete = async (id: string) => {
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
      showCustomToast(
        'success',
        actionName === 'delete'
          ? 'Task deleted successfully'
          : actionName === 'mark-done'
          ? 'Task marked as done successfully'
          : actionName
      );
    } else {
      closeAllToasts();
      showCustomToast(
        'error',
        actionName === 'delete'
          ? 'Failed to delete task'
          : actionName === 'mark-done'
          ? 'Failed to marked task as done '
          : actionName
      );
    }
  };

  // Main JSX
  return (
    <>
      <Button ref={cancelRef} onClick={onClose}>
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
          <Button colorScheme='brand' ml={3} onClick={() => mainDelete(id)}>
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
