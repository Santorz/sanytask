import { FC } from 'react';
import {
  Button,
  Icon,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs';

const DarkModeSwitch: FC = () => {
  const { toggleColorMode } = useColorMode();
  const switchIcon = useColorModeValue(BsMoonStarsFill, BsSunFill);
  return (
    <Button
      variant='ghost'
      onClick={toggleColorMode}
      role='button'
      name='dark mode switch'
      aria-label='dark mode switch'
    >
      <Icon as={switchIcon} boxSize='1.5rem' />
    </Button>
  );
};

export default DarkModeSwitch;
