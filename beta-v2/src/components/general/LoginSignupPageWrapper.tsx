import { FC, ReactNode } from 'react';

const LoginSignupPageWrapper: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div
      className={` w-full min-h-screen p-0 m-0 
      bg-[url('/images/general/nick.jpeg')] bg-[rgba(211,_211,_211,_0.5)] bg-cover bg-no-repeat bg-fixed bg-[center_27.5%]`}
    >
      <main
        className={`w-full min-h-screen p-0 m-0  bg-[rgba(255,255,255,0.4)]`}
      >
        {children}
      </main>
    </div>
  );
};

export default LoginSignupPageWrapper;
