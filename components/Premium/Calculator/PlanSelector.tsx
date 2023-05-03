import { FC, useEffect, useState } from "react";
import { MEAL_PLANS } from "@/utils/content";
import { selectAuthSlice, setUpdateUser } from "@/store/slices/authSlice";
import { updateUser } from "@/firebase/helpers/Auth";
import { useDispatch, useSelector } from "react-redux";
import { UserAccount } from "@/types/types";
import { useRouter } from "next/router";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

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
          <span className="w-full p-5 text-left text-3xl font-semibold">
            Select my Nutrition Plan
          </span>
          <div className="flex w-full flex-col flex-wrap gap-2">
            {MEAL_PLANS.map((opt) => (
              <button
                onClick={handleSelect}
                className={`flex basis-1 flex-col gap-1 rounded-md border bg-gray-300 p-0 font-medium text-black ${
                  planSelected === opt.id
                    ? "border-green-500 bg-green-500/50 text-white"
                    : "border-slate-400 bg-slate-300/50"
                }`}
                key={opt.id}
                id={opt.id}
              >
                <div className="pointer-events-none flex w-full items-center px-10 py-1 text-left">
                  {planSelected === opt.id && (
                    <CheckBadgeIcon className="h-4 w-4" />
                  )}
                  <span className="m-auto text-xl font-bold">{opt.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center border-t p-5">
          <div className="ml-auto flex">
            <SubmitButton
              className={"m-auto w-fit"}
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
