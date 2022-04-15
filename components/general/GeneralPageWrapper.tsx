import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import MainNav from './MainNav';
import { Container } from '@chakra-ui/react';

// Dynamically Loaded Components
const Footer = dynamic(() => import('./Footer'));

interface GeneralPageWrapperInterface {
  footerType: 'small' | 'big';
  children?: ReactNode;
}
// Man Component
const GeneralPageWrapper: FC<GeneralPageWrapperInterface> = (props) => {
  // Props
  const { children, footerType } = props;
  // Refs
  const MainNavRef = useRef<HTMLDivElement>(null);
  const PageContentContainerRef = useRef<HTMLDivElement>(null);

  // States
  const [mainNavHeight, setMainNavHeight] = useState(77);
  const [addShadowBool, setAddShadowBool] = useState(false);

  // Funcs
  const setHeight = useCallback(() => {
    setMainNavHeight(MainNavRef.current!.offsetHeight + 10);
  }, [MainNavRef]);

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
        px='0'
        mt={`${mainNavHeight}px`}
        ref={PageContentContainerRef}
        minH='79vh'
      >
        {children}
      </Container>
      <Footer footerType={footerType} />
    </>
  );
};

export default GeneralPageWrapper;
