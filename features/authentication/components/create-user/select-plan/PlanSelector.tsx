import {
  UserAccount,
  selectAuthSlice,
  setUpdateUser,
  updateUser,
} from "@/features/authentication";
import { FC, useEffect, useState } from "react";
import { MEAL_PLANS } from "@/data/content";
import { PlansEnum } from "@/types";
import { schema } from "./schema";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "@/components/Errors/FormError";
import Image from "next/image";
import InfoMessage from "@/components/Layout/InfoMessage";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { toast } from "react-hot-toast";
import { MdRestaurant, MdVerified } from "react-icons/md";

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
    <section className="flex w-full max-w-5xl select-none flex-col items-center justify-center gap-3 rounded-md border text-xs s:text-sm sm:text-base">
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex w-full flex-col gap-5"
      >
        <div className="flex flex-col gap-10 p-5">
          <div className="flex items-center gap-2">
            <MdRestaurant className="h-6 w-6 text-green-500" />
            <span className="w-full text-left text-xl font-semibold sm:text-3xl">
              Select my Nutrition Plan
            </span>
          </div>
          <div className="grid select-none grid-cols-fluid items-start justify-start ">
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
                      : "text-transparent"
                  }`}
                />
                <span className="flex w-full items-center justify-center text-center text-xl font-bold">
                  {opt.name}
                </span>
                <Image
                  src={`/images/plans/${opt.id}.jpg`}
                  alt={opt.name}
                  width={200}
                  height={200}
                  className="pointer-events-none m-2 rounded-3xl shadow-[0_1px_5px_gray] dark:shadow-[0px_1px_5px_#4040408c]"
                />
              </button>
            ))}
          </div>

          <InfoMessage
            message="Select your preferred one as default, but know that you will have access to all the plans in
  your day to day!"
          />
        </div>
        <div className="flex items-center justify-center border-t p-5">
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
        </div>
      </form>
    </section>
  );
};

export default PlanSelector;
