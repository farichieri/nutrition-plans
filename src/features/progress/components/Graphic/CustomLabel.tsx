import { FC } from "react";

interface Props {
  props: any;
  text: string;
  textColor: "light" | "dark";
}

const CustomLabel: FC<Props> = ({ props, text, textColor }) => {
  return (
    <g>
      <text
        x={"50%"}
        y={props.viewBox.y}
        fill={textColor === "dark" ? "#fff" : "#000"}
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
