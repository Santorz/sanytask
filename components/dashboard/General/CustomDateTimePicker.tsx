import { Input, FormControl, FormLabel } from '@chakra-ui/react';
import { format } from 'date-fns';
import { ChangeEventHandler, FC } from 'react';

interface CustomDateTimePickerInterface {
  value: Date;
  onChange: ChangeEventHandler<Element>;
  name: string;
}
// Main Component
const CustomDateTimePicker: FC<CustomDateTimePickerInterface> = (props) => {
  // Props
  const { value, onChange, name } = props;

  // Main JSX
  return (
    <FormControl isRequired>
      <FormLabel htmlFor='datetime picker'>Due Date:</FormLabel>
      <Input
        name={name}
        aria-label='Choose due date and time for this task'
        color='whiteAlpha.900'
        type='datetime-local'
        value={format(new Date(value), `yyyy-MM-dd'T'HH:mm`)}
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
        onChange={onChange}
      />
    </FormControl>
  );
};

export default CustomDateTimePicker;
