import { useCallback, FC } from 'react';
import {
  useToast,
  HStack,
  Spinner,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

type toastType = 'login' | 'register' | 'logout' | 'error' | 'success';
type toastMsg = string;
type bgColor = string;

export const useCustomToast = () => {
  // Hooks
  const toast = useToast();
  const primaryTextColor = useColorModeValue('black', 'gray.50');

  const showCustomToast = useCallback(
    (toastType: toastType, bgColor?: bgColor, toastMsg?: toastMsg) => {
      toast({
        position: 'top-right',
        render:
          toastType === 'login'
            ? () => (
                <HStack
                  right='0'
                  spacing='5'
                  ml='auto'
                  maxW='200px'
                  bgColor={bgColor ? bgColor : undefined}
                  color={primaryTextColor}
                  p='3'
                  rounded='lg'
                  backdropFilter='blur(5px)'
                >
                  <ToastContent toastType={toastType} />
                </HStack>
              )
            : null,

        duration: toastType === 'login' ? 10000 : 5000,

        isClosable: toastMsg && true,
      });
    },
    [toast, primaryTextColor]
  );

  // Close all function
  const closeAllToasts = useCallback(() => {
    toast.closeAll();
  }, [toast]);

  // Returns
  return { showCustomToast, closeAllToasts };
};

interface ToastContentInterface {
  toastType: toastType;
}
const ToastContent: FC<ToastContentInterface> = (props) => {
  const { toastType } = props;
  return (
    <>
      {toastType === 'login' ? (
        <>
          <Spinner size='sm' />
          <Heading size='md'>Signing in...</Heading>
        </>
      ) : (
        ''
      )}
    </>
  );
};
