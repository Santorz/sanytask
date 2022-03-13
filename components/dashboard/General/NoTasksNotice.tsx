import { FC } from 'react';
import { useRouter } from 'next/router';
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
  const { push } = useRouter();

  //   Bools

  // Main JSX
  return (
    <Flex align='center' justify='space-around'>
      <>
        <VStack
          spacing='5'
          justifyContent='center'
          bgColor={grayColor}
          minH='22.5rem'
          w='97.5%'
          maxW='500px'
          direction='column'
          rounded='2xl'
          shadow='md'
          p='2'
          userSelect='none'
          mx='auto'
          mt='3.5rem !important'
        >
          <Icon
            boxSize='7.5rem'
            color={brandColor}
            textAlign='center'
            as={FaCheck}
          />

          <Heading size='md' color={grayColorInverted}>
            {`You don't have any tasks`}
          </Heading>
          <Button colorScheme='brand' onClick={() => push('/dashboard#new')}>
            Create New Task
          </Button>
        </VStack>
      </>
    </Flex>
  );
};

export default NoTasksNotice;
