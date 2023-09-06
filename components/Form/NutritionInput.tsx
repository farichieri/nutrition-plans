import { FC, forwardRef, useEffect, useMemo, useState } from "react";
import { getNutrientMeasurementUnit } from "@/utils/helpers";

const fixedInputClass =
  " rounded-md truncate h-[2rem] sm:h-[2rem] dark:border-gray-500 font-semibold appearance-none dark:bg-slate-500/20 dark:text-white bg-slate-500/20 relative block w-20 px-2 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 caret-green-500 focus:outline-none focus:ring--500 focus:border-green-500 focus:z-10 sm:text-sm ";

const readOnlyClass =
  " outline-none bg-transparent cursor-default select-none appearance-none text-right ";

interface Props {
  customClass?: string;
  id: string;
  error?: string;
  labelText: string;
  name: string;
  pattern?: string | undefined;
  placeholder?: string;
  step?: string;
  min?: any;
  title: string;
  type: string;
  value: any;
  unit?: string | null;
  readOnly?: boolean;
  handleChange: Function;
  changed?: boolean;
}

const NutritionInput: FC<Props> = forwardRef<HTMLInputElement, Props>(
  (
    {
      customClass = "",
      id,
      error,
      name,
      labelText,
      pattern,
      placeholder,
      step,
      title,
      min,
      type,
      unit,
      readOnly,
      value,
      handleChange,
      changed,
      ...props
    },
    ref
  ) => {
    const [percentage, setPercentage] = useState<number>(0);
    const nutritionData = useMemo(() => getNutrientMeasurementUnit(id), [id]);
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
        handleChange(event);
      }
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

    useEffect(() => {
      if (requirement) {
        const newPercentage = (Number(value) / requirement) * 100;
        setPercentage(newPercentage);
      }
    }, [changed, requirement, value]);

    return (
      <>
        <div className="flex flex-wrap items-center gap-0 sm:flex-nowrap ">
          {labelText && (
            <label
              htmlFor={id}
              className={
                `w-full min-w-fit basis-1/2 pr-1 text-base capitalize` +
                customClass
              }
            >
              {labelText.replaceAll("_", " ")}
            </label>
          )}
          <div className="flex w-full items-center justify-between md:basis-1/2 ">
            <div className="flex w-full basis-1/2 items-center justify-start gap-2">
              <input
                className={
                  !readOnly
                    ? fixedInputClass + customClass
                    : readOnlyClass + customClass
                }
                id={id}
                ref={ref}
                name={name}
                onChange={handleChangeUnit}
                pattern={pattern}
                placeholder={placeholder}
                step={step}
                title={title}
                min={min}
                type={type}
                disabled={readOnly}
                onWheel={(event) => event.currentTarget.blur()}
                value={String(value)}
                {...props}
              />
              {measurementUnit ||
                (unit && (
                  <label htmlFor={id} className="">
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
                    name={name}
                    onChange={handleChangeRequirement}
                    pattern={pattern}
                    placeholder={placeholder}
                    step={step}
                    title={title}
                    type={type}
                    onWheel={(event) => event.currentTarget.blur()}
                    value={percentage > 0 ? Math.round(percentage) : ""}
                  />
                  <label htmlFor={id} className="">
                    %
                  </label>
                </div>
              </>
            )}
          </div>
        </div>
        {error && (
          <div className="text-red-500">
            <span className="text-red-500">{error}</span>
          </div>
        )}
      </>
    );
  }
);

NutritionInput.displayName = "NutritionInput";
export default NutritionInput;
