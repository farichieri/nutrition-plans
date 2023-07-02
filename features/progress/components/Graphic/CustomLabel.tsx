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
        fontSize={14}
      >
        {text}
      </text>
    </g>
  );
};

export default CustomLabel;
