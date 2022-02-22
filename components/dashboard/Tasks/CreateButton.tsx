import { FC } from 'react';
import { Button, Icon, Heading } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

const CreateButton: FC = () => {
  return (
    <Button
      variant='outline'
      colorScheme='brand'
      alignSelf='flex-end'
      mr='2'
      name='Create new task'
      aria-label='Create new task'
      rounded='3xl'
      size='lg'
      fontSize='xl'
      d='flex'
      alignItems='center'
      gap='1.5'
      borderWidth='2px'
    >
      <Icon as={FaPlus} />
      <Heading size='md'>New task</Heading>
    </Button>
  );
};

export default CreateButton;
