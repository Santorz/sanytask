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
  const PageContentContainerRef = useRef<HTMLDivElement>(null);

  // States
  const [mainNavHeight, setMainNavHeight] = useState(60);
  const [addShadowBool, setAddShadowBool] = useState(false);

  // Funcs
  const setHeight = useCallback(() => {
    setMainNavHeight(MainNavRef.current.offsetHeight + 4);
  }, []);

  // useEffects
  // useEffect to monitor onscroll and add shadow to Navbar
  useEffect(() => {
    const getRect = () => {
      const pageContentTopPosition =
        PageContentContainerRef!.current.getBoundingClientRect().top;
      const halfNavHeight = MainNavRef!.current.clientHeight / 2;

      if (pageContentTopPosition < halfNavHeight && !addShadowBool) {
        setAddShadowBool(true);
      } else if (pageContentTopPosition >= halfNavHeight) {
        setAddShadowBool(false);
      }
    };

    document.addEventListener('scroll', getRect);
    return () => document.removeEventListener('scroll', getRect);
  }, [addShadowBool]);

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
      <MainNav ref={MainNavRef} addShadowBool={addShadowBool} />
      <Container
        transition='margin-top .75s ease'
        w='full'
        maxW='full'
        as='nav'
        px='0'
        mt={`${mainNavHeight}px`}
        ref={PageContentContainerRef}
      >
        {children}
      </Container>
    </>
  );
};

export default GeneralPageWrapper;
