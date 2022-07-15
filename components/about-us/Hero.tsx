import { FC } from 'react';
import { Flex, Heading } from '@chakra-ui/react';

const Hero: FC = () => {
  return (
    <Flex
      px={['2', '3', '4', '4', '8']}
      direction={{ base: 'column', md: 'row' }}
      as='header'
      maxW='full'
      align='start'
      pt={{ base: '4', sm: '5', lg: '8', xl: '10' }}
      gap='2rem'
      pb='2rem'
      w='full'
    >
      <Heading w='full' textAlign='center'>
        About Us
      </Heading>
    </Flex>
  );
};

export default Hero;
