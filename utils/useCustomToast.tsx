import { useCallback, FC, ReactNode } from 'react';
import {
  useToast,
  HStack,
  Spinner,
  Heading,
  useColorModeValue,
  Icon,
  Flex,
  Button,
} from '@chakra-ui/react';
import { FaRegCheckCircle, FaTimes } from 'react-icons/fa';
import { BsExclamationOctagon, BsInfoCircle } from 'react-icons/bs';

// End of import statements

export type toastType =
  | 'login'
  | 'logout'
  | 'register'
  | 'logout'
  | 'error'
  | 'error2'
  | 'success'
  | 'success2'
  | 'info'
  | 'info2';
type toastMsg = string;

// Main Hook
export const useCustomToast = () => {
  // Hooks
  const toast = useToast();
  const primaryColor = useColorModeValue('black', 'gray.50');
  const inversePrimaryColor = useColorModeValue('gray.50', 'black');
  const themeBg = useColorModeValue(
    'rgba(255,255,255,0.8)',
    'rgba(5,5,5,0.75)'
  );
  const successColor = useColorModeValue('green.500', 'green.200');
  const errorColor = useColorModeValue('red.500', 'red.200');
  const brandColor = useColorModeValue('brand.500', 'brand.200');
  const infoColor = useColorModeValue('blue.500', 'blue.200');

  // switch function for text colors
  const switchTextColor = useCallback(
    (toastType: toastType) => {
      switch (toastType) {
        case 'login':
          return brandColor;
        case 'logout':
          return inversePrimaryColor;
        case 'register':
          return brandColor;
        case 'success':
          return inversePrimaryColor;
        case 'success2':
          return successColor;
        case 'info':
          return infoColor;
        case 'error':
          return inversePrimaryColor;
        case 'error2':
          return errorColor;
        case 'info':
          return inversePrimaryColor;
        case 'info2':
          return infoColor;
        default:
          return primaryColor;
      }
    },
    [
      inversePrimaryColor,
      brandColor,
      primaryColor,
      infoColor,
      successColor,
      errorColor,
    ]
  );

  // switch function for background colors
  const switchBgColor = useCallback(
    (toastType: toastType) => {
      switch (toastType) {
        case 'login':
          return themeBg;
        case 'logout':
          return brandColor;
        case 'register':
          return themeBg;
        case 'success':
          return successColor;
        case 'success2':
          return inversePrimaryColor;
        case 'info':
          return infoColor;
        case 'error':
          return errorColor;
        case 'error2':
          return inversePrimaryColor;
        case 'info':
          return infoColor;
        case 'info2':
          return inversePrimaryColor;
        default:
          return themeBg;
      }
    },
    [
      successColor,
      themeBg,
      infoColor,
      inversePrimaryColor,
      errorColor,
      brandColor,
    ]
  );

  // Main showToast function
  const showCustomToast = useCallback(
    (toastType: toastType, toastMsg?: toastMsg) => {
      toast({
        position: 'top-right',
        render: ({ onClose }) => (
          <HStack
            userSelect='none'
            right='0'
            spacing='5'
            ml='auto'
            maxW='400px'
            bgColor={switchBgColor(toastType)}
            color={switchTextColor(toastType)}
            px='3'
            py='4'
            rounded='md'
            backdropFilter='blur(5px)'
            shadow='sm'
          >
            <ToastContent
              toastType={toastType}
              toastMsg={toastMsg}
              onClose={onClose}
            />
          </HStack>
        ),
        duration: toastMsg !== 'login' && toastMsg !== 'register' ? 5000 : null,

        isClosable: toastMsg ? true : false,
      });
    },
    [toast, switchTextColor, switchBgColor]
  );

  // Close all function
  const closeAllToasts = useCallback(() => {
    toast.closeAll();
  }, [toast]);

  // Returns
  return { showCustomToast, closeAllToasts };
};

//
//
// Toast Content Component
//Interface for props
interface ToastContentInterface {
  toastType: toastType;
  toastMsg: toastMsg;
  onClose: () => void;
}

// Toast Content Component
const ToastContent: FC<ToastContentInterface> = (props) => {
  const { toastType, toastMsg, onClose } = props;
  return (
    <Flex justify='space-between' align='center' w='full'>
      {toastContentSwitcher(toastType, toastMsg ? toastMsg : null)}
      {toastMsg && (
        <Button
          bg='transparent'
          p='0'
          m='0'
          textAlign='center'
          onClick={onClose}
        >
          <Icon as={FaTimes} boxSize='1.2rem' />
        </Button>
      )}
    </Flex>
  );
};

// Toast Content switcher
const toastContentSwitcher: (
  toastType: toastType,
  toastMsg?: toastMsg
) => ReactNode = (toastType: toastType, toastMsg?: toastMsg) => {
  switch (toastType) {
    case 'login':
      return (
        <HStack as='section'>
          <Spinner size='sm' mr='0.5' />
          <Heading fontSize='1.175rem' fontWeight='semibold'>
            Logging in...
          </Heading>
        </HStack>
      );
    case 'logout':
      return (
        <HStack as='section'>
          <Spinner size='sm' mr='0.5' />
          <Heading fontSize='1.175rem' fontWeight='semibold'>
            Logging out...
          </Heading>
        </HStack>
      );
    case 'register':
      return (
        <HStack as='section'>
          <Spinner size='sm' mr='0.5' />
          <Heading fontSize='1.175rem' fontWeight='semibold'>
            Registering your account
          </Heading>
        </HStack>
      );
    case 'success':
      return (
        <HStack as='section'>
          <Icon as={FaRegCheckCircle} boxSize='1.75rem' mr='0.5' />
          <Heading fontSize='1.175rem' fontWeight='semibold'>
            {toastMsg ? toastMsg : 'Success'}
          </Heading>
        </HStack>
      );
    case 'success2':
      return (
        <HStack as='section'>
          <Icon as={FaRegCheckCircle} boxSize='1.5rem' mr='0.5' />
          <Heading fontSize='1.175rem' fontWeight='semibold'>
            {toastMsg ? toastMsg : 'Success'}
          </Heading>
        </HStack>
      );
    case 'error':
      return (
        <HStack as='section'>
          <Icon as={BsExclamationOctagon} boxSize='1.5rem' mr='0.5' />
          <Heading fontSize='1.175rem' fontWeight='semibold'>
            {toastMsg ? toastMsg : 'Error'}
          </Heading>
        </HStack>
      );
    case 'error2':
      return (
        <HStack as='section'>
          <Icon as={BsExclamationOctagon} boxSize='1.5rem' mr='0.5' />
          <Heading fontSize='1.175rem' fontWeight='semibold'>
            {toastMsg ? toastMsg : 'Error'}
          </Heading>
        </HStack>
      );
    case 'info':
      return (
        <HStack as='section'>
          <Icon as={BsInfoCircle} boxSize='1.5rem' mr='0.5' />
          <Heading fontSize='1.175rem' fontWeight='semibold'>
            {toastMsg ? toastMsg.toString() : 'Error'}
          </Heading>
        </HStack>
      );
    case 'info2':
      return (
        <HStack as='section'>
          <Icon as={BsInfoCircle} boxSize='1.5rem' mr='0.5' />
          <Heading fontSize='1.175rem' fontWeight='semibold'>
            {toastMsg ? toastMsg : 'Error'}
          </Heading>
        </HStack>
      );
    default:
      return (
        <HStack as='section'>
          <Heading fontSize='1.175rem'>Hello</Heading>
        </HStack>
      );
  }
};
