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

interface Props {}

const Graphic: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);
  const weight_goal = user?.weight_goal;
  const { progress } = useSelector(selectProgressSlice);
  const startDate =
    user?.created_at && format(new Date(user.created_at), "MM-dd-yyyy");
  const startDateF = startDate && format(new Date(startDate), "MM-yyyy");

  const createData = () => {
    if (!user || !startDate || !progress) return;
    const { body_data } = user.first_data;
    const userStartWeight = body_data.weight_in_kg;
    const data = [
      {
        date: startDateF,
        weight: userStartWeight,
      },
    ];
    let date = new Date(startDate);
    for (let i = 0; i <= 12; i++) {
      let newDdate = format(addMonths(date, 1), "MM-dd-yyyy");
      data.push({
        date: format(new Date(newDdate), "MM-yyyy"),
        weight: null,
      });
      date = new Date(newDdate);
    }
    Object.keys(progress).map((p) => {
      const finded = data.find((d) => d.date === progress[p].date);
      if (finded) {
        finded.weight = progress[p].weight;
      } else {
        data.push({
          date: progress[p].date,
          weight: progress[p].weight,
        });
      }
    });
    return data.sort((a, b) => {
      const first = formatISO(parse(String(a.date), "MM-yyyy", new Date()));
      const second = formatISO(parse(String(b.date), "MM-yyyy", new Date()));
      return first.localeCompare(second);
    });
  };

  const data = createData();

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
          Goal {weight_goal?.weight_goal_in_kg} kg
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
    <div className="flex h-96 w-full max-w-5xl overflow-hidden bg-white dark:bg-black">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="date"
            label={{ value: "Date", position: "insideBottom", offset: -10 }}
            tickFormatter={formatXAxis}
            tickSize={12}
          />
          <YAxis
            unit="kg"
            domain={[50, 100]}
            label={{
              value: "Weight",
              angle: -90,
              position: "insideLeft",
              offset: -5,
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
          {weight_goal?.weight_goal_in_kg && (
            <ReferenceLine
              y={weight_goal?.weight_goal_in_kg}
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
