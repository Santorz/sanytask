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

// Shorthand date difference
export const getShorthandDistanceDiff = (dueDate: Date, currentDate: Date) => {
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
    result = `${hours} hrs `;
  } else if (days === 1) {
    result = `${days} day `;
  } else if (months < 1) {
    result = `${days} days `;
  } else if (months === 1) {
    result = `${months} mth `;
  } else {
    result = `${months} mths `;
  }
  return result;
};

// Check if date is before or after
export const checkBeforeorAfter = (dueDate: Date, currentDate: Date) => {
  let presentDate = currentDate;
  let dueDateMain = new Date(dueDate);
  if (isBefore(presentDate, dueDateMain)) {
    return ' left';
  } else if (isAfter(presentDate, dueDateMain)) {
    return ' late';
  }
};

// Check if date is before or after and add respective color
export const addColorOnTask = (dueDate: Date, currentDate: Date) => {
  let presentDate = currentDate;
  let dueDateMain = new Date(dueDate);
  if (isAfter(presentDate, dueDateMain)) {
    return 'brand';
  } else {
    return 'red';
  }
};

interface optionsInterface {
  locale?: Locale;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
// Get relative date
export const getRelativeDate = (
  date: Date,
  baseDate: Date,
  options: optionsInterface
) => {
  return Math.abs(differenceInDays(date, baseDate)) < 6
    ? formatRelative(date, baseDate, options)
    : format(date, `dd/MM/yyyy 'by' p`);
};
