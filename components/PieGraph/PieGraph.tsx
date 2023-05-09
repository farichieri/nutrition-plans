import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import React, { FC } from "react";
import { FoodNutrients } from "@/types/foodTypes";

interface Props {
  nutrients: FoodNutrients;
}

const PieGraph: FC<Props> = ({ nutrients }) => {
  // 4 9 4 rule

  const createData = () => {
    const carbsPercentage =
      (Number(nutrients.carbohydrates) * 4) / Number(nutrients.calories);
    const fatsPercentage =
      (Number(nutrients.fats) * 9) / Number(nutrients.calories);
    const protsPercentage =
      (Number(nutrients.proteins) * 4) / Number(nutrients.calories);
    return [
      { name: "Carbs", value: carbsPercentage },
      { name: "Fats", value: protsPercentage },
      { name: "Proteins", value: fatsPercentage },
    ];
  };

  const data = createData();

  const COLORS = [
    "var(--carbs-color)",
    "var(--fats-color)",
    "var(--prots-color)",
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const radius = 35 + innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        <tspan fontSize={15} fontWeight={400} fill="gray">
          {`${(percent * 100).toFixed(0)}%`} {data[index].name}
        </tspan>
      </text>
    );
  };

  if (!nutrients.calories && !nutrients.proteins && !nutrients.carbohydrates) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        No Nutrition values provided
      </div>
    );
  }

  return (
    <div className="m-auto flex h-48 w-72 overflow-hidden sm:w-full ">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={renderCustomizedLabel}
            outerRadius={50}
            innerRadius={30}
            fill="#8884d8"
            dataKey="value"
            className="outline-none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                className="select-none outline-none"
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieGraph;
