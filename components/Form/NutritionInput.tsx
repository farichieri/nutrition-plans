import { getNutrientMeasurementUnit } from "@/utils/constants";
import { ChangeEventHandler, FC, useEffect, useMemo, useState } from "react";

const fixedInputClass =
  "rounded-md appearance-none basis-4/5 sm:basis-2/5 dark:bg-slate-500/90 bg-slate-500/20 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm";

interface Props {
  customClass: string;
  handleChange: ChangeEventHandler;
  id: string;
  isRequired: boolean;
  labelFor: string;
  labelText: string;
  max: string;
  min: string;
  name: string;
  pattern: string | undefined;
  placeholder: string;
  step: string;
  title: string;
  type: string;
  value: string;
}

const NutritionInput: FC<Props> = ({
  customClass,
  handleChange,
  id,
  isRequired = false,
  labelFor,
  labelText,
  max,
  min,
  name,
  pattern,
  placeholder,
  step,
  title,
  type,
  value,
}) => {
  const [percentage, setPercentage] = useState("");

  const measurementUnit = useMemo(
    () => getNutrientMeasurementUnit(id),
    [percentage, value]
  );

  return (
    <div className="my-2 flex flex-wrap items-center justify-between gap-0.5 sm:flex-nowrap">
      <label htmlFor={labelFor} className=" basis-3/6 capitalize">
        {labelText.replaceAll("_", " ")}
      </label>
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex w-full basis-1/2 items-center justify-start gap-2">
          <input
            className={fixedInputClass + customClass}
            id={id}
            max={max}
            min={min}
            name={name}
            onChange={handleChange}
            pattern={pattern}
            placeholder={placeholder}
            required={isRequired}
            step={step}
            title={title}
            type={type}
            value={value || ""}
          />
          <label htmlFor={labelFor} className="">
            {measurementUnit}
          </label>
        </div>
        <span className="mx-5 opacity-50">or</span>
        <div className="flex w-full basis-1/2 items-center justify-end gap-2">
          <input
            className={fixedInputClass + customClass}
            id={id}
            max={max}
            min={min}
            name={name}
            onChange={handleChange}
            pattern={pattern}
            placeholder={placeholder}
            required={isRequired}
            step={step}
            title={title}
            type={type}
            value={value || ""}
          />
          <label htmlFor={labelFor} className="">
            %
          </label>
        </div>
      </div>
    </div>
  );
};

export default NutritionInput;
