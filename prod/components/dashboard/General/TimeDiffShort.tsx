import { FC } from 'react';
import { useDateFuncs } from '../../../utils/dateFuncs';

interface ShortTimeDifferenceInterface {
  dueDate: string;
}
const TimeDiffShort: FC<ShortTimeDifferenceInterface> = ({ dueDate }) => {
  // Hooks
  const { getShorthandDistanceDiff, addLateorLeft } = useDateFuncs();
  return (
    <>
      {getShorthandDistanceDiff(new Date(dueDate))}{' '}
      {addLateorLeft(new Date(dueDate))}
    </>
  );
};

export default TimeDiffShort;
