import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { format, addMonths } from 'date-fns';
import { ChangeEventHandler, FC, FormEventHandler, useRef } from 'react';
import { useDateFuncs } from '../../../utils/dateFuncs';

interface CustomDateTimePickerInterface {
  disabled: boolean;
  value: Date;
  onChange: ChangeEventHandler<Element>;
  name: string;
  borderColor: string;
}
// Main Component
const CustomDateTimePicker: FC<CustomDateTimePickerInterface> = (props) => {
  // Props
  const { value: dateValue, onChange, name, borderColor, disabled } = props;

  // Hooks
  const { isDateInputInvalidFunc } = useDateFuncs();
  const isDateInputInvalid = isDateInputInvalidFunc(dateValue);

  // refs
  const todaysDate = useRef(new Date());

  // Funcs
  const custFormat = (dateValue: Date) => {
    return format(new Date(dateValue), `yyyy-MM-dd'T'HH:mm`);
  };

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
        min={custFormat(todaysDate.current)}
        max={custFormat(addMonths(todaysDate.current, 2))}
        isRequired
        name={name}
        aria-label='Choose due date and time for this task'
        type='datetime-local'
        value={custFormat(dateValue)}
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
        disabled={disabled}
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
