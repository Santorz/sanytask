import { FC, ReactNode } from 'react';
import { useDateFuncs } from '../../../utils/dateFuncs';
import { useModalFuncs } from '../../../utils/modalFuncs';
import { decrypt } from '../../../utils/crypto-js-utils';
import { TaskInterface } from '../../../parse-sdk/hooks';
import {
  Heading,
  Flex,
  Button,
  Text,
  useColorModeValue,
  chakra,
} from '@chakra-ui/react';
import { FaEllipsisH } from 'react-icons/fa';
import TaskOptions from './TaskOptions';

interface EachTaskDesktopInterface extends TaskInterface {
  children?: ReactNode;
  index: number;
}

// General funcs
export const fineTrimString = (word: string, maxLength: number) => {
  //trim the string to the maximum length
  var trimmedString = word.substr(0, maxLength);

  //re-trim if we are in the middle of a word
  trimmedString = trimmedString.substr(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
  );

  return trimmedString;
};

const EachTaskDesktop: FC<EachTaskDesktopInterface> = (props) => {
  const { id, dueDate, title, index, details } = props;

  // Hooks
  const headingColor = useColorModeValue('brand.500', 'brand.100');
  const { getShorthandDistanceDiff, checkBeforeorAfter, addColorOnTask } =
    useDateFuncs();
  const { openViewTaskModal } = useModalFuncs();

  // Main JSX
  return (
    <Button
      as={chakra.div}
      key={id}
      minHeight='125px'
      h='fit-content'
      w='full'
      rounded='xl'
      shadow='md'
      d='flex'
      flexDirection='column'
      name={`Task ${index + 1}`}
      aria-label={decrypt(title)}
      alignItems='flex-start'
      justifyContent='flex-start'
      py='3'
      id={`task-${id}`}
      onClick={() => openViewTaskModal(id)}
      onKeyDown={(e) => {
        if (e.code === 'Enter' || e.code === 'Space') openViewTaskModal(id);
      }}
      tabIndex={0}
    >
      {/* Title and Eliipsis */}
      <Flex textAlign='left' w='full'>
        <Heading
          fontSize='1.02rem'
          w='full'
          whiteSpace='normal'
          color={headingColor}
        >
          {decrypt(title)}
        </Heading>
        <TaskOptions index={index} id={id} />
      </Flex>

      {/* Hours left and dueDate */}
      <Flex justify='space-between' align='center' w='full'>
        <Heading
          size='xs'
          w='30%'
          whiteSpace='normal'
          textAlign='left'
          fontWeight='semibold'
          color={addColorOnTask(new Date(dueDate))}
        >
          {getShorthandDistanceDiff(new Date(dueDate))}{' '}
          {checkBeforeorAfter(new Date(dueDate))}
        </Heading>
        <Heading
          size='xs'
          w='70%'
          whiteSpace='normal'
          textAlign='right'
          fontWeight='normal'
        >
          {new Date(dueDate).toDateString()}
        </Heading>
      </Flex>

      {/* truncated description */}
      <Text
        mt='2.5'
        fontSize='.85rem'
        fontWeight='normal'
        whiteSpace='normal'
        textAlign='left'
        d='block'
      >
        {fineTrimString(decrypt(details), 120)}...
      </Text>
    </Button>
  );
};

export default EachTaskDesktop;
