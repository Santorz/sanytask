import {
  Box,
  keyframes,
  SimpleGrid,
  useColorModeValue,
  usePrefersReducedMotion,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';

// Keyframes
const moveBg = keyframes`0%{background-position: center;}
50% {background-position: bottom;}
100% {background-position: center;}`;

/* Hero Animation Component Main */
const HeroAnim: FC = () => {
  // Hooks
  const animatedTasksBgColor = useColorModeValue('gray.200', '#222');
  const patternedBgImage = useColorModeValue(
    '/media/hero-pattern-bg-light.svg',
    '/media/hero-pattern-bg-dark.svg'
  );
  const preferReducedMotion = usePrefersReducedMotion();

  //   State Values
  const [secondsArr, setSecondsArr] = useState<Array<number>>([0, 0, 0, 0]);

  // useEffects
  //   useEffect(() => {
  //     const animationDuration = 30;
  //     const generatedSecondsSum = secondsArr.reduce((a, b) => a + b);
  //     const adjustment = animationDuration / generatedSecondsSum;
  //     setSecondsArr((previousArr) =>
  //       previousArr.map((eachSecValue) => Math.ceil((eachSecValue *= adjustment)))
  //     );
  //     console.log(secondsArr);
  //   }, []);

  // In-component animations
  const movingBgAnimation = preferReducedMotion
    ? undefined
    : `${moveBg} infinite 30s linear`;

  // Main JSX
  return (
    <SimpleGrid
      as='section'
      backgroundImage={patternedBgImage}
      h={{ base: '27.5rem', lg: '30rem' }}
      w='full'
      rounded='3xl'
      backgroundSize='cover'
      alignSelf='center'
      animation={movingBgAnimation}
      id='hero-image-animation-container'
      columns={{ base: 1, lg: 2 }}
      py='5'
      px={{ base: '3', md: '4', lg: '7' }}
      justifyContent='center'
      alignItems='center'
      spacing='7'
    >
      {Array(4)
        .fill(0)
        .map((eachArr, index) => {
          return (
            <Box
              rounded='2xl'
              key={index}
              w='full'
              h={{ base: '70px', lg: '170px' }}
              bgColor={animatedTasksBgColor}
              shadow='dark-lg'
              transition='background-color .2s ease'
            />
          );
        })}
    </SimpleGrid>
  );
};

export default HeroAnim;
