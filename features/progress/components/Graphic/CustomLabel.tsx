import { getWeightText } from "@/utils/calculations";
import { FC } from "react";

interface Props {
  props: any;
  text: string;
}

const CustomLabel: FC<Props> = ({ props, text }) => {
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
        {text}
      </text>
    </g>
  );
};

export default CustomLabel;
