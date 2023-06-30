import React, { FC, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface Props {}

const DateSelector: FC<Props> = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  console.log({ dateRange });

  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      selected={startDate}
      onChange={(update: any) => {
        setDateRange(update);
      }}
      isClearable={true}
      placeholderText="Select a date range"
    />
  );
};

export default DateSelector;
