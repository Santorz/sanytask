import {
  FC,
  FormEvent,
  useState,
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
} from 'react';
import { registerNewUser } from '../../parse-sdk/actions';
import {
  emailRegex,
  passwordRegex,
  nameRegex,
} from '../../utils/regexValidator';
import { useRouter } from 'next/router';
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
  HStack,
  FormErrorMessage,
  Text,
} from '@chakra-ui/react';
import { MdMail, MdLock, MdPerson, MdPersonOutline } from 'react-icons/md';
import { useCustomToast } from '../../utils/useCustomToast';
import { UserLoginStateInterface } from '../general/UserLoginState';

// Interfaces
interface loginDetailsInterface {
  email: string;
  password: string;
  fName: string;
  lName: string;
}

const SignupForm: FC = () => {
  // Hooks
  const formBg = useColorModeValue('rgba(250,250,250,0.75)', 'rgba(5,5,5,0.7)');
  const borderColor = useColorModeValue('#006080', 'brand.400');
  const { showCustomToast, closeAllToasts } = useCustomToast();
  const router = useRouter();

  //   State Values
  const [signupDetails, setSignupDetails] = useState<loginDetailsInterface>({
    email: '',
    password: '',
    fName: '',
    lName: '',
  });
  const [signUpStarted, setSignupStarted] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupFailed, setSignupFailed] = useState(false);
  const [failureMsg, setFailureMsg] = useState('');
  const [secondPassword, setSecondPassword] = useState('');

  const { email, password, fName, lName } = signupDetails;

  //   Bools
  const isEmailInvalid = email && !email.match(emailRegex);
  const isPasswordInvalid = password && !password.match(passwordRegex);
  const isFNameInvalid = fName && !fName.trim().match(nameRegex);
  const isLNameInvalid = lName && !lName.trim().match(nameRegex);
  const arePasswordsSame = password === secondPassword;

  //   Funcs
  const processSignupInputFinal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignupFailed(false);
    setFailureMsg('');
    // If every input is valid
    if (
      email &&
      password &&
      fName &&
      lName &&
      !isFNameInvalid &&
      !isLNameInvalid &&
      !isEmailInvalid &&
      !isPasswordInvalid &&
      arePasswordsSame
    ) {
      setSignupStarted(true);
      // Perform main signup action
      try {
        registerNewUser(fName.trim(), lName.trim(), email.trim(), password)
          .then((resp) => {
            // If signup was successful
            if (resp.status === 'success') {
              setSignupFailed(false);
              setSignupSuccess(true);
              setTimeout(async () => {
                await router.replace(
                  `/signup/email-confirmation?fName=${fName}`
                );
              });
            }
            // If signup was unsuccessful
            else if (resp.status === 'failure') {
              setSignupStarted(false);
              setSignupFailed(true);
              setFailureMsg(resp.message);
            }
          })
          .catch((err: Error | any) => {
            // If signup was unsuccessful
            setSignupStarted(false);
            setSignupFailed(true);
            setFailureMsg(err.message);
          });
      } catch (err: Error | any) {
        setSignupStarted(false);
        setSignupFailed(true);
        setFailureMsg(err.message);
      }
    } else {
      // If one of the inputs is invalid
    }
  };
  const handleChange: ChangeEventHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    let t = e.target! as HTMLInputElement;
    setSignupDetails({ ...signupDetails, [t.name.trim()]: t.value });
  };

  // useEffects
  useEffect(() => {
    if (signUpStarted) {
      closeAllToasts();
      showCustomToast('process2', 'Signing up...');
    }
    if (signupSuccess) {
      closeAllToasts();
      showCustomToast('success2', 'You have successfully signed up');
    }
    if (signupFailed) {
      closeAllToasts();
      showCustomToast(
        'error2',
        `${failureMsg.includes(':') ? failureMsg.split(':')[1] : failureMsg}`
      );
    }
  }, [
    closeAllToasts,
    signUpStarted,
    showCustomToast,
    signupSuccess,
    signupFailed,
    failureMsg,
  ]);

  //
  //   Main JSX
  return (
    <>
      <Flex
        as="main"
        direction="column"
        minH="27.5rem"
        bgColor={formBg}
        backdropFilter="blur(15px) saturate(180%)"
        w="full"
        maxW="550px"
        rounded="2xl"
        shadow="lg"
        px={['6', '9', '9', '11', '14']}
        py={['4', '5', '7', '6']}
      >
        <Heading size="lg" my="1">
          Sign Up
        </Heading>
        <Heading
          as="h1"
          fontSize="1.075rem"
          my="1"
          fontWeight="normal"
          fontFamily="body"
        >
          Welcome a new world of task management.
        </Heading>

        <form
          onSubmit={processSignupInputFinal}
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
              gap: '12.5px',
              marginBottom: '2rem',
            }}
          >
            {/* First name and last name inputs */}
            <HStack alignItems="start">
              {/* First name form control element */}
              <FormControl isInvalid={isFNameInvalid} w="full" isRequired>
                <FormLabel
                  htmlFor="fName"
                  fontFamily="heading"
                  fontWeight="bold"
                >
                  First Name:
                </FormLabel>
                <InputGroup d="flex" alignItems="center">
                  <InputLeftElement pointerEvents="none" top="unset">
                    <Icon as={MdPerson} boxSize="1.5rem" />
                  </InputLeftElement>

                  <Input
                    spellCheck={false}
                    disabled={signUpStarted}
                    name="fName"
                    isRequired
                    value={fName}
                    placeholder="First name..."
                    onChange={handleChange}
                    size="lg"
                    id="fName-input"
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
                <FormErrorMessage>Invalid name format</FormErrorMessage>
              </FormControl>
              {/*  */}
              {/* Last name form control element */}
              <FormControl isInvalid={isLNameInvalid} w="full" isRequired>
                <FormLabel
                  htmlFor="lName"
                  fontFamily="heading"
                  fontWeight="bold"
                >
                  Last Name:
                </FormLabel>
                <InputGroup d="flex" alignItems="center">
                  <InputLeftElement pointerEvents="none" top="unset">
                    <Icon as={MdPersonOutline} boxSize="1.5rem" />
                  </InputLeftElement>

                  <Input
                    spellCheck={false}
                    disabled={signUpStarted}
                    name="lName"
                    isRequired
                    value={lName}
                    placeholder="Last name..."
                    onChange={handleChange}
                    size="lg"
                    id="lName-input"
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
                <FormErrorMessage>Invalid name format</FormErrorMessage>
              </FormControl>
              {/*  */}
            </HStack>
            {/*  */}

            {/* Email form control element */}
            <FormControl isInvalid={isEmailInvalid} w="full" isRequired>
              <FormLabel htmlFor="email" fontFamily="heading" fontWeight="bold">
                Email:
              </FormLabel>
              <InputGroup d="flex" alignItems="center">
                <InputLeftElement pointerEvents="none" top="unset">
                  <Icon as={MdMail} boxSize="1.5rem" />
                </InputLeftElement>

                <Input
                  spellCheck={false}
                  disabled={signUpStarted}
                  type="email"
                  name="email"
                  isRequired
                  value={email}
                  placeholder="Input your email here..."
                  onChange={handleChange}
                  size="lg"
                  id="email-input"
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

            <Flex
              direction={{ base: 'column', md: 'row' }}
              gap={{ base: '4', md: '2' }}
            >
              {/* Password form control element */}
              <FormControl isInvalid={isPasswordInvalid} w="full" isRequired>
                <FormLabel
                  htmlFor="password"
                  fontFamily="heading"
                  fontWeight="bold"
                >
                  Password:
                </FormLabel>
                <InputGroup d="flex" alignItems="center">
                  <InputLeftElement pointerEvents="none" top="unset">
                    <Icon as={MdLock} boxSize="1.5rem" />
                  </InputLeftElement>

                  <Input
                    disabled={signUpStarted}
                    type="password"
                    name="password"
                    isRequired
                    value={password}
                    placeholder="Input your password here..."
                    onChange={handleChange}
                    size="lg"
                    borderColor={borderColor}
                    _hover={{ borderColor: `${borderColor} !important` }}
                  />
                </InputGroup>
                {isPasswordInvalid && (
                  <FormErrorMessage>Invalid password format</FormErrorMessage>
                )}
                {!arePasswordsSame && (
                  <FormErrorMessage>
                    Passwords are not the same
                  </FormErrorMessage>
                )}
              </FormControl>
              {/*  */}

              {/* Second Password form control element */}
              <FormControl isInvalid={!arePasswordsSame} w="full" isRequired>
                <FormLabel
                  htmlFor="second-password"
                  fontFamily="heading"
                  fontWeight="bold"
                >
                  Repeat Password:
                </FormLabel>
                <InputGroup d="flex" alignItems="center">
                  <InputLeftElement pointerEvents="none" top="unset">
                    <Icon as={MdLock} boxSize="1.5rem" />
                  </InputLeftElement>

                  <Input
                    disabled={signUpStarted}
                    type="password"
                    name="second-password"
                    id="second-password"
                    isRequired
                    value={secondPassword}
                    placeholder="Repeat your password..."
                    onChange={(e) => setSecondPassword(e.target.value)}
                    size="lg"
                    borderColor={borderColor}
                    _hover={{ borderColor: `${borderColor} !important` }}
                  />
                </InputGroup>
                <FormErrorMessage>Passwords are not the same</FormErrorMessage>
              </FormControl>
            </Flex>

            {!isPasswordInvalid && !password && (
              <Text fontSize="sm">
                Password must be at least 8 characters and contain at least 1
                capital letter, 1 number and one symbol.
              </Text>
            )}

            {/*  */}
          </section>

          {/* Sign up button element */}
          <Button
            loadingText="Please wait..."
            spinnerPlacement="start"
            type="submit"
            w="full"
            colorScheme="brand"
            variant="solid"
            fontSize="1.2rem"
            isLoading={signUpStarted}
            disabled={
              !email ||
              !password ||
              !lName ||
              !fName ||
              !nameRegex.test(lName) ||
              !nameRegex.test(fName) ||
              !email.match(emailRegex) ||
              !password.match(passwordRegex) ||
              signUpStarted ||
              !arePasswordsSame
            }
          >
            Sign up
          </Button>
          {/*  */}
        </form>
      </Flex>
    </>
  );
};

export default SignupForm;
