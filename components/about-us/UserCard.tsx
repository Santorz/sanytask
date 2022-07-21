import {
  VStack,
  Image,
  Box,
  useColorModeValue,
  Heading,
  Text,
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { UserInfoInterface } from './OurTeam';

// Interface
interface UserCardInterface {
  children?: ReactNode;
  userInfo: UserInfoInterface;
}

// Main Component
const UserCard: FC<UserCardInterface> = (props) => {
  // Props
  const {
    userInfo: { name, position, imageLink },
  } = props;

  // Hooks
  const brandColor = useColorModeValue('brand.500', 'brand.300');
  const cardBgColor = useColorModeValue(
    'rgb(250 250 250 / 50%)',
    'rgb(0 0 0 / 50%)'
  );

  // Main JSX
  return (
    <VStack
      as='article'
      rounded='md'
      border='1px solid'
      borderColor={brandColor}
      spacing='0'
    >
      {/* User's image */}
      <Image
        alt={`${name} image 1`}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        src={imageLink}
        htmlHeight='240px'
        htmlWidth='180px'
        objectFit='cover'
      />

      {/* User's  name and position */}
      <VStack
        shadow='dark-lg'
        roundedBottom='md'
        spacing='5px'
        p='1'
        bgColor={cardBgColor}
        backdropFilter='blur(15px) saturate(180%)'
      >
        <Heading size='sm' as='h3'>
          {name}
        </Heading>
        <Text fontSize='0.85rem' lineHeight='1.35' as='h6'>
          {position}
        </Text>
      </VStack>
    </VStack>
  );
};

export default UserCard;
