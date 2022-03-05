import { useCallback, useEffect, useState } from 'react';
import {
  differenceInDays,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInMonths,
  isBefore,
  isAfter,
  formatRelative,
  format,
} from 'date-fns';
import { useColorModeValue } from '@chakra-ui/react';

// Interfaces
interface optionsInterface {
  locale?: Locale;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

// Main dateFuncs hook
export const useDateFuncs = () => {
  // Hooks
  const brandColor = useColorModeValue('brand.500', 'brand.100');
  const redColor = useColorModeValue('red.500', 'red.300');

  // state values
  const [currentDate, setCurrentDate] = useState(new Date());

  // useEffects
  useEffect(() => {
    const timeout = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timeout);
    };
  }, [currentDate]);

  // Funcs
  // Shorthand date difference
  const getShorthandDistanceDiff = useCallback(
    (dueDate: Date) => {
      let result: string;
      const date1 = new Date(dueDate);
      const date2 = currentDate;
      const seconds = Math.abs(differenceInSeconds(date1, date2));
      const minutes = Math.abs(differenceInMinutes(date1, date2));
      const hours = Math.abs(differenceInHours(date1, date2));
      const days = Math.abs(differenceInDays(date1, date2));
      const months = Math.abs(differenceInMonths(date1, date2));
      if (seconds < 60) {
        result = `${seconds} secs `;
      } else if (minutes === 1) {
        result = `${minutes} min`;
      } else if (minutes < 60) {
        result = `${minutes} mins `;
      } else if (hours === 1) {
        result = `${hours} hour `;
      } else if (hours < 24) {
        result = `${hours} hours `;
      } else if (days === 1) {
        result = `${days} day `;
      } else if (months < 1) {
        result = `${days} days `;
      } else if (months === 1) {
        result = `${months} month `;
      } else {
        result = `${months} months `;
      }
      return result;
    },
    [currentDate]
  );

  // Check if date is before or after
  const checkBeforeorAfter = useCallback(
    (dueDate: Date) => {
      let presentDate = currentDate;
      let dueDateMain = new Date(dueDate);
      if (isBefore(presentDate, dueDateMain)) {
        return ' left';
      } else if (isAfter(presentDate, dueDateMain)) {
        return ' late';
      }
    },
    [currentDate]
  );

  // Check if date is before or after and add respective color
  const addColorOnTask = useCallback(
    (dueDate: Date) => {
      let presentDate = currentDate;
      let dueDateMain = new Date(dueDate);
      if (isAfter(presentDate, dueDateMain)) {
        return redColor;
      } else {
        return brandColor;
      }
    },
    [brandColor, currentDate, redColor]
  );

  // Get relative date
  const getRelativeDate = useCallback(
    (baseDate: Date, options?: optionsInterface) => {
      const date = currentDate;
      return Math.abs(differenceInDays(date, baseDate)) < 6
        ? formatRelative(date, baseDate, options)
        : format(date, `dd/MM/yyyy 'by' p`);
    },
    [currentDate]
  );

  // Check if any date input is invalid for any form
  const isDateInputInvalidFunc = useCallback(
    (dateValue: Date) => {
      dateValue = new Date(dateValue);
      return (
        dateValue &&
        Object.prototype.toString.call(dateValue) === '[object Date]' &&
        typeof dateValue !== 'number' &&
        currentDate > dateValue
      );
    },
    [currentDate]
  );

  return {
    currentDate,
    getShorthandDistanceDiff,
    isDateInputInvalidFunc,
    checkBeforeorAfter,
    addColorOnTask,
    getRelativeDate,
  };
};
