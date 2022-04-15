import { FC, useContext } from 'react';
import { useColorModeValue, HStack } from '@chakra-ui/react';
import { decryptWithoutUserData } from '../../utils/crypto-js-utils';
import { UserLoginStateContext } from '../general/UserLoginState';
import CustomLink from '../general/CustomLink';

const CTALinks: FC = () => {
  const brandColor = useColorModeValue('brand.500', 'brand.200');
  const inversePrimaryColor = useColorModeValue('gray.50', 'black');
  const primaryColor = useColorModeValue('black', 'gray.50');
  const { encLoggedInString } = useContext(UserLoginStateContext);
  const isUserLoggedInDecrypted =
    decryptWithoutUserData(encLoggedInString) === 'true';

  //   Main JSX
  return (
    <HStack py='2' spacing='7'>
      {/* If user is logged in */}
      {isUserLoggedInDecrypted && (
        <CustomLink
          color={inversePrimaryColor}
          href='/dashboard'
          px='5'
          py='2.5'
          fontSize='lg'
          fontWeight='bold'
          rounded='3xl'
          bgColor={brandColor}
        >
          Visit Dashboard
        </CustomLink>
      )}

      {/* If user is logged out*/}
      {!isUserLoggedInDecrypted && (
        <>
          <CustomLink
            color={inversePrimaryColor}
            href='/signup'
            px='5'
            py='2.5'
            fontSize='lg'
            fontWeight='bold'
            rounded='3xl'
            bgColor={brandColor}
            transition='color .2s ease'
          >
            Get Started
          </CustomLink>
          {/*  */}
          <CustomLink
            color={primaryColor}
            href='/login'
            px='5'
            py='2.5'
            fontSize='lg'
            fontWeight='bold'
            rounded='full'
            border='2px solid'
            borderColor={brandColor}
          >
            Log in
          </CustomLink>
        </>
      )}
    </HStack>
  );
};

export default CTALinks;
