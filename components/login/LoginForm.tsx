import {
  FC,
  FormEvent,
  useState,
  ChangeEvent,
  ChangeEventHandler,
} from 'react';
import { logUserIn } from '../../parse-sdk/actions';
import { emailRegex, passwordRegex } from '../../utils/regexValidator';
import { UserLoginStateInterface } from '../general/UserLoginState';
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
  FormErrorMessage,
} from '@chakra-ui/react';
import { MdMail, MdLock } from 'react-icons/md';
import Parse from 'parse';

// Interfaces
interface loginDetailsInterface {
  email: string;
  password: string;
}

const LoginForm: FC<UserLoginStateInterface> = (props) => {
  // Hooks
  const {
    setIsUserLoggedIn,
    isUserLoggedIn,
    setSessionExpDate,
    isLocalUserPresentFunc,
  } = props;

  const formBg = useColorModeValue('rgba(255,255,255,0.8)', 'rgba(5,5,5,0.6)');
  const borderColor = useColorModeValue('#006080', '#24c8ff');

  //   State Values
  const [loginDetails, setLoginDetails] = useState<loginDetailsInterface>({
    email: '',
    password: '',
  });
  const [loginStarted, setLoginStarted] = useState(false);
  const [loginSucess, setLoginSuccess] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [failureMsg, setFailureMsg] = useState('');

  const { email, password } = loginDetails;
  //   Vars
  const isEmailInvalid = email && !email.match(emailRegex);
  const isPasswordInvalid = password && !password.match(passwordRegex);

  //   Funcs
  const processLoginInputFinal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // If every input is valid
    if (email && password && !isEmailInvalid && !isPasswordInvalid) {
      setLoginStarted(true);
      // Perform main login action
      logUserIn(email, password)
        .then((resp) => {
          // If login was successful
          if (resp.status === 'success') {
            console.log('status = ' + resp.status);
            setLoginFailed(false);
            setLoginSuccess(true);
            setIsUserLoggedIn(true);
          }
          // If login was unsuccessful
          else if (resp.status === 'failure') {
            setLoginStarted(false);
            setLoginFailed(true);
            setFailureMsg(resp.result);
          }
        })
        .catch((err: Error | any) => {
          // If login was unsuccessful
          setLoginStarted(false);
          setLoginFailed(true);
          setFailureMsg(err.message);
        });
      // Set session expiry date in local storage
      Parse.Session.current()
        .then((session) => {
          console.log(session);

          if (isLocalUserPresentFunc()) {
            setSessionExpDate(
              new Date(session.attributes.expiresAt).toISOString()
            );
          } else {
            //
            console.log('Brrrr');
          }
        })
        .catch((err: Error) => {
          console.log(err.message);
        });
    } else {
      // If one of the inputs is invalid
    }
  };
  const handleChange: ChangeEventHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    let t = e.target! as HTMLInputElement;
    setLoginDetails({ ...loginDetails, [t.name.trim()]: t.value });
  };

  //
  //   Main JSX
  return (
    <Flex
      as='main'
      direction='column'
      minH='25.5rem'
      bgColor={formBg}
      backdropFilter='blur(15px) saturate(180%)'
      w='full'
      maxW='500px'
      rounded='2xl'
      shadow='md'
      mt='-20'
      px={['4', '6', '9', '12']}
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
                disabled={loginStarted}
                type='email'
                name='email'
                isRequired
                value={email}
                placeholder='Input your email here...'
                onChange={handleChange}
                size='lg'
                id='email-input'
                borderColor={borderColor}
                _hover={{ borderColor: `${borderColor} !important` }}
              />
            </InputGroup>
            <FormErrorMessage>Invalid email format</FormErrorMessage>
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
                disabled={loginStarted}
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
            <FormErrorMessage>Invalid password format</FormErrorMessage>
          </FormControl>
          {/*  */}
        </section>

        {/* Sign in button element */}
        <Button
          loadingText='Please wait...'
          spinnerPlacement='start'
          type='submit'
          w='full'
          colorScheme='brand'
          variant='solid'
          fontSize='1.2rem'
          isLoading={loginStarted}
          disabled={
            !email ||
            !password ||
            !email.match(emailRegex) ||
            !password.match(passwordRegex) ||
            loginStarted
          }
        >
          Sign in
        </Button>
        {/*  */}
      </form>
    </Flex>
  );
};

export default LoginForm;
