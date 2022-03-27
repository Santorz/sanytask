import React, {
  createContext,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
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
import TaskForm from '../Tasks/TaskForm';
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
  setViewModalSwipeHandler: (
    func: (direction: viewTaskModalSwipeDirectionType) => void
  ) => void;
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

//
//
// Main Component
const TaskModalGeneric: FC<TaskModalGenericInterface> = ({ hash }) => {
  // Hooks
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const bgColor = useColorModeValue(
    'rgba(255,255,255,0.75)',
    'rgba(55,55,55,0.75)'
  );
  const overlayBgColor = useColorModeValue(
    'rgb(100 100 100 / 20%)',
    'rgb(0 0 0 / 20%)'
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
    delta: 100,
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

  // Arrow key handler useEffect
  useEffect(() => {
    function changeTaskonArrowKeyPress(ev: globalThis.KeyboardEvent) {
      if (ev.key === 'ArrowRight' && isHashView) {
        handleViewModalSwipe('left');
      }
      if (ev.key === 'ArrowLeft' && isHashView) {
        handleViewModalSwipe('right');
      }
    }
    window.addEventListener('keydown', changeTaskonArrowKeyPress);

    return () =>
      window.removeEventListener('keydown', changeTaskonArrowKeyPress);
  }, [handleViewModalSwipe, isHashView]);

  // Main JSX
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseMain}
      scrollBehavior={isHashView ? 'inside' : 'outside'}
      onEsc={onCloseMain}
      onOverlayClick={onCloseMain}
      size='full'
    >
      <ModalOverlay
        d='flex'
        justifyContent='space-between'
        backgroundColor={overlayBgColor}
        backdropFilter='blur(12px) saturate(180%)'
      />
      {/* view-task modal swipe handler context provider */}
      <ViewTaskModalSwipeHandlerContext.Provider
        value={{ handleViewModalSwipe, setViewModalSwipeHandler }}
      >
        {/* Modal Content */}
        <ModalContent
          bgColor={bgColor}
          w={{
            base: 'full',
            lg: isHashNeworEdit ? 'full' : '85%',
          }}
          my={{ base: '0', lg: isHashNeworEdit ? '0' : '3' }}
          rounded={{ base: 'none', lg: 'xl' }}
          shadow={{ base: 'none', lg: 'lg' }}
          maxW={isHashNeworEdit ? 'full' : '1200px'}
          backdropFilter='blur(11.5px) saturate(180%)'
          {...(isHashView ? swipeHandlers : {})}
          py='0'
        >
          <ModalHeader
            pb='0'
            py='2'
            fontSize='1.35rem'
            d='flex'
            justifyContent='right'
            alignItems='center'
            textAlign='right'
          >
            <IconButton
              onClick={onCloseMain}
              fontSize='2rem'
              aria-label='Close New Task Modal'
              icon={<FaTimes />}
              variant='ghost'
            />
          </ModalHeader>

          <ModalBody p='1.5'>
            {/* New task form */}
            {isHashNeworEdit && <TaskForm formType={hash} />}
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
        {/* Icon button on desktop to imitate swipe left */}
      </ViewTaskModalSwipeHandlerContext.Provider>
      {/* end of view-task modal swipe handler context provider */}
    </Modal>
  );
};

export default TaskModalGeneric;
