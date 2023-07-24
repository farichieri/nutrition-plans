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
import { BaseDates } from "@/types/dates";
import { StartsOfWeek } from "@/types";

const isValidStringFormat = (date: string): boolean => {
  switch (date) {
    case BaseDates.today:
    case BaseDates.tomorrow:
    case BaseDates.yesterday:
    case BaseDates.this_week:
    case BaseDates.next_week:
    case BaseDates.last_week:
      return true;
    default:
      return false;
  }
};

const getRealDate = ({
  date,
  userStartOfWeek,
}: {
  date: string;
  userStartOfWeek: StartsOfWeek;
}): string => {
  switch (date) {
    case BaseDates.today:
      return getToday();
    case BaseDates.tomorrow:
      return getTomorrow();
    case BaseDates.yesterday:
      return getYesterday();
    case BaseDates.this_week:
      return getThisWeek({ userStartOfWeek });
    case BaseDates.next_week:
      return getNextWeek({ userStartOfWeek });
    case BaseDates.last_week:
      return getLastWeek({ userStartOfWeek });
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
      return BaseDates.today;
    case isTomorrow:
      return BaseDates.tomorrow;
    case isYesterday:
      return BaseDates.yesterday;
    default:
      return date;
  }
};

const convertDateToDateString = ({
  date,
  userStartOfWeek,
}: {
  date: string;
  userStartOfWeek: StartsOfWeek;
}) => {
  const isToday = getToday();
  const isTomorrow = getTomorrow();
  const isYesterday = getYesterday();
  const isNextWeek = getNextWeek({ userStartOfWeek });
  const isLastWeek = getLastWeek({ userStartOfWeek });
  const isThisWeek = getThisWeek({ userStartOfWeek });

  const dateF = String(getRealDate({ date, userStartOfWeek }));
  const isWeek = getIsWeek(dateF);
  const weekDates = isWeek && String(dateF).split("~");

  switch (date) {
    case isToday:
      return BaseDates.today;
    case isTomorrow:
      return BaseDates.tomorrow;
    case isYesterday:
      return BaseDates.yesterday;
    case isNextWeek:
      return BaseDates.next_week.replace("-", " ");
    case isLastWeek:
      return BaseDates.last_week.replace("-", " ");
    case isThisWeek:
      return BaseDates.this_week.replace("-", " ");
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
