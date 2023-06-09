import {
  addDays,
  eachDayOfInterval,
  format,
  isValid,
  startOfWeek,
} from "date-fns";

// in date-fns
const SUNDAY = 0;
const MONDAY = 1;

const isValidDate = (date: string): boolean => {
  let result = true;
  const dateSplitted = date.split("~");
  const start = dateSplitted[0];
  const end = dateSplitted[1];
  if (!isValid(new Date(start))) result = false;
  if (end && !isValid(new Date(end))) result = false;

  return result;
};

const formatToUSDate = (date: Date): string => {
  if (!isValid(date)) date = new Date();
  const result = format(date, "MM-dd-yyyy");
  return result;
};

const formatToShortDate = (date: string): string => {
  const result = format(new Date(date), "eee, LLLL dd");
  return result;
};

const formatToMonthDay = (date: string): string => {
  const result = format(new Date(date), "LLLL dd");
  return result;
};

const getDatePlusDays = (date: string, days: number): string => {
  const result = addDays(new Date(date), days);
  return formatToUSDate(result);
};

const getStartOfWeek = (date: string): string => {
  const result = startOfWeek(new Date(date), { weekStartsOn: MONDAY });
  return formatToUSDate(result);
};

const restOneWeek = (date: string): string => {
  const startWeek = getStartOfWeek(date);
  const result = `${getDatePlusDays(startWeek, -7)}~${getDatePlusDays(
    startWeek,
    -1
  )}`;
  return result;
};

const addOneWeek = (date: string): string => {
  const startWeek = getStartOfWeek(date);
  const result = `${getDatePlusDays(startWeek, 7)}~${getDatePlusDays(
    startWeek,
    13
  )}`;
  return result;
};

const getToday = (): string => {
  const result = new Date();
  return formatToUSDate(result);
};

const getTomorrow = (): string => {
  const today = getToday();
  const result = getDatePlusDays(today, 1);
  return result;
};

const getYesterday = (): string => {
  const today = getToday();
  const result = getDatePlusDays(today, -1);
  return result;
};

const getThisWeek = (): string => {
  const startWeek = getStartOfWeek(getToday());
  const result = `${startWeek}~${getDatePlusDays(startWeek, 6)}`;
  return result;
};

const getNextWeek = (): string => {
  const startWeek = getStartOfWeek(getToday());
  return addOneWeek(startWeek);
};

const getLastWeek = (): string => {
  const startWeek = getStartOfWeek(getToday());
  return restOneWeek(startWeek);
};

const getMonthDate = (date: string): string => {
  const result = formatToMonthDay(date);
  return result;
};

const getDaysOfWeek = (week: string): string[] | null => {
  try {
    const start = new Date(week.split("~")[0]);
    const end = new Date(week.split("~")[1]);
    const intervalDates = eachDayOfInterval({
      start: start,
      end: end,
    });
    const dates = intervalDates.map((d) => formatToUSDate(d));
    return dates;
  } catch (error) {
    return null;
  }
};

const getIsWeek = (date: string): boolean => date.includes("~");
const getIsToday = (date: string): boolean => date === getToday();

export {
  addOneWeek,
  formatToShortDate,
  getDatePlusDays,
  getDaysOfWeek,
  getIsToday,
  getIsWeek,
  getLastWeek,
  getMonthDate,
  getNextWeek,
  getStartOfWeek,
  getThisWeek,
  getToday,
  getTomorrow,
  getYesterday,
  isValidDate,
  restOneWeek,
};
