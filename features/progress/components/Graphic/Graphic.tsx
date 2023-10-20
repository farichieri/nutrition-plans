import { selectAuthSlice } from "@/features/authentication";
import { selectProgressSlice } from "@/features/progress";
import { WeightUnitsT } from "@/types";
import {
  formatToUSDate,
  formatTwoDecimals,
  getDayAndMonth,
  getMonthMMM,
} from "@/utils";
import { getWeight, getWeightText, getWeightUnit } from "@/utils/calculations";
import { format, formatISO, parse } from "date-fns";
import { useTheme } from "next-themes";
import { FC } from "react";
import { useSelector } from "react-redux";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomLabel from "./CustomLabel";
import CustomTooltip from "./CustomTooltip";

interface Props {
  unitSelected: WeightUnitsT;
}

const Graphic: FC<Props> = ({ unitSelected }) => {
  const { user } = useSelector(selectAuthSlice);
  const { progress } = useSelector(selectProgressSlice);
  const { theme } = useTheme();

  if (!user) return <>No user found.</>;

  const { weightGoal, createdAt } = user;
  const { bodyData } = user.firstData;

  if (!createdAt) return <></>;

  const weightUnit = getWeightUnit({ from: unitSelected });

  const startDate = format(new Date(createdAt), "MM-dd-yyyy");
  const startDateF = formatToUSDate(new Date(startDate));

  const userStartWeight = getWeight({
    to: unitSelected,
    weight: formatTwoDecimals(Number(bodyData.weightInKg)),
  });

  const realWeightGoal = getWeight({
    to: unitSelected,
    weight: Number(weightGoal.weightGoalInKg),
  });
  const dueDateGoal = weightGoal.dueDate;

  const createData = () => {
    if (!startDate || !progress) return;
    const data: {
      date: string;
      weight: null | number;
      isMonthRepresentation: boolean;
    }[] = [
      {
        date: startDateF,
        weight: userStartWeight,
        isMonthRepresentation: true,
      },
    ];
    Object.keys(progress).forEach((p) => {
      const found = data.find((d) => d.date === progress[p].date);
      const weight = formatTwoDecimals(
        getWeight({
          to: unitSelected,
          weight: Number(progress[p].weightInKg),
        })
      );
      if (found) {
        found.weight = weight;
      } else {
        data.push({
          date: progress[p].date,
          weight: weight,
          isMonthRepresentation: false,
        });
      }
    });
    if (weightGoal && dueDateGoal) {
      data.push({
        date: dueDateGoal,
        weight: null,
        isMonthRepresentation: false,
      });
    }

    return data.sort((a, b) => {
      const first = formatISO(parse(String(a.date), "MM-dd-yyyy", new Date()));
      const second = formatISO(parse(String(b.date), "MM-dd-yyyy", new Date()));
      return first.localeCompare(second);
    });
  };

  const data = createData();

  const getDomain = () => {
    const weights = data?.map((w) => w.weight || userStartWeight) || [
      userStartWeight,
    ];
    weights.push(realWeightGoal);
    const maxWeightInData = Math.max(...weights);
    const minWeightInData = Math.min(...weights);
    const domainDiff = unitSelected === "kgs" ? 5 : 10;
    const min = minWeightInData - domainDiff;
    const max = maxWeightInData + domainDiff;
    return [min, max];
  };

  const domain = getDomain();

  const verifyRepresentation = (date: string) => {
    return data?.find((d) => d.date === date)?.isMonthRepresentation;
  };

  const formatXAxis = (value: any) => {
    if (verifyRepresentation(value)) {
      const date = parse(value, "MM-dd-yyyy", new Date());
      return getMonthMMM(formatISO(date));
    } else if (value === startDateF || value.slice(0, 2) === "01") {
      return value;
    } else {
      const date = parse(value, "MM-dd-yyyy", new Date());
      return getDayAndMonth(formatISO(date));
    }
  };

  return (
    <div id="tour-progress-3" className="flex h-96 w-full overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 0,
            right: 5,
            left: -10,
            bottom: 0,
          }}
        >
          <CartesianGrid stroke="none" />
          <XAxis dataKey="date" tickFormatter={formatXAxis} tickSize={12} />
          <YAxis
            unit={weightUnit}
            domain={domain}
            tickCount={10}
            style={{ fontSize: "0.8rem" }}
            tickFormatter={(value) => {
              return value.toFixed(0);
            }}
          />
          <Tooltip
            content={(props) => (
              <CustomTooltip
                active={props.active}
                payload={props.payload}
                label={props.label}
                weightUnit={weightUnit}
              />
            )}
            cursor={{ fill: "transparent" }}
          />
          <Area
            type="monotone"
            dataKey="weight"
            stroke="#44a10569"
            fill="#22c55e"
          />
          <Line type="monotone" dataKey="value" stroke="red" dot={false} />
          {weightGoal && (
            <ReferenceLine
              y={realWeightGoal}
              label={(props) => (
                <CustomLabel
                  props={props}
                  textColor={theme === "dark" ? "dark" : "light"}
                  text={`Goal ${getWeightText({
                    weight: realWeightGoal,
                    from: unitSelected === "lbs" ? "imperial" : "metric",
                  })}`}
                />
              )}
              stroke="red"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
          )}
          {weightGoal.dueDate && (
            <ReferenceLine
              x={weightGoal.dueDate}
              stroke="red"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graphic;
