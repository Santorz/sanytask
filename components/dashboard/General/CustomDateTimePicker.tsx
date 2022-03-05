import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { ChangeEventHandler, FC, FormEventHandler } from 'react';
import { useDateFuncs } from '../../../utils/dateFuncs';

interface CustomDateTimePickerInterface {
  value: Date;
  onChange: ChangeEventHandler<Element>;
  onInput: FormEventHandler<HTMLInputElement>;
  name: string;
  borderColor: string;
}
// Main Component
const CustomDateTimePicker: FC<CustomDateTimePickerInterface> = (props) => {
  // Props
  const { value: dateValue, onChange, name, borderColor, onInput } = props;

  // Hooks
  const { isDateInputInvalidFunc } = useDateFuncs();
  const isDateInputInvalid = isDateInputInvalidFunc(dateValue);

  // Main JSX
  return (
    <FormControl isRequired isInvalid={isDateInputInvalid}>
      <FormLabel
        fontWeight='bold'
        fontFamily='heading'
        htmlFor='datetime picker'
      >
        Due Date:
      </FormLabel>
      <Input
        isRequired
        name={name}
        aria-label='Choose due date and time for this task'
        type='datetime-local'
        value={format(new Date(dateValue), `yyyy-MM-dd'T'HH:mm`)}
        css={{
          '&::-webkit-calendar-picker-indicator': {
            position: 'absolute',
            top: '0%',
            left: '-5%',
            width: '100%',
            height: '100%',
            cursor: 'pointer',
            opacity: '0',
            backgroundColor: 'gray',
          },
        }}
        borderColor={borderColor}
        _hover={{ borderColor: `${borderColor} !important` }}
        onChange={onChange}
        onInput={onInput}
      />
      {isDateInputInvalid && (
        <FormErrorMessage>
          Enter a date later than the present date
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default CustomDateTimePicker;
