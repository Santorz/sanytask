import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  useColorModeValue,
  Button,
  IconButton,
} from '@chakra-ui/react';
import NewTaskForm from '../Tasks/NewTaskForm';
import { FaTimes } from 'react-icons/fa';

const NewTaskModal: FC = () => {
  // Hooks
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const bgColor = useColorModeValue(
    'rgb(118 221 255 / 25%)',
    'rgb(0 96 128 / 25%)'
  );
  const overlayBgColor = useColorModeValue(
    'rgba(250,250,250,0.15)',
    'rgba(0,0,0,0.15)'
  );

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
        backdropFilter='blur(15px) saturate(180%)'
        backgroundColor={overlayBgColor}
      />
      <ModalContent rounded='none' bgColor={bgColor} h='100vh'>
        <ModalHeader
          fontSize='1.5rem'
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
        <ModalBody px='1'>
          <NewTaskForm />
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
    </Modal>
  );
};

export default NewTaskModal;
