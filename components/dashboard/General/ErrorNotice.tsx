import { FC, ReactNode } from 'react';
import Link from 'next/link';
import {
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Image,
  Icon,
  Link as ChakraLink,
  useColorModeValue,
} from '@chakra-ui/react';
import { RiRefreshLine } from 'react-icons/ri';

interface ErrorNoticeInterface {
  tasksError: string;
  triggerTasksFetch: () => void;
}

const ErrorNotice: FC<ErrorNoticeInterface> = (props) => {
  const { tasksError, triggerTasksFetch } = props;

  // Hooks
  const redColor = useColorModeValue('red.500', 'red.200');
  //   const brandColor = useColorModeValue('brand.500', 'brand.200');
  const grayColor = useColorModeValue('gray.100', 'gray.800');
  const grayColorInverted = useColorModeValue('#1A202C', '#E2E8F0');

  //   Bools
  const isLoginError = tasksError && tasksError === 'not-logged-in';
  const isOtherError = tasksError && tasksError !== 'not-logged-in';

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
      {isLoginError && (
        <>
          <VStack spacing='5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='120'
              height='120'
              viewBox='0 0 50 50'
              style={{ fill: `${grayColorInverted}` }}
            >
              <path d='M25,3c-6.6,0-12,5.4-12,12v5H9c-1.7,0-3,1.3-3,3v24c0,1.7,1.3,3,3,3h32c1.7,0,3-1.3,3-3V23c0-1.7-1.3-3-3-3h-4v-5	C37,8.4,31.6,3,25,3z M25,5c5.6,0,10,4.4,10,10v5H15v-5C15,9.4,19.4,5,25,5z M25,30c1.7,0,3,1.3,3,3c0,0.9-0.4,1.7-1,2.2V38	c0,1.1-0.9,2-2,2s-2-0.9-2-2v-2.8c-0.6-0.5-1-1.3-1-2.2C22,31.3,23.3,30,25,30z'></path>
            </svg>
            <Heading size='md' color={redColor}>
              Hi, it seems you&#39;re not logged in
            </Heading>
          </VStack>
          <HStack spacing='28'>
            <CustLink href='/login' type='brand'>
              Log in
            </CustLink>
            <CustLink href='/signup' type='gray'>
              Sign up
            </CustLink>
          </HStack>
        </>
      )}
      {isOtherError && (
        <>
          <VStack spacing='2'>
            <Image
              h='125'
              alt=''
              src='/media/tasks-error-main.svg'
              filter='grayscale(0.3)'
            />
            <Heading color={redColor} size='md'>
              An Error Occured
            </Heading>
            <Text color={grayColorInverted}>
              {tasksError.includes(':') ? tasksError.split(':')[1] : tasksError}
            </Text>
          </VStack>
          <Button
            minW='120px'
            display='flex'
            alignItems='center'
            onClick={() => triggerTasksFetch()}
            colorScheme='brand'
            justifyContent='space-around'
          >
            <Icon boxSize='1.5rem' as={RiRefreshLine} />
            <Heading size='md'>Retry</Heading>
          </Button>
        </>
      )}
    </Flex>
  );
};

interface CustLinkInterface {
  children?: ReactNode;
  type: 'brand' | 'gray';
  href: string;
}
const CustLink: FC<CustLinkInterface> = (props) => {
  const { type, children, href } = props;
  //   Hooks
  const brandColor = useColorModeValue('brand.500', 'brand.50');
  const grayColor = useColorModeValue('gray.800', 'gray.100');
  const primColor = useColorModeValue('gray.50', 'gray.800');
  return (
    <Link href={href} passHref>
      <ChakraLink
        display='inline-block'
        rounded='lg'
        my='3'
        py='3'
        px='5'
        position='relative'
        bg={
          type === 'brand'
            ? brandColor
            : type === 'gray'
            ? grayColor
            : 'inherit'
        }
        color={primColor}
      >
        <Heading size='sm' fontFamily='body'>
          {children}
        </Heading>
      </ChakraLink>
    </Link>
  );
};

export default ErrorNotice;
