import { FC, ReactNode } from 'react';
import { decrypt } from '../../../utils/crypto-js-utils';
import { TaskInterface } from '../../../parse-sdk/hooks';
import {
  Heading,
  Flex,
  Button,
  IconButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaEllipsisH } from 'react-icons/fa';

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

  // Mainn JSX
  return (
    <Button
      key={id}
      minHeight='125px'
      w='full'
      rounded='xl'
      shadow='md'
      d='flex'
      flexDirection='column'
      name={`Task ${index}`}
      aria-label={title}
      alignItems='flex-start'
      justifyContent='flex-start'
      flexWrap='wrap'
      py='1'
    >
      {/* Title and Eliipsis */}
      <Flex textAlign='left' w='full' align='center'>
        <Heading
          fontSize='1.05rem'
          w='full'
          whiteSpace='normal'
          color={headingColor}
        >
          {decrypt(title)}
        </Heading>
        <IconButton
          fontSize='1.3rem'
          boxSize='8'
          icon={<FaEllipsisH />}
          variant='ghost'
          aria-label={`Task ${index} options`}
        />
      </Flex>

      {/* Hours left and dueDate */}
      <Flex justify='space-between' align='center' w='full'>
        <Heading
          size='xs'
          w='30%'
          whiteSpace='normal'
          textAlign='left'
          fontWeight='semibold'
        >
          hours left
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
        fontSize='small'
        fontWeight='normal'
        whiteSpace='normal'
        textAlign='left'
      >
        {fineTrimString(decrypt(details), 120)}...
      </Text>
    </Button>
  );
};

export default EachTaskDesktop;
