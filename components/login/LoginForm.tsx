import {
  FC,
  FormEvent,
  useState,
  ChangeEvent,
  ChangeEventHandler,
} from 'react';
import { emailRegex, passwordRegex } from '../../utils/regexValidator';
import {
  Flex,
  useColorModeValue,
  Heading,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

// Interfaces
interface loginDetailsInterface {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  // Hooks
  const formBg = useColorModeValue('rgba(255,255,255,0.7)', 'rgba(5,5,5,0.6)');
  //   State Values
  const [loginDetails, setLoginDetails] = useState<loginDetailsInterface>({
    email: '',
    password: '',
  });

  const { email, password } = loginDetails;
  //   Vars
  const isEmailInvalid = !email.match(emailRegex);

  //   Funcs
  const processLoginInputFinal = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted stuff');
  };
  const handleChange: ChangeEventHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    let t = e.target! as HTMLInputElement;
    setLoginDetails({ ...loginDetails, [t.name.trim()]: t.value });
  };

  //   Main JSX
  return (
    <Flex
      as='main'
      direction='column'
      minH='27rem'
      bgColor={formBg}
      backdropFilter='blur(45px) saturate(280%)'
      w='full'
      maxW='550px'
      rounded='2xl'
      shadow='md'
      px={['3', '4', '4', '5']}
      py={['4', '5', '5', '6']}
    >
      <Heading as='h1' size='lg' my='1'>
        Sign in
      </Heading>
      <Heading
        as='h2'
        fontSize='1.075rem'
        my='1'
        fontWeight='normal'
        fontFamily='body'
      >
        Log in to manage your tasks.
      </Heading>

      <form
        onSubmit={processLoginInputFinal}
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          columnGap: '10px',
          marginTop: '25px',
        }}
      >
        <FormControl isInvalid={isEmailInvalid} w='full'>
          <FormLabel htmlFor='email' fontFamily='heading' fontWeight='bold'>
            Email:
          </FormLabel>
          <Input
            type='email'
            name='email'
            isRequired
            value={email}
            placeholder='Input your email here...'
            onChange={handleChange}
            colorScheme='brand'
          />
        </FormControl>
      </form>
    </Flex>
  );
};

export default LoginForm;
