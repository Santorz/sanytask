import { FC } from 'react';
import { Button, Icon, Heading } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

const CreateButton: FC = () => {
  return (
    <Button
      colorScheme='brand'
      alignSelf='flex-end'
      mr='2'
      name='Create new task'
      aria-label='Create new task'
      rounded='full'
      size='lg'
      fontSize='1.5rem'
      d='flex'
      alignItems='center'
      gap='1.5'
      shadow='xl'
    >
      <Icon as={FaPlus} />
      <Heading size='md'>New</Heading>
    </Button>
  );
};

export default CreateButton;
