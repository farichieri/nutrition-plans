import { selectAuthSlice } from "@/store/slices/authSlice";
import { addMonths, format, formatISO, parse, parseISO } from "date-fns";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  Cross,
  Customized,
  Dot,
  ReferenceLine,
} from "recharts";

interface Props {}

const Graphic: FC<Props> = () => {
  const { user } = useSelector(selectAuthSlice);

  console.log({ user });

  // const createData = () => {
  //   if (!user) return;
  //   const userStartWeight = user.weight_in_kg;
  //   const startDate = format(new Date(user.created_at), "MM-dd-yyyy");
  //   const data = [
  //     {
  //       date: startDate,
  //       weight: userStartWeight,
  //     },
  //   ];
  //   let date = new Date(startDate);
  //   let weight = userStartWeight;
  //   for (let i = 0; i <= 12; i++) {
  //     let newDdate = format(addMonths(date, 1), "MM-dd-yyyy");
  //     let newWeight = weight + 1;
  //     data.push({
  //       date: newDdate,
  //       weight: newWeight,
  //     });
  //     date = new Date(newDdate);
  //     weight = newWeight;
  //   }
  //   return data;
  // };

  // console.log(createData());

  const data = [
    {
      name: "04/2022",
      uv: 80,
    },
    {
      name: "05",
      uv: 79,
    },
    {
      name: "06",
      uv: 78,
    },
    {
      name: "07",
      uv: 77,
    },
    {
      name: "08",
      uv: 76,
    },
    {
      name: "09",
      uv: 75,
    },
    {
      name: "10",
      uv: 74,
    },
    {
      name: "11",
      uv: null,
    },
    {
      name: "12",
      uv: 70,
    },
    {
      name: "01/2024",
      uv: null,
    },
    {
      name: "02",
      uv: null,
    },
    {
      name: "03",
      uv: null,
    },
    {
      name: "04",
      uv: null,
    },
  ];

  // const CustomizedCross = (props) => {
  //   const { width, height, stroke, fill, formattedGraphicalItems } = props;
  //   // get first series in chart
  //   const firstSeries = formattedGraphicalItems[0];
  //   // get any point at any index in chart
  //   const secondPoint = firstSeries?.props?.points[8];

  //   // render custom content using points from the graph
  //   return (
  //     <Cross
  //       y={secondPoint?.y}
  //       x={secondPoint?.x}
  //       r={3}
  //       height={0}
  //       width={width}
  //       stroke={stroke ?? "red"}
  //       fill={fill ?? "red"}
  //     />
  //   );
  // };

  const CustomLabel = (props: any) => {
    return (
      <g>
        <text
          x={"50%"}
          y={props.viewBox.y}
          fill="gray"
          dx={"auto"}
          textAnchor="start"
          fontWeight={500}
          dominantBaseline="central"
          fontSize={12}
        >
          Goal {70} kg
        </text>
      </g>
    );
  };

  return (
    <div className="flex h-96 w-full max-w-5xl overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={{ value: "Date", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            unit="kg"
            domain={[50, "auto"]}
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
            dataKey="uv"
            stroke="#44a10569"
            fill="#61eb0569"
          />
          <Line type="monotone" dataKey="value" stroke="red" dot={false} />
          <ReferenceLine
            y={70}
            label={CustomLabel}
            // label="Goal: 70 kg"
            stroke="red"
            strokeWidth={1}
          />
          {/* <Customized component={CustomizedCross} /> */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graphic;
