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
    <section className="flex w-full max-w-xl flex-col items-center justify-center gap-5 rounded-md border">
      <form action="" className="flex w-full flex-col gap-5">
        <div className="flex flex-col gap-3 p-5">
          <span className="w-full p-5 text-left text-3xl font-semibold">
            My food preferences
          </span>
          <div className="flex w-full flex-col flex-wrap gap-2">
            {FOOD_PREFERENCES.map((opt) => (
              <button
                onClick={handleSelect}
                className={`basis-1 rounded-xl bg-gray-300 p-1.5 font-medium text-black shadow-[0_1px_3px] shadow-slate-500/50 hover:shadow-[0_1px_5px] ${
                  selecteds.includes(opt.value)
                    ? "bg-green-500 text-white"
                    : "bg-slate-300"
                }`}
                key={opt.value}
                value={opt.value}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center border-t p-5">
          <SubmitButton
            className={"m-auto w-fit"}
            onClick={onSubmit}
            loadMessage={"Loading..."}
            content={`${isCreatingRoute ? "Continue" : "Save"}`}
            isLoading={isLoading}
            isDisabled={isDisabled}
          />
        </div>
      </form>
    </section>
  );
};

export default FoodPreferences;
