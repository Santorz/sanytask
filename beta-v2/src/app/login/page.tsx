import LoginSignupPageWrapper from '@/components/general/LoginSignupPageWrapper';
import { generateMetaData } from '@/utils/meta_og_gen';
import { FC } from 'react';

export const metadata = generateMetaData(
  'Login',
  'Log in to manage yout tasks.'
);

const LoginPage: FC = () => {
  return (
    <LoginSignupPageWrapper>
      <h1>Login Page</h1>
    </LoginSignupPageWrapper>
  );
};

export default LoginPage;
