import {
  FC,
  FormEvent,
  useState,
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
} from 'react';
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
  Textarea,
} from '@chakra-ui/react';
import { MdMail, MdLock } from 'react-icons/md';
import { useCustomToast } from '../../../utils/useCustomToast';

// Interfaces
interface TaskDataInterface {
  title: string;
  description: string;
}

const NewTaskForm: FC = (props) => {
  // Hooks
  const formBg = useColorModeValue('rgba(255,255,255,0.8)', 'rgba(5,5,5,0.65)');
  const borderColor = useColorModeValue('#006080', 'brand.400');
  const { showCustomToast, closeAllToasts } = useCustomToast();

  //   State Values
  const [taskData, setTaskData] = useState<TaskDataInterface>({
    title: '',
    description: '',
  });
  const [submissionStarted, setSubmissionStarted] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const [failureMsg, setFailureMsg] = useState('');

  //   Vars
  const { title, description } = taskData;

  //   Funcs
  const processNewTaskInputFinal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionFailed(false);
    setFailureMsg('');
    alert(JSON.stringify(taskData));
    // If every input is valid
    // If one of the inputs is invalid
  };
  const handleChange: ChangeEventHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const target = e.target as HTMLInputElement;
    setTaskData({ ...taskData, [target.name]: target.value });
  };

  // useEffects
  useEffect(() => {
    if (submissionStarted) {
      closeAllToasts();
      showCustomToast('login');
    }
    if (submissionSuccess) {
      closeAllToasts();
      //   Perform onCloseMain function
    }
    if (submissionFailed) {
      closeAllToasts();
      showCustomToast(
        'error2',
        `${failureMsg.includes(':') ? failureMsg.split(':')[1] : failureMsg}`
      );
    }
  }, [
    closeAllToasts,
    submissionStarted,
    showCustomToast,
    submissionSuccess,
    submissionFailed,
    failureMsg,
  ]);

  //
  //   Main JSX
  return (
    <>
      <Flex
        as='main'
        direction='column'
        minH='30rem'
        bgColor={formBg}
        backdropFilter='blur(15px) saturate(180%)'
        w='full'
        maxW='600px'
        rounded='2xl'
        shadow='md'
        px={['6', '9', '11', '14']}
        py={['4', '5', '7', '6']}
        mx='auto'
      >
        <Heading size='lg' my='1'>
          Create new task
        </Heading>

        <form
          onSubmit={processNewTaskInputFinal}
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            marginTop: '25px',
            justifyContent: 'space-between',
            height: '100%',
            paddingBottom: '1rem',
            gap: '2.5rem',
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
            <FormControl isInvalid w='full' isRequired>
              <FormLabel htmlFor='email' fontFamily='heading' fontWeight='bold'>
                Task title:
              </FormLabel>
              <InputGroup d='flex' alignItems='center'>
                <InputLeftElement pointerEvents='none' top='unset'>
                  <Icon as={MdMail} boxSize='1.5rem' />
                </InputLeftElement>

                <Input
                  spellCheck={false}
                  disabled={submissionStarted}
                  type='text'
                  name='title'
                  isRequired
                  value={title}
                  placeholder='Input the task title here...'
                  onChange={handleChange}
                  size='lg'
                  id='task-title-input'
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
              <FormErrorMessage>Invalid task title format</FormErrorMessage>
            </FormControl>
            {/*  */}

            {/* Password form control element */}
            <FormControl isInvalid w='full' isRequired>
              <FormLabel
                htmlFor='description'
                fontFamily='heading'
                fontWeight='bold'
              >
                Description:
              </FormLabel>
              <Textarea
                name='description'
                onChange={handleChange}
                placeholder='Enter a clear and consise decription here...'
              />

              <FormErrorMessage>Invalid task description</FormErrorMessage>
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
            isLoading={submissionStarted}
            disabled={false}
          >
            Create task
          </Button>
          {/*  */}
        </form>
      </Flex>
    </>
  );
};

export default NewTaskForm;
