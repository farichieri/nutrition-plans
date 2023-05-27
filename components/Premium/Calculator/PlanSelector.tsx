import { FC, useEffect, useState } from "react";
import { MEAL_PLANS } from "@/utils/content";
import { selectAuthSlice, setUpdateUser } from "@/store/slices/authSlice";
import { updateUser } from "@/firebase/helpers/Auth";
import { useDispatch, useSelector } from "react-redux";
import { UserAccount } from "@/types/types";
import { useRouter } from "next/router";
import Image from "next/image";
import SubmitButton from "@/components/Buttons/SubmitButton";

interface Props {
  handleSubmit: Function;
}

const PlanSelector: FC<Props> = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(selectAuthSlice);
  const plan_selected = user?.plan_selected;
  const [planSelected, setPlanSelected] = useState<string | null>(
    plan_selected || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const isCreatingRoute = router.asPath === "/app/create";

  const handleSelect = (event: React.MouseEvent) => {
    event.preventDefault();
    const id = (event.target as HTMLButtonElement).id;
    setPlanSelected(id);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;
    setIsLoading(true);
    const userUpdated: UserAccount = {
      ...user,
      plan_selected: planSelected,
    };
    const res = await updateUser(userUpdated);
    if (!res?.error) {
      dispatch(setUpdateUser(userUpdated));
      handleSubmit();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isCreatingRoute && !planSelected) {
      setIsDisabled(true);
    } else if (
      JSON.stringify(planSelected) !== JSON.stringify(plan_selected) ||
      isCreatingRoute
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [planSelected, plan_selected]);

  return (
    <section className="flex w-full max-w-5xl select-none flex-col items-center justify-center gap-3 rounded-md border text-xs s:text-sm sm:text-base">
      <form action="" className="flex w-full flex-col gap-5">
        <div className="flex flex-col gap-3 p-5">
          <div className="flex items-center">
            <span className="material-icons text-green-500">restaurant</span>
            <span className="w-full p-5 text-left text-3xl font-semibold">
              Select my Nutrition Plan
            </span>
          </div>
          <div className="flex w-full flex-wrap justify-center gap-2">
            {MEAL_PLANS.map((opt) => (
              <button
                onClick={handleSelect}
                className={`relative flex h-[auto] w-[auto] max-w-xs flex-col items-center justify-center overflow-hidden rounded-lg duration-300 hover:scale-105 ${
                  planSelected === opt.id
                    ? "border-green-500/0 bg-green-500/0 text-green-500"
                    : "border-slate-400 bg-slate-300/0"
                }`}
                key={opt.id}
                id={opt.id}
              >
                <span
                  className={`material-icons ${
                    planSelected === opt.id
                      ? "text-green-500"
                      : "text-transparent"
                  }`}
                >
                  verified
                </span>
                <span className="flex w-full items-center justify-center text-center text-xl font-bold">
                  {opt.name}
                </span>
                <Image
                  src={`/images/plans/${opt.id}.jpg`}
                  alt={opt.name}
                  width={150}
                  height={150}
                  className="pointer-events-none m-2 rounded-3xl shadow-[0_1px_5px_gray] dark:shadow-[0px_1px_5px_#4040408c]"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center border-t p-5">
          <div className="ml-auto flex">
            <SubmitButton
              className={"m-auto h-9 w-24"}
              onClick={onSubmit}
              loadMessage={"Loading..."}
              content={`${isCreatingRoute ? "Continue" : "Save"}`}
              isLoading={isLoading}
              isDisabled={isDisabled}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default PlanSelector;
