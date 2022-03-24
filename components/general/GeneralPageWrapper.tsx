import { FC, ReactNode, useRef } from 'react';
import MainNav from './MainNav';
import { Container } from '@chakra-ui/react';

interface GeneralPageWrapperInterface {
  foooterType: 'small' | 'big';
  children?: ReactNode;
}
// Man Component
const GeneralPageWrapper: FC<GeneralPageWrapperInterface> = (props) => {
  // Props
  const { children } = props;
  // Refs
  const MainNavRef = useRef<HTMLDivElement>(null);

  // Main JSX
  return (
    <>
      <MainNav ref={MainNavRef} />
      <Container
        w='full'
        maxW='full'
        as='nav'
        // px={['2', '4', '4', '8']}
      >
        {children}
      </Container>
    </>
  );
};

export default GeneralPageWrapper;
