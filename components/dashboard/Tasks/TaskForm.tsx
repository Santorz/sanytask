import {
  FC,
  FormEvent,
  useState,
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useContext,
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
import { useRouter } from 'next/router';
import { TasksContext } from '../../general/TasksConfig';
import { submitNewTask, submitEditedTask } from '../../../utils/taskFuncs';
import { FaEdit } from 'react-icons/fa';
import { useDateFuncs } from '../../../utils/dateFuncs';
import { useCustomToast } from '../../../utils/useCustomToast';
import CustomDateTimePicker from '../General/CustomDateTimePicker';
import { useModalFuncs } from '../../../utils/modalFuncs';
import { decrypt } from '../../../utils/crypto-js-utils';

// Interfaces
export interface TaskDataInterface {
  title: string;
  details: string;
  dueDate: Date;
}
interface TaskFormInterface {
  formType: 'new' | 'edit';
}

// Main Component
const TaskForm: FC<TaskFormInterface> = ({ formType }) => {
  // Hooks
  const { asPath } = useRouter();
  const taskId = asPath.split('?taskId=')[1];
  const { tasks } = useContext(TasksContext);
  const specificTask = tasks && tasks.find((task) => task.id === taskId);
  const formBg = useColorModeValue(
    'rgba(255,255,255,0.65)',
    'rgba(5,5,5,0.65)'
  );
  const borderColor = useColorModeValue('#006080', 'brand.400');
  const { showCustomToast, closeAllToasts } = useCustomToast();
  const { isDateInputInvalidFunc } = useDateFuncs();
  const { closeNewTaskModal } = useModalFuncs();

  //   State Values
  const [taskData, setTaskData] = useState<TaskDataInterface>(
    (formType === 'new' || !formType) && formType !== 'edit'
      ? {
          title: '',
          details: '',
          dueDate: new Date(),
        }
      : {
          title: specificTask ? decrypt(specificTask.title) : '',
          details: specificTask ? decrypt(specificTask.details) : '',
          dueDate: specificTask ? new Date(specificTask.dueDate) : new Date(),
        }
  );
  const [submissionStarted, setSubmissionStarted] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const [failureMsg, setFailureMsg] = useState('');

  //   Vars
  const { title, details, dueDate } = taskData;

  // Invalid bools
  const isDetailsInvalid = !(
    details && details.trim().match(/^[a-zA-Z0-9 \W|_/]{30,2000}$/)
  );
  const isTitleInvalid = !(
    title && title.trim().match(/^[a-zA-Z0-9 \W|_/]{2,30}$/)
  );
  const isDateInputInvalid = isDateInputInvalidFunc(dueDate);

  //   Funcs
  const processNewTaskInputFinal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionSuccess(false);
    setSubmissionFailed(false);
    setFailureMsg('');
    if (!isDetailsInvalid && !isTitleInvalid && !isDateInputInvalid) {
      setSubmissionStarted(true);
      const responseObj =
        formType === 'new'
          ? await submitNewTask(taskData)
          : await submitEditedTask(specificTask.id, taskData);
      const { status } = responseObj;
      if (status === 'success') {
        setFailureMsg('');
        setSubmissionSuccess(true);
        setSubmissionStarted(false);
      } else {
        setSubmissionSuccess(true);
        setSubmissionStarted(false);
        setSubmissionFailed(true);
        setFailureMsg(
          `An error occured while ${
            formType === 'new' ? 'creating' : 'submitting edited'
          } task.`
        );
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
      showCustomToast(
        'process2',
        `${formType === 'new' ? 'Creating' : 'Submitting edited'} task...`
      );
    }
    if (submissionSuccess) {
      closeAllToasts();
      closeNewTaskModal().then(() => {
        showCustomToast(
          'success2',
          `Task ${formType === 'new' ? 'created' : 'edited'} successfully.`
        );
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
    formType,
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
        shadow={{ base: 'md', md: 'none' }}
        px={['7', '9', '11', '14']}
        py={['2', '3', '4', '5']}
        mx='auto'
        userSelect='none'
      >
        <Heading size='lg' my='1'>
          {formType === 'new' ? `Create new task` : `Edit task`}
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
            {/* Task title form control element */}
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
              value={
                isDateInputInvalid
                  ? new Date()
                  : new Date(new Date(taskData.dueDate))
              }
              onChange={handleChange}
              name='dueDate'
            />
          </section>

          {/* Submission button element */}
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
            {formType === 'new' ? `Create task` : `Submit edited task`}
          </Button>
          {/*  */}
        </form>
      </Flex>
    </>
  );
};

export default TaskForm;
