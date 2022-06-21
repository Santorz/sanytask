import { FC, ReactNode } from 'react';
import {
  chakra,
  Flex,
  useColorModeValue,
  Text,
  VisuallyHidden,
  Box,
  Container,
  Stack,
  SimpleGrid,
} from '@chakra-ui/react';
import { FaFacebookF, FaEnvelope } from 'react-icons/fa';
import CustomLink from './CustomLink';
import AppStoreBadge from './AppStoreBadge';
import PlayStoreBadge from './PlayStoreBadge';

// Mai Footer Component
interface FooterInterface {
  footerType: 'small' | 'big';
}
const Footer: FC<FooterInterface> = ({ footerType }) => {
  // Prop bools
  const isFooterTypeBig = footerType === 'big';

  //   Hooks
  const footerBg = useColorModeValue('#0E1C21', '#060D10');

  return (
    <chakra.footer w='full' bgColor={footerBg}>
      {isFooterTypeBig && (
        <Flex
          as='nav'
          role='navigation'
          w='full'
          transition='background-color .2s ease'
          justify='space-evenly'
          direction={{ base: 'column', md: 'row' }}
          align='flex-start'
          p='2'
          userSelect={'none'}
        >
          {/* Main footer */}
          <Container as={Stack} maxW={'6xl'} py={10}>
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 4 }}
              spacing={8}
              color='white'
            >
              <Stack align={'flex-start'}>
                <ListHeader>Company</ListHeader>
                <CustomLink href={'/about'}>About Us</CustomLink>
                <CustomLink href={'/blog'}>Blog</CustomLink>
                <CustomLink href={'/donate'}>Donate</CustomLink>
              </Stack>

              <Stack align={'flex-start'}>
                <ListHeader>Support</ListHeader>
                <CustomLink href={'/help'}>Help Center</CustomLink>
                <CustomLink href={'/contact'}>Contact Us</CustomLink>
              </Stack>

              <Stack align={'flex-start'}>
                <ListHeader>Legal</ListHeader>
                <CustomLink href={'/help/ad-policy'}>Ad Policy</CustomLink>
                <CustomLink href={'/help/cookie-policy'}>
                  Cookie Policy
                </CustomLink>
              </Stack>

              <Stack align={'flex-start'}>
                <ListHeader>Install App</ListHeader>
                <Stack position='relative' spacing='0'>
                  <AppStoreBadge />
                  <PlayStoreBadge />
                  <Flex
                    position='absolute'
                    w='full'
                    h='full'
                    align='center'
                    justify='center'
                    bg='rgba(0,0,0,.55)'
                    rounded='md'
                    backdropFilter='blur(2px)'
                  >
                    Coming Soon..
                  </Flex>
                </Stack>
              </Stack>
            </SimpleGrid>
          </Container>
          {/*  */}
        </Flex>
      )}

      {/* Base footer */}
      <Box bgColor={useColorModeValue('blackAlpha.400', 'blackAlpha.300')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column-reverse', md: 'row' }}
          spacing={4}
          justify={{ md: 'space-between' }}
          align={{ md: 'center' }}
        >
          <Text color='white'>
            © {new Date().getFullYear()} my-next-task . All rights reserved
          </Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton
              label={'Our facebook page'}
              href={'https://www.facebook.com/my.next.task'}
            >
              <FaFacebookF />
            </SocialButton>
            <SocialButton
              label={'Our facebook page'}
              href={'mailto:info@my-next-task.com'}
            >
              <FaEnvelope />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
      {/*  */}
    </chakra.footer>
  );
};

const ListHeader: FC<{children:ReactNode}> = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

interface SocialButtonInterface {
  label: string;
  href: string;
  children: ReactNode;
}
const SocialButton: FC<SocialButtonInterface> = ({ label, href, children }) => {
  return (
    <chakra.button
      bg='blackAlpha.100'
      color='white'
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      aria-label={label}
      href={href}
      target='_blank'
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default Footer;
