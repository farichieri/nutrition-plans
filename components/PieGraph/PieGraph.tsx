import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import React, { FC } from "react";

interface Props {
  calories: number | null;
  carbohydrates: number | null;
  fats: number | null;
  proteins: number | null;
}

const PieGraph: FC<Props> = ({ calories, carbohydrates, fats, proteins }) => {
  // 4 9 4 rule

  const createData = () => {
    const carbsPercentage = (Number(carbohydrates) * 4) / Number(calories);
    const fatsPercentage = (Number(fats) * 9) / Number(calories);
    const protsPercentage = (Number(proteins) * 4) / Number(calories);
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

  return (
    <div className="flex h-64 w-full overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={renderCustomizedLabel}
            outerRadius={80}
            innerRadius={60}
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
