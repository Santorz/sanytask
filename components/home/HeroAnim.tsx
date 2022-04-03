import {
  Box,
  keyframes,
  SimpleGrid,
  useColorModeValue,
  usePrefersReducedMotion,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useDateFuncs } from '../../utils/dateFuncs';

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
  const {
    getShorthandDistanceDiff,
    addLateorLeft,
    addColorOnTask,
    isDateBefore,
  } = useDateFuncs();

  //   State Values
  const [timeArray, setTimeArray] = useState<Array<Date>>([]);

  // useEffects
  useEffect(() => {
    let secondsArr2 = Array.from({ length: 4 }, () =>
      Math.ceil(Math.random() * 50)
    );
    const animationDuration = 120;
    const generatedSecondsSum = secondsArr2.reduce((a, b) => a + b);
    const adjustment = animationDuration / generatedSecondsSum;
    secondsArr2 =
      Math.min(...secondsArr2) >= 5
        ? secondsArr2
            .map((eachSecValue) => Math.ceil((eachSecValue *= adjustment)))
            .sort((a, b) => a - b)
        : secondsArr2
            .map((eachSecValue) => Math.ceil((eachSecValue *= adjustment)) + 5)
            .sort((a, b) => a - b);
    setTimeArray(
      secondsArr2.map(
        (eachSecond) => new Date(new Date().getTime() + eachSecond * 1000)
      )
    );
  }, []);

  useEffect(() => {
    console.log(timeArray);
  }, [timeArray]);

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
        .map((each, index) => {
          const isDueDateLater = !isDateBefore(timeArray[index]);

          // Main JSX
          return (
            isDueDateLater && (
              <Box
                rounded='2xl'
                key={index}
                w='full'
                h={{ base: '70px', lg: '170px' }}
                bgColor={animatedTasksBgColor}
                shadow='dark-lg'
                transition='background-color .2s ease'
                p='.75rem'
                color={addColorOnTask(timeArray[index])}
              >
                {getShorthandDistanceDiff(timeArray[index])}{' '}
                {addLateorLeft(timeArray[index])}
              </Box>
            )
          );
        })}
    </SimpleGrid>
  );
};

export default HeroAnim;
