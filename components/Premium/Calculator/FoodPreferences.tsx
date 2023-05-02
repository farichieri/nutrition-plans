import { FC, useEffect, useState } from "react";
import { FOOD_PREFERENCES } from "@/utils/formContents";
import { selectAuthSlice, setUpdateUser } from "@/store/slices/authSlice";
import { updateUser } from "@/firebase/helpers/Auth";
import { useDispatch, useSelector } from "react-redux";
import { UserAccount } from "@/types/types";
import { useRouter } from "next/router";
import SubmitButton from "@/components/Buttons/SubmitButton";

interface Props {
  handleSubmit: Function;
}

const FoodPreferences: FC<Props> = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(selectAuthSlice);
  const food_preferences = user?.food_data.food_preferences;
  const [selecteds, setSelecteds] = useState<string[]>(food_preferences || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const isCreatingRoute = router.asPath === "/app/create";

  const handleSelect = (event: React.MouseEvent) => {
    event.preventDefault();
    const value = (event.target as HTMLButtonElement).value;
    const labelExists = selecteds.indexOf(value) !== -1;
    const newLabelsSelected = [...selecteds];
    labelExists
      ? newLabelsSelected.splice(selecteds.indexOf(value), 1)
      : newLabelsSelected.push(value);
    setSelecteds(newLabelsSelected);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;
    setIsLoading(true);
    const userUpdated: UserAccount = {
      ...user,
      food_data: {
        food_preferences: selecteds,
      },
    };
    const res = await updateUser(userUpdated);
    if (!res?.error) {
      dispatch(setUpdateUser(userUpdated));
      handleSubmit();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isCreatingRoute && selecteds.length === 0) {
      setIsDisabled(true);
    } else if (
      JSON.stringify(selecteds) !== JSON.stringify(food_preferences) ||
      isCreatingRoute
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [selecteds, food_preferences]);

  return (
    <section className="flex w-full max-w-5xl select-none flex-col items-center justify-center gap-3 rounded-md border text-xs s:text-sm sm:text-base">
      <form action="" className="flex w-full flex-col gap-5">
        <div className="flex flex-col gap-3 p-5">
          <span className="w-full p-5 text-left text-3xl font-semibold">
            My food preferences
          </span>
          <div className="flex w-full flex-col flex-wrap gap-2">
            {FOOD_PREFERENCES.map((opt) => (
              <button
                onClick={handleSelect}
                className={`flex basis-1 flex-col gap-1 rounded-md border bg-gray-300 p-0 font-medium text-black shadow-[0_1px_3px] shadow-slate-500/50 hover:shadow-[0_1px_5px] ${
                  selecteds.includes(opt.value)
                    ? "border-green-500 bg-green-500/70 text-white"
                    : "border-slate-400 bg-slate-300/50"
                }`}
                key={opt.value}
                value={opt.value}
              >
                <div className="pointer-events-none flex w-full flex-col items-start px-2 py-1 text-left">
                  <span className="m-auto text-xl font-bold">{opt.name}</span>
                  {opt.includes && (
                    <div>
                      <span className="font-semibold">Includes: </span>
                      <span>{opt.includes}</span>
                    </div>
                  )}
                  {opt.excludes && (
                    <div>
                      <span className="font-semibold">Excludes: </span>
                      <span>{opt.excludes}</span>
                    </div>
                  )}
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

export default FoodPreferences;
