import {
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
} from "@/utils/dateFormat";
import { BaseDatesEnum } from "@/types/datesTypes";
import { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import RoundButton from "@/components/Buttons/RoundButton";

interface Props {}

const fixedButtonClass =
  "relative after:absolute after:bottom-[-1px] after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-green-500 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100";

const selectedClass = "after:origin-bottom-left after:scale-x-100";

const DaySelector: FC<Props> = () => {
  const router = useRouter();
  const { id, date } = router.query;
  const today = getToday();
  const thisWeek = getThisWeek();
  const tomorrow = getTomorrow();
  const yesterday = getYesterday();
  const nextWeek = getNextWeek();
  const lastWeek = getLastWeek();
  const todayRoute = `/app/plans/${id}/${BaseDatesEnum.today}`;
  const thisWeekRoute = `/app/plans/${id}/${BaseDatesEnum.this_week}`;

  const getRealDate = () => {
    switch (date) {
      case BaseDatesEnum.today:
        return today;
      case BaseDatesEnum.tomorrow:
        return tomorrow;
      case BaseDatesEnum.yesterday:
        return yesterday;
      case BaseDatesEnum.this_week:
        return thisWeek;
      case BaseDatesEnum.next_week:
        return nextWeek;
      case BaseDatesEnum.last_week:
        return lastWeek;
      default:
        return date;
    }
  };

  const dateF = String(getRealDate());
  const isWeek = dateF?.includes("~");
  const weekDates = isWeek && String(dateF).split("~");
  const startOfWeek = weekDates && getStartOfWeek(weekDates[0]);

  const backRoute = () => {
    let baseURL = `/app/plans/${id}/`;
    switch (date) {
      case BaseDatesEnum.today:
        return baseURL + BaseDatesEnum.yesterday;
      case BaseDatesEnum.tomorrow:
        return baseURL + BaseDatesEnum.today;
      case BaseDatesEnum.yesterday:
        return baseURL + `${getDatePlusDays(dateF, -1)}`;
      case BaseDatesEnum.this_week:
        return baseURL + BaseDatesEnum.last_week;
      case BaseDatesEnum.next_week:
        return baseURL + BaseDatesEnum.this_week;
      case BaseDatesEnum.last_week:
        if (startOfWeek) {
          return baseURL + getWeekPlusDays(startOfWeek, -7);
        } else {
          return baseURL + BaseDatesEnum.this_week;
        }
      default:
        if (isWeek && startOfWeek) {
          return (
            baseURL +
            (getWeekPlusDays(startOfWeek, -7) === nextWeek
              ? BaseDatesEnum.next_week
              : getWeekPlusDays(startOfWeek, -7))
          );
        } else {
          return (
            baseURL +
            (getDatePlusDays(dateF, -1) === tomorrow
              ? BaseDatesEnum.tomorrow
              : getDatePlusDays(dateF, -1))
          );
        }
    }
  };

  const nextRoute = () => {
    let baseURL = `/app/plans/${id}/`;
    switch (date) {
      case BaseDatesEnum.today:
        return baseURL + BaseDatesEnum.tomorrow;
      case BaseDatesEnum.tomorrow:
        return baseURL + `${getDatePlusDays(dateF, 1)}`;
      case BaseDatesEnum.yesterday:
        return baseURL + BaseDatesEnum.today;
      case BaseDatesEnum.this_week:
        return baseURL + BaseDatesEnum.next_week;
      case BaseDatesEnum.next_week:
        if (startOfWeek) {
          return baseURL + getWeekPlusDays(startOfWeek, 7);
        } else {
          return baseURL + BaseDatesEnum.this_week;
        }
      case BaseDatesEnum.last_week:
        return baseURL + BaseDatesEnum.this_week;
      default:
        if (isWeek && startOfWeek) {
          return (
            baseURL +
            (getWeekPlusDays(startOfWeek, 7) === lastWeek
              ? BaseDatesEnum.last_week
              : getWeekPlusDays(startOfWeek, 7))
          );
        } else {
          return (
            baseURL +
            (getDatePlusDays(dateF, 1) === yesterday
              ? BaseDatesEnum.yesterday
              : getDatePlusDays(dateF, 1))
          );
        }
    }
  };

  const formatDate = () => {
    switch (date) {
      case BaseDatesEnum.today:
        return "Today";
      case BaseDatesEnum.yesterday:
        return "Yesterday";
      case BaseDatesEnum.tomorrow:
        return "Tomorrow";
      case BaseDatesEnum.this_week:
        return "This Week";
      case BaseDatesEnum.next_week:
        return "Next Week";
      case BaseDatesEnum.last_week:
        return "Last Week";
      default:
        if (isWeek && weekDates) {
          return `Week of ${getMonthDate(String(weekDates[0]))}`;
        } else {
          return formatToLongDate(String(dateF));
        }
    }
  };

  return (
    <div className="bg m-auto flex flex-wrap items-center gap-2 sm:gap-10">
      <div className="flex w-full flex-col items-center justify-center sm:w-auto">
        <div className="flex w-full items-center justify-center gap-10 sm:w-auto">
          <Link href={backRoute()}>
            <RoundButton>
              <span className="material-icons-outlined md-14">
                arrow_back_ios
              </span>
            </RoundButton>
          </Link>
          <span className="flex w-40 justify-center text-sm opacity-75">
            {formatDate()}
          </span>
          <Link href={nextRoute()}>
            <RoundButton>
              <span className="material-icons-outlined md-14">
                arrow_forward_ios
              </span>
            </RoundButton>
          </Link>
        </div>
        <span className="text-xs opacity-50">{dateF}</span>
      </div>

      <div className="flex w-full items-center justify-center gap-10 sm:w-auto">
        <Link
          href={todayRoute}
          className={fixedButtonClass + (!isWeek ? selectedClass : "")}
        >
          Today
        </Link>
        <Link
          href={thisWeekRoute}
          className={fixedButtonClass + (isWeek ? selectedClass : "")}
        >
          Week
        </Link>
      </div>
    </div>
  );
};

export default DaySelector;
