import {
  UserAccount,
  selectAuthSlice,
  setUpdateUser,
  updateUser,
} from "@/features/authentication";
import { FC, useEffect, useState } from "react";
import { MdRestaurant, MdVerified } from "react-icons/md";
import { MEAL_PLANS } from "@/data/content";
import { PlansEnum } from "@/types";
import { schema } from "./schema";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "@/components/Errors/FormError";
import Image from "next/image";
import InfoMessage from "@/components/Layout/InfoMessage";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { Box, BoxBottomBar, BoxMainContent } from "@/components/Layout";
import { blurDataURL } from "@/components/Layout/BlurDataImage";

interface FormValues {
  planSelected: PlansEnum | null;
}

interface Props {
  handleContinue: Function;
}

const PlanSelector: FC<Props> = ({ handleContinue }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(selectAuthSlice);

  if (!user) return <></>;

  const plan_selected = user?.plan_selected;
  const isCreatingRoute = router.asPath === "/app/create";

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
      planSelected: plan_selected || null,
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
    if (!user || isSubmitting) return;
    const userUpdated: UserAccount = {
      ...user,
      plan_selected: data.planSelected,
    };
    const res = await updateUser(userUpdated);
    if (res.result === "success") {
      dispatch(setUpdateUser(userUpdated));
      handleContinue();
      if (!isCreatingRoute) {
        toast.success("Your Preferred Plan has been updated successfully.");
      }
    } else {
      toast.error("Error updating your Preferred Plan");
    }
  };

  useEffect(() => {
    register("planSelected");
  }, []);

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (values.planSelected === user.plan_selected) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [setIsDisabled, values, watch]);

  return (
    <Box customClass="max-w-4xl">
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
            <div className="grid select-none grid-cols-fluid_xs items-start justify-start gap-2 sm:grid-cols-fluid_sm ">
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
                        : "hidden text-transparent"
                    }`}
                  />
                  <span className="mb-1 flex w-full items-center justify-center text-center text-base font-bold sm:text-xl">
                    {opt.name}
                  </span>
                  <span className="pointer-events-none relative h-32 w-32 sm:h-40 sm:w-40 ">
                    <Image
                      src={`/images/plans/${opt.id}.jpg`}
                      alt={opt.name}
                      fill
                      blurDataURL={blurDataURL(160, 160)}
                      className="rounded-3xl object-cover shadow-[0_1px_5px_gray] dark:shadow-[0px_1px_5px_#4040408c]"
                    />
                  </span>
                </button>
              ))}
            </div>
            <InfoMessage
              message="Select your preferred one as default, but know that you will have access to all the plans in
  your day to day!"
            />
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
