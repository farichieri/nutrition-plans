import { ChangeEventHandler, FC, useMemo, useState } from "react";
import { getNutrientMeasurementUnit } from "@/utils/helpers";

const fixedInputClass =
  " rounded-md truncate h-[2rem] sm:h-[2.5rem] my-1 dark:border-gray-500 font-semibold appearance-none dark:bg-slate-500/20 dark:text-white bg-slate-500/20 relative block w-20 px-2 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 caret-green-500 focus:outline-none focus:ring--500 focus:border-green-500 focus:z-10 sm:text-sm ";

const readOnlyClass =
  " outline-none bg-transparent cursor-default select-none appearance-none w-20 text-right ";

interface Props {
  customClass?: string;
  handleChange: ChangeEventHandler;
  id: string;
  isRequired: boolean;
  labelFor: string;
  labelText: string;
  max?: string;
  min?: string;
  name: string;
  pattern?: string | undefined;
  placeholder?: string;
  step?: string;
  title: string;
  type: string;
  value: number | null;
  unit?: string | null;
  readOnly?: boolean;
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
  readOnly,
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
    <div className="flex flex-wrap items-center justify-between gap-1 md:flex-nowrap">
      {labelText && (
        <label
          htmlFor={labelFor}
          className={
            `w-full min-w-fit basis-1/2 text-base capitalize` + customClass
          }
        >
          {labelText.replaceAll("_", " ")}
        </label>
      )}
      <div className="flex w-full items-center justify-between md:basis-1/2 ">
        <div className="flex w-full basis-1/2 items-center justify-start gap-2">
          <input
            className={
              !readOnly ? fixedInputClass : readOnlyClass + customClass
            }
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
            disabled={readOnly}
            onWheel={(event) => event.currentTarget.blur()}
          />
          {measurementUnit ||
            (unit && (
              <label htmlFor={labelFor} className="">
                {measurementUnit || unit}
              </label>
            ))}
        </div>
        {requirement && (
          <>
            <span className="flex w-full basis-1/3 items-center justify-center opacity-50">
              or
            </span>
            <div className="flex w-full basis-1/3 items-center justify-end gap-2">
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
                onWheel={(event) => event.currentTarget.blur()}
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
