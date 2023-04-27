import { ChangeEventHandler, FC, useMemo, useState } from "react";
import { getNutrientMeasurementUnit } from "@/utils/helpers";

const fixedInputClass =
  "rounded-md font-semibold appearance-none dark:bg-slate-500/50 dark:text-white bg-slate-500/20 relative block w-20 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 caret-green-500  focus:outline-none  focus:ring--500 focus:border-green-500 focus:z-10 sm:text-sm";

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
  value: number;
  unit: string | null;
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
  unit,
}) => {
  const [percentage, setPercentage] = useState<number>(0);
  const nutritionData = useMemo(
    () => getNutrientMeasurementUnit(id),
    [percentage, value]
  );
  const measurementUnit = nutritionData?.unit;
  const requirement = nutritionData?.requirement;

  const handleChangeRequirement = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (requirement) {
      const newPercentage = event.target.value;
      setPercentage(Number(newPercentage));
      const value = (Number(newPercentage) * requirement) / 100;
      event.target.value = String(value);
    }
    handleChange(event);
  };

  const handleChangeUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    if (requirement) {
      const newPercentage = (Number(value) / requirement) * 100;
      setPercentage(newPercentage);
    }
    handleChange(event);
  };

  return (
    <div className="my-2 flex flex-wrap items-center justify-between gap-0.5 sm:flex-nowrap">
      <label
        htmlFor={labelFor}
        className="w-full min-w-fit text-base capitalize"
      >
        {labelText.replaceAll("_", " ")}
      </label>
      <div className="flex w-full  items-center justify-start gap-2 ">
        <div className="flex w-full basis-1/3 items-center justify-start gap-2">
          <input
            className={fixedInputClass + customClass}
            id={id}
            max={max}
            min={min}
            name={name}
            onChange={handleChangeUnit}
            pattern={pattern}
            placeholder={placeholder}
            required={isRequired}
            step={step}
            title={title}
            type={type}
            value={value || ""}
          />
          <label htmlFor={labelFor} className="basis-1/2">
            {measurementUnit || unit}
          </label>
        </div>
        {requirement && (
          <>
            <span className="mx-5 opacity-50">or</span>
            <div className="flex w-full items-center justify-end gap-2">
              <input
                className={fixedInputClass + customClass}
                id={id}
                max={max}
                min={min}
                name={name}
                onChange={handleChangeRequirement}
                pattern={pattern}
                placeholder={placeholder}
                required={isRequired}
                step={step}
                title={title}
                type={type}
                value={percentage > 0 ? Math.round(percentage) : ""}
              />
              <label htmlFor={labelFor} className="">
                %
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NutritionInput;
