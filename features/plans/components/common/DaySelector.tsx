import {
  addOneWeek,
  getDatePlusDays,
  getIsToday,
  getIsWeek,
  getLastWeek,
  getNextWeek,
  getStartOfWeek,
  getTomorrow,
  getYesterday,
  restOneWeek,
} from "@/utils";
import {
  convertDateToDateString,
  getRealDate,
  setPlansDate,
} from "@/features/plans";
import { BaseDatesEnum } from "@/types/datesTypes";
import { FC, useEffect } from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { selectAuthSlice } from "@/features/authentication";
import { StartsOfWeek } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import RoundButton from "@/components/Buttons/RoundButton";

interface Props {
  date: string;
}

const fixedButtonClass =
  "relative after:absolute border-b border-b text-sm sm:text-lg after:bottom-[-1px] after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-green-500 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100";

const selectedClass = "after:origin-bottom-left after:scale-x-100";

const DaySelector: FC<Props> = ({ date }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const dateF = String(
    getRealDate({
      date,
      userStartOfWeek: StartsOfWeek[user?.startOfWeek || "sunday"],
    })
  );
  const isWeek = getIsWeek(dateF);
  const isToday = getIsToday(dateF);
  const weekDates = isWeek && String(dateF).split("~");

  useEffect(() => {
    dispatch(setPlansDate(dateF));
  }, [dateF]);

  if (!user || !user.startOfWeek) return <></>;
  const { startOfWeek } = user;

  const startWeek =
    weekDates &&
    getStartOfWeek({ date: weekDates[0], userStartOfWeek: startOfWeek });

  const tomorrow = getTomorrow();
  const yesterday = getYesterday();
  const nextWeek = getNextWeek({ userStartOfWeek: startOfWeek });
  const lastWeek = getLastWeek({ userStartOfWeek: startOfWeek });

  const todayRoute = `/app/${BaseDatesEnum.today}`;
  const thisWeekRoute = `/app/${BaseDatesEnum.this_week}`;

  const backRoute = () => {
    let baseURL = `/app/`;
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
        if (startWeek) {
          return (
            baseURL +
            restOneWeek({ date: startWeek, userStartOfWeek: startOfWeek })
          );
        } else {
          return baseURL + BaseDatesEnum.this_week;
        }
      default:
        if (isWeek && startWeek) {
          return (
            baseURL +
            (restOneWeek({ date: startWeek, userStartOfWeek: startOfWeek }) ===
            nextWeek
              ? BaseDatesEnum.next_week
              : restOneWeek({ date: startWeek, userStartOfWeek: startOfWeek }))
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
    let baseURL = `/app/`;
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
        if (startWeek) {
          return (
            baseURL +
            addOneWeek({ date: startWeek, userStartOfWeek: startOfWeek })
          );
        } else {
          return baseURL + BaseDatesEnum.this_week;
        }
      case BaseDatesEnum.last_week:
        return baseURL + BaseDatesEnum.this_week;
      default:
        if (isWeek && startWeek) {
          return (
            baseURL +
            (addOneWeek({ date: startWeek, userStartOfWeek: startOfWeek }) ===
            lastWeek
              ? BaseDatesEnum.last_week
              : addOneWeek({ date: startWeek, userStartOfWeek: startOfWeek }))
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

  return (
    <div className="m-auto flex w-full justify-between px-1 xs:px-2 s:px-3 sm:px-4 lg:px-10">
      <div className="ml-2 flex flex-col items-center justify-center">
        <div className="flex w-full max-w-sm items-center justify-center xs:gap-5 lg:w-auto">
          <Link href={backRoute()}>
            <RoundButton customClass="p-1.5 sm:h-10 sm:w-10 h-6 w-6">
              <MdArrowLeft className="h-6 w-6 min-w-fit" />
            </RoundButton>
          </Link>
          <span className="opacity-65 flex w-full min-w-max justify-center text-base font-medium capitalize text-green-500 sm:text-xl md:text-2xl lg:w-96">
            {convertDateToDateString({
              date: dateF,
              userStartOfWeek: startOfWeek,
            })}
          </span>
          <Link href={nextRoute()}>
            <RoundButton customClass="p-1.5 sm:h-10 sm:w-10 h-6 w-6">
              <MdArrowRight className="h-6 w-6 min-w-fit" />
            </RoundButton>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-5 sm:gap-10 ">
        <Link
          href={todayRoute}
          className={
            fixedButtonClass + (!isWeek && isToday ? selectedClass : "")
          }
        >
          Today
        </Link>
        <Link
          href={thisWeekRoute}
          className={fixedButtonClass + (isWeek ? selectedClass : "")}
        >
          This Week
        </Link>
      </div>
    </div>
  );
};

export default DaySelector;
