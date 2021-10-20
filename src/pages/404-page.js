import React /*, { useContext }*/ from 'react';
import MainNav from './MainNav';
import { Container, Image } from 'semantic-ui-react';
// import { DarkThemeContext } from '..';

// CSS
import '../css/404-page.css';

// MEDIA
import error404Pic from '../media/404.svg';

const Body = () => {
  // Hooks
  // const { isDarkTheme, tealColorString } = useContext(DarkThemeContext);

  React.useEffect(() => {
    document.title = 'Error | my-next-task';
  }, []);
  return (
    <>
      <MainNav isMainPageNav={false} />
      <Container fluid className='my-primary-bg force-margin-0 min-vh-100'>
        <h2 className='text-center user-select-none my-primary-text pt-3'>
          Page not found
        </h2>
        <Image
          src={error404Pic}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          id='error-404-image'
          className='mx-auto'
          style={{ cursor: 'not-allowed' }}
          rounded
        />
      </Container>
    </>
  );
};

export default Body;
