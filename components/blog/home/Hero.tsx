import { FC } from 'react';
import { Heading, VStack } from '@chakra-ui/react';

const Hero: FC = () => {
  return (
    <VStack spacing='8' pt='6' userSelect='none'>
      <Heading size='md'>Our blog</Heading>

      <VStack spacing='4' px='2'>
        <Heading w='full' as='h1' textAlign='center'>
          Tips, Tricks and Guides
        </Heading>
        <Heading
          w='full'
          as='h3'
          textAlign='center'
          size='sm'
          fontFamily='body'
          fontWeight='normal'
        >
          The latest news to task management and productivity
        </Heading>
      </VStack>
    </VStack>
  );
};

export default Hero;
