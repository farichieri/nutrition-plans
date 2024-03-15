import { parseISO, format } from "date-fns";

const DateC = ({ dateString }: { dateString: string }) => {
  const date = parseISO(dateString);
  return (
    <time className="" dateTime={dateString}>
      {format(date, "LLLL d, yyyy")}
    </time>
  );
};
export default DateC;
