import {
  addOneWeek,
  getDatePlusDays,
  getDaysOfWeek,
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
import { FC, useEffect, useState } from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { selectAuthSlice } from "@/features/authentication";
import { StartsOfWeek } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Options, Option } from "@/components";
import DateSelector from "@/components/date-selector";
import Link from "next/link";
import RoundButton from "@/components/Buttons/RoundButton";

interface Props {
  date: string;
  baseURL: string;
}

const DaySelector: FC<Props> = ({ date, baseURL }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(selectAuthSlice);
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
  const dateF = String(
    getRealDate({
      date,
      userStartOfWeek: user?.startOfWeek || StartsOfWeek.Sunday,
    })
  );
  const datesInterval = getDaysOfWeek(dateF);
  const isWeek = getIsWeek(dateF) && datesInterval?.length === 7;
  const isDay = datesInterval?.length === 1;
  const isRange = Boolean(
    datesInterval && !isWeek && datesInterval?.length > 1
  );
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

  const todayRoute = `${baseURL}${BaseDatesEnum.today}`;
  const thisWeekRoute = `${baseURL}${BaseDatesEnum.this_week}`;

  const backRoute = () => {
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

  const handleSelectRange = ({ date }: { date: string }): void => {
    router.push(`${baseURL}${date}`);
  };

  const handleOpenDateRange = () => {
    setIsDateRangeOpen(true);
  };

  return (
    <div className="m-auto flex w-full items-center justify-between px-1 xs:px-1 s:px-1 sm:px-4 lg:px-10">
      <div className="flex items-center gap-2 sm:gap-10 ">
        <Options>
          <Option
            position="left"
            selected={isDay}
            onClick={() => router.push(todayRoute)}
          >
            {/* <Link href={todayRoute}>Day</Link> */}
            Day
          </Option>
          <Option
            position="middle"
            selected={isWeek}
            onClick={() => router.push(thisWeekRoute)}
          >
            {/* <Link href={thisWeekRoute}>Week</Link> */}
            Week
          </Option>
          <Option
            onClick={handleOpenDateRange}
            position="right"
            selected={isRange}
          >
            <DateSelector
              setIsDateRangeOpen={setIsDateRangeOpen}
              isDateRangeOpen={isDateRangeOpen}
              handleSelectRange={handleSelectRange}
            />
          </Option>
        </Options>
      </div>
      <div className="ml-2 flex flex-col items-center justify-center">
        {(isDay || isWeek) && (
          <div className="flex w-full max-w-sm items-center justify-center xs:gap-2 lg:w-auto">
            <Link href={backRoute()}>
              <RoundButton customClass="p-1.5 sm:h-10 sm:w-10 h-6 w-6">
                <MdArrowLeft className="h-6 w-6 min-w-fit" />
              </RoundButton>
            </Link>
            <span className="opacity-65 flex w-full min-w-max justify-center text-xs font-medium capitalize text-green-500 xs:text-sm s:text-base sm:text-xl md:text-2xl lg:w-96">
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
        )}
      </div>
    </div>
  );
};

export default DaySelector;
