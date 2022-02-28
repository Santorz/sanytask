import { FC, useEffect } from 'react';
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
import { useRouter } from 'next/router';
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
        backdropFilter='blur(12px)'
        backgroundColor={overlayBgColor}
      />
      <ModalContent rounded='none' bgColor={bgColor} h='100vh'>
        <ModalHeader
          fontSize='1.75rem'
          d='flex'
          justifyContent='space-between'
          alignItems='center'
        >
          Create New Task
          <IconButton
            onClick={onCloseMain}
            fontSize='2rem'
            aria-label='Close New Task Modal'
            icon={<FaTimes />}
            variant='ghost'
          />
        </ModalHeader>
        <ModalBody textAlign='justify'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
          non, quos, mollitia enim numquam laudantium quas dolorum perspiciatis
          dolor pariatur quis unde impedit ad assumenda quibusdam, dolorem quam?
          Nisi, quam tempore quasi repellat, nihil natus voluptatem eveniet
          aspernatur id est dolorem cum aut asperiores minus inventore
          temporibus et mollitia ab ipsum voluptatibus expedita? Dolor labore
          consequuntur soluta rem odit explicabo quo neque laudantium,
          perferendis est nesciunt laboriosam nulla blanditiis quis. Laudantium
          tempore beatae blanditiis itaque consequatur voluptatem facilis,
          ratione doloribus sequi quod, dolores optio suscipit deserunt
          voluptate distinctio repellendus recusandae id repudiandae consectetur
          quaerat ea dignissimos corrupti vero tempora. Reiciendis hic sapiente
          soluta enim facilis ratione, reprehenderit quidem error minus vitae
          veritatis praesentium neque voluptas ducimus, dolor eligendi quod
          consequuntur ullam? Harum, libero. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Ipsum maiores, nisi est minima corporis
          error enim qui suscipit debitis voluptatibus laborum dignissimos harum
          ut facere? Maiores modi sapiente velit nostrum. Lorem ipsum, dolor sit
          amet consectetur adipisicing elit. Repellendus suscipit in debitis
          unde exercitationem, maiores omnis voluptas quidem quibusdam. Officiis
          repellat minima facilis, molestias laudantium porro vero. Tempore odio
          perspiciatis accusantium dolorum minima rem voluptatum! Eum sed quia
          suscipit ad amet, animi, tempore expedita quas vel veritatis harum,
          delectus quis eius perferendis minima impedit quibusdam laudantium
          dolore dolor voluptatum neque quos? Ad, sapiente ex. Sint unde
          sapiente fuga voluptas doloribus.
        </ModalBody>
        <ModalFooter>
          <Button
            aria-label='Close New Task Modal'
            colorScheme='brand'
            mr={3}
            onClick={() => onCloseMain()}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewTaskModal;
