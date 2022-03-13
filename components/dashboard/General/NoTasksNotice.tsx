import { FC } from 'react';
import {
  useColorModeValue,
  Flex,
  VStack,
  Heading,
  Button,
  Icon,
} from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';

const NoTasksNotice: FC = (props) => {
  // Hooks
  const brandColor = useColorModeValue('brand.500', 'brand.200');
  const grayColor = useColorModeValue('gray.100', 'gray.800');
  const grayColorInverted = useColorModeValue('#1A202C', '#E2E8F0');

  //   Bools

  // Main JSX
  return (
    <Flex
      align='center'
      justify='space-around'
      minH='22.5rem'
      w='97.5%'
      maxW='500px'
      direction='column'
      rounded='2xl'
      bgColor={grayColor}
      shadow='md'
      p='2'
      userSelect='none'
      mx='auto'
    >
      <>
        <VStack spacing='5' mt='5'>
          <Icon boxSize='10rem' color={brandColor}>
            <FaCheck />
          </Icon>
          <Heading size='md' color={grayColorInverted}>
            {`You don't have any tasks`}
          </Heading>
        </VStack>
        <Button colorScheme='brand'>Create New Task</Button>
      </>
    </Flex>
  );
};

export default NoTasksNotice;
