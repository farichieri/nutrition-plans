import { addMonths, format, formatISO, parse } from "date-fns";
import { selectAuthSlice } from "@/features/authentication";
import { selectProgressSlice } from "@/features/progress";
import { useSelector } from "react-redux";
import React, { FC } from "react";
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
import { formatToUSDate, formatTwoDecimals } from "@/utils";
import { getWeight, getWeightText, getWeightUnit } from "@/utils/calculations";
import { MeasurementUnits } from "@/types";

interface Props {}

const Graphic: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  if (!user) return <>No user found.</>;

  const { weight_goal, created_at, measurement_unit } = user;
  const { progress } = useSelector(selectProgressSlice);
  const { body_data } = user.first_data;

  if (!created_at) return <></>;

  const startDate = format(new Date(created_at), "MM-dd-yyyy");
  const startDateF = formatToUSDate(new Date(startDate));

  const userStartWeight = getWeight({
    to: measurement_unit,
    weight: formatTwoDecimals(Number(body_data.weight_in_kg)),
  });

  const createData = () => {
    if (!startDate || !progress) return;
    const data: { date: string; weight: null | number }[] = [
      {
        date: startDateF,
        weight: userStartWeight,
      },
    ];
    let date = new Date(startDate);
    for (let i = 0; i <= 12; i++) {
      let newDdate = format(addMonths(date, 1), "MM-dd-yyyy");
      data.push({
        date: formatToUSDate(new Date(newDdate)),
        weight: null,
      });
      date = new Date(newDdate);
    }
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
        });
      }
    });
    return data.sort((a, b) => {
      const first = formatISO(parse(String(a.date), "MM-dd-yyyy", new Date()));
      const second = formatISO(parse(String(b.date), "MM-dd-yyyy", new Date()));
      return first.localeCompare(second);
    });
  };

  const data = createData();
  const weightGoal = getWeight({
    to: measurement_unit,
    weight: Number(weight_goal.weight_goal_in_kg),
  });

  const getDomain = () => {
    const weights = data?.map((w) => w.weight || userStartWeight) || [
      userStartWeight,
    ];
    weights.push(weightGoal);
    const maxWeightInData = Math.max(...weights);
    const minWeightInData = Math.min(...weights);
    const domainDiff = measurement_unit === MeasurementUnits.metric ? 5 : 10;
    return [minWeightInData - domainDiff, maxWeightInData + domainDiff];
  };

  const domain = getDomain();

  const CustomLabel = (props: any) => {
    return (
      <g>
        <text
          x={"50%"}
          y={props.viewBox.y}
          fill="gray"
          textAnchor="start"
          fontWeight={500}
          dominantBaseline="central"
          fontSize={12}
        >
          Goal {getWeightText({ weight: weightGoal, from: measurement_unit })}
        </text>
      </g>
    );
  };

  const formatXAxis = (value: any) => {
    if (value === startDateF || value.slice(0, 2) === "01") {
      return value;
    } else {
      return value.slice(0, 2);
    }
  };

  return (
    <div className="flex h-96 w-full max-w-5xl overflow-hidden ">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 30,
            bottom: 20,
          }}
        >
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="date"
            label={{ value: "Date", position: "insideBottom", offset: -15 }}
            tickFormatter={formatXAxis}
            tickSize={12}
          />
          <YAxis
            unit={getWeightUnit({ from: measurement_unit })}
            domain={domain}
            label={{
              value: "Weight",
              angle: -90,
              position: "insideLeft",
              offset: -20,
            }}
            tickCount={10}
          />
          <Tooltip />
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
              label={CustomLabel}
              stroke="red"
              strokeWidth={1}
            />
          )}
          {/* <Customized component={CustomizedCross} /> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graphic;
