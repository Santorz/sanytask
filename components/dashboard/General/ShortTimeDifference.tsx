import { FC } from 'react';
import { useDateFuncs } from '../../../utils/dateFuncs';

interface ShortTimeDifferenceInterface {
  dueDate: string;
}
const ShortTimeDifference: FC<ShortTimeDifferenceInterface> = ({ dueDate }) => {
  // Hooks
  const { getShorthandDistanceDiff, checkBeforeorAfter } = useDateFuncs();
  return (
    <>
      {getShorthandDistanceDiff(new Date(dueDate))}{' '}
      {checkBeforeorAfter(new Date(dueDate))}
    </>
  );
};

export default ShortTimeDifference;
