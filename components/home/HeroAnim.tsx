import { FC, useCallback, useEffect, useRef, useState } from 'react';
import useMutationObservable from '../../utils/useMutationObservable';
import {
  keyframes,
  SimpleGrid,
  useColorModeValue,
  usePrefersReducedMotion,
  chakra,
  Flex,
  Heading,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { useDateFuncs } from '../../utils/dateFuncs';
import { AnimatePresence, motion } from 'framer-motion';
import { GoPrimitiveDot } from 'react-icons/go';

// Keyframes
const moveBg = keyframes`0%{background-position: center;}
50% {background-position: bottom;}
100% {background-position: center;}`;

// Chakra factory components
const CustMotionSection = chakra(motion.section);

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

  // Refs
  const animContainerRef = useRef<HTMLDivElement>(null);

  //   State Values
  const [timeArray, setTimeArray] = useState<Array<Date>>([]);

  // Custom Funcs
  const createAnimationBoxes = useCallback(() => {
    let secondsArr2 = Array.from({ length: 4 }, () =>
      Math.ceil(Math.random() * 50)
    );
    const animationDuration = 200;
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

  const handleMutation = useCallback(() => {
    const children = Array.from(animContainerRef.current.children);
    const lastChild = children[3] as HTMLDivElement;
    if (lastChild.dataset.isLate === 'true') {
      createAnimationBoxes();
    }
  }, [createAnimationBoxes]);

  // fire mutation observer hook here
  useMutationObservable(animContainerRef!.current, handleMutation);

  // useEffects
  useEffect(() => {
    createAnimationBoxes();
  }, [createAnimationBoxes]);

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
      gap={{ base: '2', lg: '7' }}
      ref={animContainerRef}
    >
      <AnimatePresence exitBeforeEnter={false}>
        {[3, 4, 5, 9].map((each, index) => {
          const isDueDateLater = !isDateBefore(timeArray[index]);

          // Main JSX
          return (
            <CustMotionSection
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              rounded='2xl'
              key={`anim-div-${index + 1}`}
              w='full'
              h={{ base: '70px', lg: '170px' }}
              bgColor={animatedTasksBgColor}
              shadow='dark-lg'
              transition='background-color .2s ease'
              py={{ base: '.8rem', lg: '.75rem' }}
              px={{ base: '1rem', lg: '.75rem' }}
              color={addColorOnTask(timeArray[index])}
              data-is-late={isDueDateLater ? undefined : true}
              userSelect='none'
              cursor={'pointer'}
            >
              <Flex justify='space-between' align='center' w='full'>
                <Heading size='sm'>
                  {getShorthandDistanceDiff(timeArray[index])}{' '}
                  {addLateorLeft(timeArray[index])}
                </Heading>

                <HStack spacing='0'>
                  <Icon
                    fontSize={{ base: '1.2rem', lg: '1.4rem' }}
                    as={GoPrimitiveDot}
                  />
                  <Icon
                    fontSize={{ base: '1.2rem', lg: '1.4rem' }}
                    as={GoPrimitiveDot}
                  />
                  <Icon
                    fontSize={{ base: '1.2rem', lg: '1.4rem' }}
                    as={GoPrimitiveDot}
                  />
                </HStack>
              </Flex>
            </CustMotionSection>
          );
        })}
      </AnimatePresence>
    </SimpleGrid>
  );
};

export default HeroAnim;
