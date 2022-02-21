import {
  FC,
  FormEvent,
  useState,
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
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
import { useCustomToast } from '../../utils/useCustomToast';

// Interfaces
interface loginDetailsInterface {
  email: string;
  password: string;
}

const LoginForm: FC<UserLoginStateInterface> = (props) => {
  const {
    setEncLoggedInString,
    encLoggedInString,
    setSessionExpDate,
    isLocalUserPresentFunc,
  } = props;

  // Hooks
  const formBg = useColorModeValue('rgba(255,255,255,0.8)', 'rgba(5,5,5,0.65)');
  const borderColor = useColorModeValue('#006080', 'brand.400');
  const { showCustomToast, closeAllToasts } = useCustomToast();

  //   State Values
  const [loginDetails, setLoginDetails] = useState<loginDetailsInterface>({
    email: '',
    password: '',
  });
  const [loginStarted, setLoginStarted] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [failureMsg, setFailureMsg] = useState('');

  const { email, password } = loginDetails;
  //   Vars
  const isEmailInvalid = email && !email.match(emailRegex);
  const isPasswordInvalid = password && !password.match(passwordRegex);

  //   Funcs
  const processLoginInputFinal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginFailed(false);
    setFailureMsg('');
    // If every input is valid
    if (email && password && !isEmailInvalid && !isPasswordInvalid) {
      setLoginStarted(true);
      // Perform main login action
      logUserIn(email, password)
        .then((resp) => {
          // If login was successful
          if (resp.status === 'success') {
            setLoginFailed(false);
            setLoginSuccess(true);
            setTimeout(() => {
              setEncLoggedInString(true);
            }, 2000);
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

  // useEffects
  useEffect(() => {
    if (loginStarted) {
      closeAllToasts();
      showCustomToast('login');
    }
    if (loginSuccess) {
      closeAllToasts();
      showCustomToast('success2', 'You have successfully logged in');
    }
    if (loginFailed) {
      closeAllToasts();
      showCustomToast(
        'error2',
        `${failureMsg.includes(':') ? failureMsg.split(':')[1] : failureMsg}`
      );
    }
  }, [
    closeAllToasts,
    loginStarted,
    showCustomToast,
    loginSuccess,
    loginFailed,
    failureMsg,
  ]);

  //
  //   Main JSX
  return (
    <>
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
        px={['6', '9', '11', '14']}
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
                  spellCheck={false}
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
                  _autofill={{
                    boxShadow: '0 0 0 30px transparent inset !important',
                    transition: 'background-color 5000s ease-in-out 0s',
                    WebkitTextFillColor: `${useColorModeValue(
                      'black',
                      'white'
                    )}`,
                  }}
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
    </>
  );
};

export default LoginForm;