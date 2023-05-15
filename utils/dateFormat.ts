import { addDays, format, startOfWeek } from "date-fns";

// in date-fns
const SUNDAY = 0;
const MONDAY = 1;

const formatToUSDate = (date: Date): string => {
  const result = format(date, "MM-dd-yyyy");
  return result;
};

const formatToLongDate = (date: string): string => {
  const result = format(new Date(date), "eeee, LLLL dd");
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

const getWeekPlusDays = (week: string, days: number): string => {
  return `${getDatePlusDays(String(week), days)}~${getDatePlusDays(
    String(week),
    days * 2
  )}`;
};

const getStartOfWeek = (date: string): string => {
  const result = startOfWeek(new Date(date), { weekStartsOn: MONDAY });
  return formatToUSDate(result);
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
  const result = `${startWeek}~${getDatePlusDays(startWeek, 7)}`;
  return result;
};
const getNextWeek = (): string => {
  const startWeek = getStartOfWeek(getToday());
  const result = `${getDatePlusDays(startWeek, 7)}~${getDatePlusDays(
    startWeek,
    14
  )}`;
  return result;
};
const getLastWeek = (): string => {
  const startWeek = getStartOfWeek(getToday());
  const result = `${getDatePlusDays(startWeek, -14)}~${getDatePlusDays(
    startWeek,
    -7
  )}`;
  return result;
};

const getMonthDate = (date: string): string => {
  const result = formatToMonthDay(date);
  return result;
};

export {
  formatToLongDate,
  getDatePlusDays,
  getLastWeek,
  getMonthDate,
  getNextWeek,
  getStartOfWeek,
  getThisWeek,
  getToday,
  getTomorrow,
  getWeekPlusDays,
  getYesterday,
};
