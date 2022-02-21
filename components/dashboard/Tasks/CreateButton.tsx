import { FC, ReactNode } from 'react';
import { IconButton } from '@chakra-ui/react';
import { FaPlusCircle } from 'react-icons/fa';

const CreateButton: FC = () => {
  return (
    <IconButton
      colorScheme='brand'
      alignSelf='flex-end'
      mr='5'
      name='Create new task'
      aria-label='Create new task'
      fontSize='5xl'
      rounded='full'
      size='lg'
      icon={<FaPlusCircle />}
    />
  );
};

export default CreateButton;
