import DatePicker from "react-datepicker";
import React, { FC, useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { addMonths } from "date-fns";
import { convertToWeekDate } from "@/utils";
import {
  MdCalendarMonth,
  MdClose,
  MdOutlineCalendarMonth,
} from "react-icons/md";
import { RoundButton } from "../Buttons";

interface Props {
  handleSelectRange: Function;
}

const DateSelector: FC<Props> = ({ handleSelectRange }) => {
  const [dateRange, setDateRange] = useState<any[]>([null, null]);
  const [open, setOpen] = useState<boolean>(false);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    if (dateRange[0] instanceof Date && dateRange[1] instanceof Date) {
      const dateFormatted = convertToWeekDate({ range: dateRange });
      handleSelectRange({ date: dateFormatted });
    }
  }, [dateRange]);

  const handleClose = () => {
    handleSelectRange({ date: "today" });
    setOpen(false);
    setDateRange([null, null]);
  };

  return (
    <div
      className={`flex items-center gap-1 bg-primary-color ${
        open ? "absolute w-full" : "relative"
      }`}
    >
      <RoundButton customClass="p-1.5" onClick={() => setOpen(!open)}>
        {open ? (
          <MdCalendarMonth className="h-6 w-6 cursor-pointer" />
        ) : (
          <MdOutlineCalendarMonth className="h-6 w-6 cursor-pointer" />
        )}
      </RoundButton>
      {open && (
        <div className="flex items-center">
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            selected={startDate}
            onChange={(update: any) => {
              setDateRange(update);
            }}
            placeholderText="Select a date range"
            monthsShown={2}
            maxDate={addMonths(dateRange[0], 1)}
            minDate={dateRange[0]}
          />
          <RoundButton customClass="p-1.5" onClick={handleClose}>
            <MdClose className="h-6 w-6 cursor-pointer" />
          </RoundButton>
        </div>
      )}
    </div>
  );
};

export default DateSelector;
