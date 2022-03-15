import { createContext, FC, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';
import NewTaskForm from '../Tasks/NewTaskForm';
import ModalTaskDetails from '../Tasks/ModalTaskDetails';
import { FaTimes } from 'react-icons/fa';
import { useSwipeable } from 'react-swipeable';

interface TaskModalGenericInterface {
  hash: 'new' | 'view' | 'edit';
}

// Everything that relates to view modal handler
export type viewTaskModalSwipeDirectionType = 'left' | 'right';
interface viewTaskModalSwipeHandlerInterface {
  handleViewModalSwipe: (direction: viewTaskModalSwipeDirectionType) => void;
  setViewModalSwipeHandler: (func: () => void) => void;
}
const initialAlertDialogTrigger = (
  direction: viewTaskModalSwipeDirectionType
) => {};
const viewTaskModalSwipeHandlerDefaults = {
  handleViewModalSwipe: initialAlertDialogTrigger,
  setViewModalSwipeHandler: () => {},
};
// Contexts
export const ViewTaskModalSwipeHandlerContext =
  createContext<viewTaskModalSwipeHandlerInterface>(
    viewTaskModalSwipeHandlerDefaults
  );
// End of view modal handler stuffs

// Main Component
const TaskModalGeneric: FC<TaskModalGenericInterface> = ({ hash }) => {
  // Hooks
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const bgColor = useColorModeValue(
    'rgb(118 221 255 / 40%)',
    'rgb(0 96 128 / 40%)'
  );
  const overlayBgColor = useColorModeValue(
    'rgba(250,250,250,0.5)',
    'rgba(0,0,0,0.5)'
  );

  // State Values
  const [handleViewModalSwipe, setHandler] = useState(
    () => initialAlertDialogTrigger
  );

  // Special funcs
  const setViewModalSwipeHandler = useCallback(
    (func: (direction: viewTaskModalSwipeDirectionType) => void) => {
      setHandler(func);
    },
    []
  );

  // Swipeable Handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: (e) => handleViewModalSwipe(e.dir.toLowerCase() as 'left'),
    onSwipedRight: (e) => handleViewModalSwipe(e.dir.toLowerCase() as 'right'),
    delta: 50,
  });

  // Bools
  const isHashNeworEdit = hash === 'new' || hash === 'edit';
  const isHashView = hash === 'view';

  // custom funcs
  const onCloseMain = () => {
    onClose();
    setTimeout(() => {
      router.replace('/dashboard');
    }, 100);
  };

  // useEffects
  useEffect(() => {
    onOpen();
  }, [onOpen]);

  // Main JSX
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseMain}
      scrollBehavior='inside'
      onEsc={onCloseMain}
      onOverlayClick={onCloseMain}
      size='full'
    >
      <ModalOverlay
        backgroundColor={overlayBgColor}
        backdropFilter='blur(7.5px) saturate(180%)'
      />
      {/* view-task modal swipe handler context provider */}
      <ViewTaskModalSwipeHandlerContext.Provider
        value={{ handleViewModalSwipe, setViewModalSwipeHandler }}
      >
        <ModalContent
          bgColor={bgColor}
          w={{
            base: 'full',
            lg: isHashNeworEdit ? 'full' : '85%',
          }}
          my={{ base: '0', lg: isHashNeworEdit ? '0' : '3' }}
          rounded={{ base: 'none', lg: 'xl' }}
          shadow={{ base: 'none', lg: 'dark-lg' }}
          maxW={isHashNeworEdit ? 'full' : '1200px'}
          backdropFilter='blur(11.5px) saturate(180%)'
          {...(isHashView ? swipeHandlers : {})}
        >
          <ModalHeader
            pb='0'
            py='1'
            fontSize='1.35rem'
            d='flex'
            justifyContent='right'
            alignItems='center'
          >
            <IconButton
              onClick={onCloseMain}
              fontSize='2rem'
              aria-label='Close New Task Modal'
              icon={<FaTimes />}
              variant='ghost'
            />
          </ModalHeader>

          <ModalBody px='1.5'>
            {/* New task form */}
            {hash === 'new' && <NewTaskForm />}
            {/*  */}
            {/* Task Details form */}
            {hash === 'view' && <ModalTaskDetails />}
            {/*  */}
          </ModalBody>

          {/* <ModalFooter>
          <Button
            aria-label='Close New Task Modal'
            colorScheme='brand'
            mr={3}
            onClick={() => onCloseMain()}
          >
            Close
          </Button>
        </ModalFooter> */}
        </ModalContent>
        {/*  */}
      </ViewTaskModalSwipeHandlerContext.Provider>
      {/* end of view-task modal swipe handler context provider */}
    </Modal>
  );
};

export default TaskModalGeneric;
