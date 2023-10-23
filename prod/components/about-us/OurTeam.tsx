import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import UserCard from './UserCard';
import { FC } from 'react';

// Interfaces
export interface UserInfoInterface {
  name: string;
  position: string;
  imageLink: string;
}

const OurTeam: FC = () => {
  // Hooks

  // Vars
  const userInfoArray: UserInfoInterface[] = [
    {
      name: 'Saint Tarila-Brisbe',
      position: 'Founder and Solo Developer',
      imageLink: '/media/about-us/users/saint.jpg',
    },
  ];

  // Main JSX
  return (
    <Box as='section' mt='16' pb='4'>
      <Heading id='team' pb='4' as='h2' w='full' textAlign='center'>
        Meet Our Team
      </Heading>

      <SimpleGrid
        w={{ base: '95%', lg: 'full' }}
        as='section'
        columns={{ base: 2, sm: 3, lg: 4 }}
        spacingY={{ base: '40px', sm: '60px' }}
        alignContent='space-between'
        justifyContent='space-around'
        mt='1.5rem !important'
        mb='2rem !important'
        mx='auto'
        maxW={{ base: '575px', lg: '800px' }}
        minH='200px'
        userSelect='none'
      >
        <>
          {userInfoArray.map((userInfo, index) => {
            return (
              <>
                <UserCard key={index} userInfo={userInfo} />
              </>
            );
          })}
        </>
      </SimpleGrid>
    </Box>
  );
};

export default OurTeam;
