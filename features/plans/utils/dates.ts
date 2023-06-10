import {
  formatToShortDate,
  getIsWeek,
  getLastWeek,
  getMonthDate,
  getNextWeek,
  getThisWeek,
  getToday,
  getTomorrow,
  getYesterday,
  isValidDate,
} from "@/utils/dateFormat";
import { BaseDatesEnum } from "@/types/datesTypes";

const isValidStringFormat = (date: string): boolean => {
  switch (date) {
    case BaseDatesEnum.today:
    case BaseDatesEnum.tomorrow:
    case BaseDatesEnum.yesterday:
    case BaseDatesEnum.this_week:
    case BaseDatesEnum.next_week:
    case BaseDatesEnum.last_week:
      return true;
    default:
      return false;
  }
};

const getRealDate = (date: string): string => {
  switch (date) {
    case BaseDatesEnum.today:
      return getToday();
    case BaseDatesEnum.tomorrow:
      return getTomorrow();
    case BaseDatesEnum.yesterday:
      return getYesterday();
    case BaseDatesEnum.this_week:
      return getThisWeek();
    case BaseDatesEnum.next_week:
      return getNextWeek();
    case BaseDatesEnum.last_week:
      return getLastWeek();
    default:
      if (!isValidDate(date)) {
        return getToday();
      }
      return date;
  }
};

const convertDayToUrlDate = (date: string) => {
  const isToday = getToday();
  const isTomorrow = getTomorrow();
  const isYesterday = getYesterday();

  switch (date) {
    case isToday:
      return BaseDatesEnum.today;
    case isTomorrow:
      return BaseDatesEnum.tomorrow;
    case isYesterday:
      return BaseDatesEnum.yesterday;
    default:
      return date;
  }
};

const convertDateToDateString = (date: string) => {
  const isToday = getToday();
  const isTomorrow = getTomorrow();
  const isYesterday = getYesterday();
  const isNextWeek = getNextWeek();
  const isLastWeek = getLastWeek();
  const isThisWeek = getThisWeek();

  const dateF = String(getRealDate(date));
  const isWeek = getIsWeek(dateF);
  const weekDates = isWeek && String(dateF).split("~");

  switch (date) {
    case isToday:
      return BaseDatesEnum.today;
    case isTomorrow:
      return BaseDatesEnum.tomorrow;
    case isYesterday:
      return BaseDatesEnum.yesterday;
    case isNextWeek:
      return BaseDatesEnum.next_week.replace("-", " ");
    case isLastWeek:
      return BaseDatesEnum.last_week.replace("-", " ");
    case isThisWeek:
      return BaseDatesEnum.this_week.replace("-", " ");
    default:
      if (isWeek && weekDates) {
        return `Week of ${getMonthDate(String(weekDates[0]))}`;
      } else {
        return formatToShortDate(String(dateF));
      }
  }
};

export {
  getRealDate,
  isValidStringFormat,
  convertDateToDateString,
  convertDayToUrlDate,
};
