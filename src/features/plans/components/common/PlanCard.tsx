import Spinner from "@/components/Loader/Spinner";
import { selectAuthSlice } from "@/features/authentication";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useReplaceDietWithLibraryDayMutation } from "../../services";
import { Diet } from "../../types";

interface Props {
  diet: Diet;
  replaceDate: string | null;
  replaceDates: string[] | null;
  handleClose: () => void;
  setDoneGeneratingPlan: (value: boolean) => void;
}

const PlanCard: FC<Props> = ({
  diet,
  replaceDate,
  replaceDates,
  handleClose,
  setDoneGeneratingPlan,
}) => {
  const router = useRouter();
  const { user } = useSelector(selectAuthSlice);
  const isLibrary = router.pathname.includes("library");

  if (!user) return <></>;

  const [replaceDietWithLibraryDay, { isLoading }] =
    useReplaceDietWithLibraryDayMutation();

  const calories = diet?.nutrients?.calories;

  const handleSelect = async () => {
    try {
      if (replaceDate && !replaceDates) {
        const newDiet = {
          ...diet,
          id: replaceDate,
          date: replaceDate,
        };
        const res = await replaceDietWithLibraryDay({
          diet: newDiet,
        });
        if ("error" in res) {
          throw Error;
        }
      } else if (replaceDates && !replaceDate) {
        const promises = await Promise.all(
          replaceDates.map((date) => {
            const newDiet = {
              ...diet,
              id: date,
              date: date,
            };
            return replaceDietWithLibraryDay({
              diet: newDiet,
            });
          })
        );
        promises.forEach((res) => {
          if ("error" in res) {
            throw Error;
          }
        });
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setDoneGeneratingPlan(true);
      handleClose();
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
              {isLoading ? (
                <div className="flex items-center gap-1">
                  <span className="">Replacing...</span>
                  <Spinner customClass="h-4 w-4" />
                </div>
              ) : (
                "Replace"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
