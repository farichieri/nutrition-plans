"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { MdRestaurant, MdVerified } from "react-icons/md";
import { useSelector } from "react-redux";

import SubmitButton from "@/components/Buttons/SubmitButton";
import FormError from "@/components/Errors/FormError";
import { Box, BoxBottomBar, BoxMainContent } from "@/components/Layout";
import InfoMessage from "@/components/Layout/InfoMessage";
import BlurImage from "@/components/blur-image";
import { MEAL_PLANS } from "@/data/content";
import {
  getNutritionTargets,
  selectAuthSlice,
  useUpdateUserMutation,
} from "@/features/authentication";
import { calculateKCALSRecommended } from "@/features/authentication/utils/calculateBodyData";
import { PlansEnum } from "@/types";

import { schema } from "./schema";

interface FormValues {
  planSelected: PlansEnum | null;
}

interface Props {
  handleContinue: Function;
}

const PlanSelector: FC<Props> = ({ handleContinue }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useSelector(selectAuthSlice);
  const [updateUser] = useUpdateUserMutation();

  if (!user) return <></>;

  const { planSelected, bodyData, goal } = user;
  const isCreatingRoute = pathname === "/app/create";

  const {
    formState,
    getValues,
    handleSubmit,
    trigger,
    register,
    setValue,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      planSelected: planSelected || null,
    },
    resolver: yupResolver(schema),
  });
  const { errors, isSubmitting } = formState;
  const values = getValues();
  watch("planSelected");

  const handleSelect = (event: React.MouseEvent) => {
    event.preventDefault();
    const name = (event.target as HTMLButtonElement).name;
    const id = (event.target as HTMLButtonElement).id;
    if (
      Object.values(PlansEnum).includes(id as PlansEnum) &&
      name === "planSelected"
    ) {
      setValue(name, id as PlansEnum, {
        shouldDirty: true,
        shouldTouch: true,
      });
      trigger(name);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const { BMR, activity } = bodyData;
      if (!user || isSubmitting || !BMR || !goal || !activity)
        throw new Error("Missing data");
      const { planSelected } = data;

      const calories = calculateKCALSRecommended({
        BMR,
        goal,
        activity,
      });

      let newNutritionTargets = getNutritionTargets({
        calories: calories,
        planSelected: planSelected!,
      });

      const fields = {
        planSelected: planSelected,
        nutritionTargets: newNutritionTargets,
      };
      const res = await updateUser({ user, fields });
      if (!("error" in res)) {
        handleContinue();
        if (!isCreatingRoute) {
          toast.success("Your Preferred Plan has been updated successfully.");
        }
      } else {
        throw new Error("Error updating your Preferred Plan");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unexpected Error.");
    }
  };

  useEffect(() => {
    register("planSelected");
  }, []);

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (values.planSelected === user.planSelected && !isCreatingRoute) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [setIsDisabled, values, watch]);

  return (
    <Box id="tour-profile_plan-0" customClass="max-w-4xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex w-full flex-col gap-5"
      >
        <BoxMainContent>
          <div className="flex w-full flex-col gap-5">
            <div className="flex items-center gap-2">
              <MdRestaurant className="h-6 w-6 text-green-500" />
              <span className="w-full text-left text-xl font-semibold sm:text-3xl">
                Select my Nutrition Plan
              </span>
            </div>
            <div
              id="tour-profile_plan-1"
              className="grid select-none grid-cols-fluid_xs items-start justify-start gap-2 sm:grid-cols-fluid_sm "
            >
              {MEAL_PLANS.map((opt) => (
                <button
                  onClick={handleSelect}
                  className={`relative m-auto flex h-[auto] w-[auto] max-w-xs flex-col items-center justify-center overflow-hidden rounded-lg duration-300 hover:scale-105 ${
                    values.planSelected === opt.id
                      ? "border-green-500/0 bg-green-500/0 text-green-500"
                      : "border-slate-400 bg-slate-300/0"
                  }`}
                  key={opt.id}
                  name="planSelected"
                  id={opt.id}
                >
                  <MdVerified
                    className={`h-6 w-6 ${
                      values.planSelected === opt.id
                        ? "text-green-500"
                        : " text-transparent"
                    }`}
                  />
                  <span className="mb-1 flex w-full items-center justify-center text-center text-base font-bold sm:text-xl">
                    {opt.name}
                  </span>
                  <span className="pointer-events-none relative h-32 w-32 overflow-auto rounded-3xl sm:h-40 sm:w-40">
                    <BlurImage
                      src={opt.image}
                      alt={opt.name}
                      width={300}
                      height={300}
                    />
                  </span>
                </button>
              ))}
            </div>
            <InfoMessage message="Select your preferred one as default" />
          </div>
        </BoxMainContent>
        <BoxBottomBar>
          <FormError message={errors.planSelected?.message} />
          <div className="ml-auto flex">
            <SubmitButton
              className={"m-auto h-9 w-24"}
              loadMessage={"Loading..."}
              content={`${isCreatingRoute ? "Continue" : "Save"}`}
              isLoading={isSubmitting}
              isDisabled={isSubmitting || isDisabled}
            />
          </div>
        </BoxBottomBar>
      </form>
    </Box>
  );
};

export default PlanSelector;
