import { FC } from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

const DashboardSearch: FC = () => {
  return (
    <Button
      role='button'
      colorScheme='brand'
      variant='ghost'
      _focus={{ backgroundColor: 'none' }}
      _hover={{ backgroundColor: 'none' }}
    >
      <Icon as={FaSearch} boxSize='1.5rem' />
    </Button>
  );
};

export default DashboardSearch;
