import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
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
  const setHeight = useCallback(() => {
    setMainNavHeight(MainNavRef.current.offsetHeight + 4);
  }, []);

  useEffect(() => {
    setHeight();
  }, [setHeight]);

  useEffect(() => {
    window.addEventListener('resize', setHeight);
    return () => window.removeEventListener('resize', setHeight);
  }, [setHeight]);

  // Main JSX
  return (
    <>
      <MainNav ref={MainNavRef} />
      <Container w='full' maxW='full' as='nav' px='0' mt={`${mainNavHeight}px`}>
        {children}
      </Container>
    </>
  );
};

export default GeneralPageWrapper;
