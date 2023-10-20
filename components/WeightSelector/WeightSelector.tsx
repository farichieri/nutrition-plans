import { WeightUnitsT } from "@/types";

interface Props {
  onChange: (event: React.MouseEvent<HTMLButtonElement>) => void;
  unitSelected: WeightUnitsT;
}

const WeightSelector: React.FC<Props> = ({ unitSelected, onChange }) => {
  return (
    <div className="gap-2 flex items-center">
      <button
        className={`border h-9 w-14 rounded-md ${
          unitSelected === "kgs" ? "bg-green-500 text-white" : ""
        }`}
        onClick={onChange}
        value={"kgs"}
      >
        {"kgs"}
      </button>
      <button
        className={`border h-9 w-14 rounded-md ${
          unitSelected === "lbs" ? "bg-green-500 text-white" : ""
        }`}
        onClick={onChange}
        value={"lbs"}
      >
        {"lbs"}
      </button>
    </div>
  );
};

export default WeightSelector;
