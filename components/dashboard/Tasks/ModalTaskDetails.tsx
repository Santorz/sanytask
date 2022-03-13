import { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import { Heading } from '@chakra-ui/react';
import { TasksContext } from '../../general/TasksConfig';
import { decrypt } from '../../../utils/crypto-js-utils';
import ShortTimeDifference from '../General/ShortTimeDifference';
import { formatRelative } from 'date-fns';

const ModalTaskDetails: FC = () => {
  // Hooks
  const { asPath } = useRouter();
  const taskId = asPath.split('?taskId=')[1];
  const { tasks } = useContext(TasksContext);
  const specificTask = tasks && tasks.find((task) => task.id === taskId);

  //   Task properties
  const { id, dueDate, title } = specificTask || {};

  // Main JSX
  return (
    <>
      {tasks && <Heading>{title ? decrypt(title) : 'Task not found'}</Heading>}
      <Heading size='md' fontFamily='body' fontWeight='normal'>
        {dueDate && <ShortTimeDifference dueDate={dueDate} />} {'   ||  '}
        due {dueDate && formatRelative(new Date(dueDate), new Date())}
      </Heading>
    </>
  );
};

export default ModalTaskDetails;
