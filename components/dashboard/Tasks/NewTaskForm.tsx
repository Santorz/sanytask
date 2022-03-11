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
import { submitTask } from '../../../utils/taskFuncs';
import { FaEdit } from 'react-icons/fa';
import { useDateFuncs } from '../../../utils/dateFuncs';
import { useCustomToast } from '../../../utils/useCustomToast';
import CustomDateTimePicker from '../General/CustomDateTimePicker';
import { useModalFuncs } from '../../../utils/modalFuncs';

// Interfaces
export interface TaskDataInterface {
  title: string;
  details: string;
  dueDate: Date;
}

const NewTaskForm: FC = (props) => {
  // Hooks
  const formBg = useColorModeValue(
    'rgba(255,255,255,0.65)',
    'rgba(5,5,5,0.65)'
  );
  const borderColor = useColorModeValue('#006080', 'brand.400');
  const { showCustomToast, closeAllToasts } = useCustomToast();
  const { isDateInputInvalidFunc } = useDateFuncs();
  const { closeNewTaskModal } = useModalFuncs();

  //   State Values
  const [taskData, setTaskData] = useState<TaskDataInterface>({
    title: '',
    details: '',
    dueDate: new Date(),
  });
  const [submissionStarted, setSubmissionStarted] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const [failureMsg, setFailureMsg] = useState('');

  //   Vars
  const { title, details, dueDate } = taskData;

  // Invalid bools
  const isDetailsInvalid = !details
    .trim()
    .match(/^[a-zA-Z0-9 !@#$%.^&*,)(']{30,2000}$/);
  const isTitleInvalid = !title
    .trim()
    .match(/^[a-zA-Z0-9 !@#$%.^&*,)(']{2,30}$/);
  const isDateInputInvalid = isDateInputInvalidFunc(dueDate);

  //   Funcs
  const processNewTaskInputFinal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionSuccess(false);
    setSubmissionFailed(false);
    setFailureMsg('');
    if (!isDetailsInvalid && !isTitleInvalid && !isDateInputInvalid) {
      setSubmissionStarted(true);
      const responseObj = await submitTask(taskData);
      const { status } = responseObj;
      if (status === 'success') {
        setFailureMsg('');
        setSubmissionSuccess(true);
        setSubmissionStarted(false);
      } else {
        setSubmissionSuccess(true);
        setSubmissionStarted(false);
        setSubmissionFailed(true);
        setFailureMsg('An error occured while creating task.');
      }
      // If every input is valid
    } else {
      showCustomToast('error', 'One or more form details are invalid.');
    }

    // If one of the inputs is invalid
  };
  const handleChange: ChangeEventHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const target = e.target as HTMLInputElement;
    if (target.name === 'dueDate' && isNaN(Date.parse(target.value))) {
      setTaskData({ ...taskData, [target.name]: new Date() });
    } else {
      setTaskData({ ...taskData, [target.name]: target.value });
    }
  };

  // useEffects
  useEffect(() => {
    if (submissionStarted) {
      closeAllToasts();
      showCustomToast('process2', 'Creating task...');
    }
    if (submissionSuccess) {
      closeAllToasts();
      closeNewTaskModal().then(() => {
        showCustomToast('success2', 'Task created successfully.');
      });
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
    closeNewTaskModal,
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
        maxW='650px'
        rounded='2xl'
        shadow='md'
        px={['7', '9', '11', '14']}
        py={['2', '3', '4', '5']}
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
            marginTop: '15px',
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
            <FormControl isInvalid={isTitleInvalid} w='full' isRequired>
              <FormLabel htmlFor='email' fontFamily='heading' fontWeight='bold'>
                Task title:
              </FormLabel>
              <InputGroup d='flex' alignItems='center'>
                <InputLeftElement pointerEvents='none' top='unset'>
                  <Icon as={FaEdit} boxSize='1.5rem' />
                </InputLeftElement>

                <Input
                  spellCheck={false}
                  disabled={submissionStarted}
                  type='text'
                  name='title'
                  isRequired
                  fontWeight='bold'
                  fontFamily='heading'
                  fontSize='1.2rem'
                  value={title}
                  placeholder='Input the task title here...'
                  onChange={handleChange}
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
              <FormErrorMessage>
                Title must be between 4 - 50 charaacters
              </FormErrorMessage>
            </FormControl>
            {/*  */}

            {/* Task details form control element */}
            <FormControl isInvalid={isDetailsInvalid} w='full' isRequired>
              <FormLabel
                htmlFor='details'
                fontFamily='heading'
                fontWeight='bold'
              >
                Details:
              </FormLabel>
              <Textarea
                disabled={submissionStarted}
                borderColor={borderColor}
                _hover={{ borderColor: `${borderColor} !important` }}
                _autofill={{
                  boxShadow: '0 0 0 30px transparent inset !important',
                  transition: 'background-color 5000s ease-in-out 0s',
                  WebkitTextFillColor: `${useColorModeValue('black', 'white')}`,
                }}
                name='details'
                onChange={handleChange}
                placeholder='Enter a clear and consise decription here...'
              />

              <FormErrorMessage>
                Details must be at least 30 characters
              </FormErrorMessage>
            </FormControl>
            {/*  */}

            {/*  */}
            {/* Custom DateTime Picker */}
            <CustomDateTimePicker
              disabled={submissionStarted}
              borderColor={borderColor}
              value={new Date(new Date(taskData.dueDate))}
              onChange={handleChange}
              name='dueDate'
            />
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
            disabled={isTitleInvalid || isDetailsInvalid || isDateInputInvalid}
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
