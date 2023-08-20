import {
  addDays,
  eachDayOfInterval,
  format,
  isValid,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { StartsOfWeek } from "@/types";

// in date-fns
const SUNDAY = 0;
const MONDAY = 1;

const getStartOfWeekNumber = ({
  userStartOfWeek,
}: {
  userStartOfWeek: StartsOfWeek;
}) => {
  switch (userStartOfWeek) {
    case StartsOfWeek.Sunday:
      return SUNDAY;
    case StartsOfWeek.Monday:
      return MONDAY;
    default:
      return SUNDAY;
  }
};

const isValidDate = (date: string): boolean => {
  let result = true;
  if (!date) {
    return false;
  }
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

const formatToInputDate = (date: Date): string => {
  const result = format(date, "yyyy-MM-dd");
  return result;
};

const getDatePlusDays = (date: string, days: number): string => {
  const result = addDays(new Date(date), days);
  return formatToUSDate(result);
};

const getStartOfWeek = ({
  date,
  userStartOfWeek,
}: {
  date: string;
  userStartOfWeek: StartsOfWeek;
}): string => {
  const startOfWeekNumber = getStartOfWeekNumber({ userStartOfWeek });
  const result = startOfWeek(new Date(date), {
    weekStartsOn: startOfWeekNumber,
  });
  return formatToUSDate(result);
};

const getStartOfMonth = (date: string): Date => {
  const result = startOfMonth(new Date(date));
  return result;
};

const restOneWeek = ({
  date,
  userStartOfWeek,
}: {
  date: string;
  userStartOfWeek: StartsOfWeek;
}): string => {
  const startWeek = getStartOfWeek({ date, userStartOfWeek });
  const result = `${getDatePlusDays(startWeek, -7)}~${getDatePlusDays(
    startWeek,
    -1
  )}`;
  return result;
};

const addOneWeek = ({
  date,
  userStartOfWeek,
}: {
  date: string;
  userStartOfWeek: StartsOfWeek;
}): string => {
  const startWeek = getStartOfWeek({ date, userStartOfWeek });
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

const convertToWeekDate = ({ range }: { range: Date[] }): string => {
  const start = formatToUSDate(range[0]);
  const end = formatToUSDate(range[1]);
  const result = `${start}~${end}`;
  return result;
};

const getThisWeek = ({
  userStartOfWeek,
}: {
  userStartOfWeek: StartsOfWeek;
}): string => {
  const startWeek = getStartOfWeek({ date: getToday(), userStartOfWeek });
  const result = `${startWeek}~${getDatePlusDays(startWeek, 6)}`;
  return result;
};

const getNextWeek = ({
  userStartOfWeek,
}: {
  userStartOfWeek: StartsOfWeek;
}): string => {
  const startWeek = getStartOfWeek({ date: getToday(), userStartOfWeek });
  return addOneWeek({ date: startWeek, userStartOfWeek });
};

const getLastWeek = ({
  userStartOfWeek,
}: {
  userStartOfWeek: StartsOfWeek;
}): string => {
  const startWeek = getStartOfWeek({ date: getToday(), userStartOfWeek });
  return restOneWeek({ date: startWeek, userStartOfWeek });
};

const getMonthDate = (date: string): string => {
  const result = formatToMonthDay(date);
  return result;
};

const getMonthMMM = (date: string): string => {
  const result = format(new Date(date), "MMM");
  return result;
};

const getDayAndMonth = (date: string): string => {
  const result = format(new Date(date), "MMM, d");
  return result;
};

const getDaysOfWeek = (week: string): string[] | [] => {
  try {
    if (!week.includes("~")) return [week];
    const start = new Date(week.split("~")[0]);
    const end = new Date(week.split("~")[1]);
    const intervalDates = eachDayOfInterval({
      start: start,
      end: end,
    });
    const dates = intervalDates.map((d) => formatToUSDate(d));
    return dates;
  } catch (error) {
    return [];
  }
};

const getThisWeekInterval = ({
  userStartOfWeek,
}: {
  userStartOfWeek: StartsOfWeek;
}): string[] => {
  const startWeek = getStartOfWeek({ date: getToday(), userStartOfWeek });
  const intervalDates = eachDayOfInterval({
    start: new Date(startWeek),
    end: new Date(getDatePlusDays(startWeek, 6)),
  });
  return intervalDates.map((d) => formatToUSDate(d));
};

const getIsWeek = (date: string): boolean => date.includes("~");
const getIsToday = (date: string): boolean => date === getToday();

const getDaysLeft = ({ date }: { date: Date | null }): number => {
  if (!date) return 0;
  const today = new Date();
  const due = new Date(date);
  const daysLeft = Math.floor(
    (due.getTime() - today.getTime()) / (1000 * 3600 * 24)
  );
  return daysLeft + 1;
};

export {
  addOneWeek,
  convertToWeekDate,
  formatToInputDate,
  formatToMonthDay,
  formatToShortDate,
  formatToUSDate,
  getDatePlusDays,
  getDayAndMonth,
  getDaysOfWeek,
  getIsToday,
  getIsWeek,
  getLastWeek,
  getMonthDate,
  getMonthMMM,
  getNextWeek,
  getStartOfMonth,
  getStartOfWeek,
  getThisWeek,
  getThisWeekInterval,
  getToday,
  getTomorrow,
  getYesterday,
  isValidDate,
  restOneWeek,
  getDaysLeft,
};
