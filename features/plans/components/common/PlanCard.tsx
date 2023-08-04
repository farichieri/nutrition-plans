import { Diet } from "../../types";
import { FC } from "react";
import { selectAuthSlice } from "@/features/authentication";
import { setDiet } from "../../slice";
import { updateDiet } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { resetDiet } from "../../utils";

interface Props {
  diet: Diet;
  replaceDate?: string;
}

const PlanCard: FC<Props> = ({ diet, replaceDate }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const router = useRouter();
  const isLibrary = router.pathname.includes("library");

  if (!user) return <></>;

  const calories = diet?.nutrients?.calories;

  const handleSelect = async () => {
    if (replaceDate) {
      try {
        const dietResetted = resetDiet({ diet });
        if (dietResetted.result === "error") {

          throw new Error("Error resetting diet");
        }
        const newDiet = {
          ...dietResetted.data,
          id: replaceDate,
          date: replaceDate,
        };
        const res = await updateDiet({
          diet: newDiet,
        });
        if (res.result === "success") {
          dispatch(setDiet(newDiet));
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
  };

  return (
    <div
      className={`flex w-full items-center justify-start gap-2 rounded-lg border bg-slate-200/50 dark:bg-gray-500/10`}
    >
      <div className="flex h-full min-w-fit flex-col items-center justify-center border-r px-2 py-4">
        {diet && (
          <span className="text-xl font-semibold capitalize text-green-500">
            {diet?.planID?.replaceAll("_", " ")}
          </span>
        )}
        {calories && (
          <span className="min-w-fit text-xs opacity-70">
            {calories} calories
          </span>
        )}
      </div>

      <div className="flex w-full items-center justify-between gap-2 px-2 py-4">
        <div className="flex w-full flex-col">
          <span className="font-semibold">{diet.name}</span>
          <span className="text-sm opacity-70">{diet.description}</span>
        </div>
        <div className="">
          {isLibrary ? (
            <Link
              href={`/app/library/days/${diet.id}`}
              className="activ:bg-slate-600/50 rounded-3xl border bg-slate-500/20 px-3 py-1.5"
            >
              Open
            </Link>
          ) : (
            <button
              onClick={handleSelect}
              className="activ:bg-slate-600/50 rounded-3xl border bg-slate-500/20 px-3 py-1.5"
            >
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
