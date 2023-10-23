import { FC } from 'react';
import {
  SimpleGrid,
  VStack,
  Heading,
  Icon,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { BsShieldLock } from 'react-icons/bs';
import { AiOutlineSync } from 'react-icons/ai';
import { GiCheckMark } from 'react-icons/gi';

// General Interfaces
interface EachFeatureInterface {
  heading: string;
  icon: IconType;
  text: string;
}

const AppFeatures: FC = () => {
  // Vars
  const featureArray: EachFeatureInterface[] = [
    {
      heading: 'Simplicity',
      icon: GiCheckMark,
      text: `With the high degree of abstraction we implement, you only see what is needful. We make things as straightforward as possible. Getting things done wouldn't be a hassle - the app is tailored just for YOU.`,
    },
    {
      heading: 'Encryption',
      icon: BsShieldLock,
      text: `Our robust encryption algorithm makes things easy on your end but difficult for the 'bad guys.' Trust us when we say you're the only one that can comprehend your tasks' data. No one else does - NOT EVEN US.`,
    },
    {
      heading: 'Real-time access',
      icon: AiOutlineSync,
      text: `The system stores tasks in a real-time remote database, and you can access them on the fly. In addition, the system reflects all modifications immediately. So you'll always stay up-to-date on your tasks.`,
    },
  ];

  // Main JSX
  return (
    <VStack
      px={['2', '3', '4', '4', '8']}
      mt={{ base: '20', md: '36', lg: '40' }}
      spacing={{ base: '10', md: '12', lg: '16' }}
      userSelect='none'
      mb='5'
    >
      <Heading as='h2' fontSize='2.45rem'>
        Our key features
      </Heading>

      <SimpleGrid
        as='section'
        w='full'
        columns={{ base: 1, md: 3 }}
        py={{ base: '4', lg: '5' }}
        spacingY={{ base: '12', md: '0' }}
        spacingX={{ base: '0', md: '10' }}
      >
        {featureArray.map((feature, index) => {
          const { heading, icon, text } = feature;
          return (
            <EachFeature
              key={index}
              heading={heading}
              icon={icon}
              text={text}
            />
          );
        })}
      </SimpleGrid>
    </VStack>
  );
};

const EachFeature: FC<EachFeatureInterface> = (props) => {
  // Props
  const { heading, icon, text } = props;
  const brandColor = useColorModeValue('brand.500', 'brand.100');
  const grayColor = useColorModeValue('gray.600', 'gray.300');

  // Main JSX
  return (
    <VStack
      justifyContent='left'
      alignItems='flex-start'
      as='article'
      spacing='5'
    >
      <Icon
        as={icon}
        fontSize={{ base: '3.5rem', lg: '4rem' }}
        color={brandColor}
        alignSelf={{ base: 'center', md: 'start', lg: 'center' }}
      />
      <Heading
        fontSize='3xl'
        as='h3'
        alignSelf={{ base: 'center', md: 'start', lg: 'center' }}
      >
        {heading}
      </Heading>
      <Text fontSize='lg' color={grayColor} lineHeight='2rem'>
        {text}
      </Text>
    </VStack>
  );
};

export default AppFeatures;
