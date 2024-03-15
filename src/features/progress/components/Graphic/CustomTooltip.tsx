import { FC } from "react";

interface Props {
  active: boolean | undefined;
  payload: any[] | undefined;
  label: string;
  weightUnit: string;
}

const CustomTooltip: FC<Props> = ({ active, payload, label, weightUnit }) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border bg-white/50 p-2 backdrop-blur-sm dark:bg-black/50">
        <span className="label">{`${label.replaceAll("-", "/")}`}</span>
        <div>
          {payload.map((pld, index) => (
            <div className="flex gap-1" key={index}>
              <div style={{ color: pld.fill }}>{pld.value}</div>
              <span>{weightUnit}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
