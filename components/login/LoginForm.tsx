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
  InputGroup,
  InputLeftElement,
  Icon,
  Button,
} from '@chakra-ui/react';
import { MdMail, MdLock } from 'react-icons/md';

// Interfaces
interface loginDetailsInterface {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  // Hooks
  const formBg = useColorModeValue('rgba(255,255,255,0.7)', 'rgba(5,5,5,0.6)');
  const borderColor = useColorModeValue('#006080', '#24c8ff');
  //   State Values
  const [loginDetails, setLoginDetails] = useState<loginDetailsInterface>({
    email: '',
    password: '',
  });

  const { email, password } = loginDetails;
  //   Vars
  const isEmailInvalid = email && !email.match(emailRegex);
  const isPasswordInvalid = password && !password.match(passwordRegex);

  //   Funcs
  const processLoginInputFinal = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email && !password && !isEmailInvalid && !isPasswordInvalid) {
      alert('Submitted stuff');
    }
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
      maxW='500px'
      rounded='2xl'
      shadow='md'
      px={['3', '6', '9', '12']}
      py={['4', '5', '7', '6']}
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
          marginTop: '25px',
          justifyContent: 'space-between',
          height: '100%',
          paddingBottom: '1rem',
        }}
      >
        <section
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          {/* Email form control element */}
          <FormControl isInvalid={isEmailInvalid} w='full' isRequired>
            <FormLabel htmlFor='email' fontFamily='heading' fontWeight='bold'>
              Email:
            </FormLabel>
            <InputGroup d='flex' alignItems='center'>
              <InputLeftElement pointerEvents='none' top='unset'>
                <Icon as={MdMail} boxSize='1.5rem' />
              </InputLeftElement>

              <Input
                type='email'
                name='email'
                isRequired
                value={email}
                placeholder='Input your email here...'
                onChange={handleChange}
                size='lg'
                borderColor={borderColor}
                _hover={{ borderColor: `${borderColor} !important` }}
              />
            </InputGroup>
          </FormControl>
          {/*  */}

          {/* Password form control element */}
          <FormControl isInvalid={isPasswordInvalid} w='full' isRequired>
            <FormLabel
              htmlFor='password'
              fontFamily='heading'
              fontWeight='bold'
            >
              Password:
            </FormLabel>
            <InputGroup d='flex' alignItems='center'>
              <InputLeftElement pointerEvents='none' top='unset'>
                <Icon as={MdLock} boxSize='1.5rem' />
              </InputLeftElement>

              <Input
                type='password'
                name='password'
                isRequired
                value={password}
                placeholder='Input your password here...'
                onChange={handleChange}
                size='lg'
                borderColor={borderColor}
                _hover={{ borderColor: `${borderColor} !important` }}
              />
            </InputGroup>
          </FormControl>
          {/*  */}
        </section>

        {/* Sign in button element */}
        <Button
          loadingText='Signing you in'
          spinnerPlacement='start'
          type='submit'
          w='full'
          colorScheme='brand'
          variant='solid'
          fontSize='1.2rem'
          mt='auto'
        >
          Sign in
        </Button>
        {/*  */}
      </form>
    </Flex>
  );
};

export default LoginForm;
