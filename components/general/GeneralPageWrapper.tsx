import { FC, ReactNode, useEffect, useRef, useState } from 'react';
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

  // States
  const [mainNavHeight, setMainNavHeight] = useState(0);

  // Funcs
  const setHeight = () => {
    setMainNavHeight(MainNavRef.current.clientHeight);
  };
  useEffect(() => {
    setHeight();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', setHeight);
    return () => window.removeEventListener('resize', setHeight);
  }, []);

  // Main JSX
  return (
    <>
      <MainNav ref={MainNavRef} />
      <Container
        w='full'
        maxW='full'
        as='nav'
        // px={['2', '4', '4', '8']}
        mt={`${mainNavHeight}px`}
      >
        {children}
      </Container>
    </>
  );
};

export default GeneralPageWrapper;
