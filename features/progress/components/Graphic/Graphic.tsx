import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ReferenceLine,
} from "recharts";
import {
  formatToUSDate,
  formatTwoDecimals,
  getDayAndMonth,
  getMonthMMM,
} from "@/utils";
import { format, formatISO, parse } from "date-fns";
import { getWeight, getWeightText, getWeightUnit } from "@/utils/calculations";
import { MeasurementUnits } from "@/types";
import { selectAuthSlice } from "@/features/authentication";
import { selectProgressSlice } from "@/features/progress";
import { useSelector } from "react-redux";
import CustomLabel from "./CustomLabel";
import CustomTooltip from "./CustomTooltip";
import React, { FC } from "react";

interface Props {}

const Graphic: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  if (!user) return <>No user found.</>;

  const { weight_goal, created_at, measurement_unit } = user;
  const { progress } = useSelector(selectProgressSlice);
  const { body_data } = user.first_data;

  if (!created_at) return <></>;

  const weightUnit = getWeightUnit({ from: measurement_unit });

  const startDate = format(new Date(created_at), "MM-dd-yyyy");
  const startDateF = formatToUSDate(new Date(startDate));

  const userStartWeight = getWeight({
    to: measurement_unit,
    weight: formatTwoDecimals(Number(body_data.weight_in_kg)),
  });

  const weightGoal = getWeight({
    to: measurement_unit,
    weight: Number(weight_goal.weight_goal_in_kg),
  });
  const dueDateGoal = weight_goal.due_date;

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
    // let date = getStartOfMonth(startDate);
    // for (let i = 0; i <= 12; i++) {
    //   let newDdate = format(addMonths(date, 1), "MM-dd-yyyy");
    //   console.log({ newDdate });
    //   data.push({
    //     date: formatToUSDate(new Date(newDdate)),
    //     weight: null,
    //     isMonthRepresentation: true,
    //   });
    //   date = new Date(newDdate);
    // }
    Object.keys(progress).map((p) => {
      const finded = data.find((d) => d.date === progress[p].date);
      const weight = formatTwoDecimals(
        getWeight({
          to: measurement_unit,
          weight: Number(progress[p].weight_in_kg),
        })
      );
      if (finded) {
        finded.weight = weight;
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
    weights.push(weightGoal);
    const maxWeightInData = Math.max(...weights);
    const minWeightInData = Math.min(...weights);
    const domainDiff = measurement_unit === MeasurementUnits.metric ? 5 : 10;
    const min =
      minWeightInData - domainDiff > 45 ? maxWeightInData + domainDiff : 45;
    const max = maxWeightInData + domainDiff;
    return [min, max];
  };

  const domain = getDomain();

  const verifyRepresentation = (date: string) => {
    return data?.find((d) => d.date === date)?.isMonthRepresentation;
  };

  const formatXAxis = (value: any) => {
    if (verifyRepresentation(value)) {
      return getMonthMMM(value);
    } else if (value === startDateF || value.slice(0, 2) === "01") {
      return value;
    } else {
      return getDayAndMonth(value);
    }
  };

  return (
    <div className="flex h-96 w-full max-w-5xl overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 30,
            bottom: 20,
          }}
        >
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="date"
            label={{
              value: "Date",
              position: "insideBottom",
              offset: -20,
            }}
            tickFormatter={formatXAxis}
            tickSize={12}
          />
          <YAxis
            unit={weightUnit}
            domain={domain}
            label={{
              value: "Weight",
              angle: -90,
              position: "insideLeft",
              offset: -20,
            }}
            tickCount={10}
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
            fill="#61eb0569"
          />
          <Line type="monotone" dataKey="value" stroke="red" dot={false} />
          {weightGoal && (
            <ReferenceLine
              y={weightGoal}
              label={(props) => (
                <CustomLabel
                  props={props}
                  text={`Goal ${getWeightText({
                    weight: weightGoal,
                    from: measurement_unit,
                  })}`}
                />
              )}
              stroke="red"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
          )}
          {weight_goal.due_date && (
            <ReferenceLine
              x={weight_goal.due_date}
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
