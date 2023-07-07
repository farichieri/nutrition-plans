import {
  MdCalendarMonth,
  MdClose,
  MdOutlineCalendarMonth,
} from "react-icons/md";
import DatePicker from "react-datepicker";
import React, { FC, useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { addMonths } from "date-fns";
import { convertToWeekDate } from "@/utils";
import { RoundButton } from "../Buttons";

interface Props {
  handleSelectRange: Function;
  isDateRangeOpen: boolean;
  setIsDateRangeOpen: Function;
}

const DateSelector: FC<Props> = ({
  handleSelectRange,
  isDateRangeOpen,
  setIsDateRangeOpen,
}) => {
  const [dateRange, setDateRange] = useState<any[]>([null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    if (dateRange[0] instanceof Date && dateRange[1] instanceof Date) {
      const dateFormatted = convertToWeekDate({ range: dateRange });
      handleSelectRange({ date: dateFormatted });
    }
  }, [dateRange]);

  const handleClose = (event: React.MouseEvent) => {
    if (dateRange[0] instanceof Date && dateRange[1] instanceof Date) {
      handleSelectRange({ date: "today" });
    }
    setDateRange([null, null]);
    setIsDateRangeOpen(false);
    event.stopPropagation();
  };

  return (
    <div className="relative flex items-center">
      <div className="">
        {isDateRangeOpen ? (
          <MdCalendarMonth className=" pointer-events-none h-6 w-6 cursor-pointer" />
        ) : (
          <MdOutlineCalendarMonth className=" pointer-events-none h-6 w-6 cursor-pointer" />
        )}
      </div>
      {isDateRangeOpen && (
        <div
          className={`fixed left-4 flex h-10 w-screen items-center gap-1 bg-primary-color sm:absolute sm:left-12`}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <MdOutlineCalendarMonth
            onClick={() => setIsDateRangeOpen(!isDateRangeOpen)}
            className=" flex h-6 w-6 cursor-pointer sm:hidden"
          />
          <div className="flex items-center gap-1">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              selected={startDate}
              onChange={(update: any) => {
                console.log({ update });
                setDateRange(update);
              }}
              placeholderText="Select a date range"
              monthsShown={2}
              maxDate={addMonths(dateRange[0], 1)}
              minDate={dateRange[0]}
              className="pointer text-sm"
            />
            <RoundButton customClass="p-1.5" onClick={handleClose}>
              <MdClose className="h-6 w-6 cursor-pointer" />
            </RoundButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelector;
