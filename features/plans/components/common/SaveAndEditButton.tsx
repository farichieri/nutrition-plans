import {
  useRefreshDietByDateMutation,
  useUpdateDietMutation,
} from "@/features/plans/services";
import { Diet } from "@/features/plans";
import { FC, useCallback, useEffect } from "react";
import { LuFileEdit, LuSave } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "react-hot-toast";
import { User } from "@/features/authentication";
import { useRouter } from "next/router";
import Spinner from "@/components/Loader/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { selectPlansSlice, setIsEditingDiet } from "../../slice";

interface Props {
  diet: Diet;
  date: string;
  user: User;
}

const SaveAndEditButton: FC<Props> = ({ diet, date, user }) => {
  const [refreshDietByDate, { isLoading: isCanceling }] =
    useRefreshDietByDateMutation();
  const [updateDiet, { isLoading: isSaving }] = useUpdateDietMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { isEditingDiet } = useSelector(selectPlansSlice);

  const saveDietOpened = useCallback(async () => {
    if (!diet) throw Error;
    const res = await updateDiet({ diet });
    if ("error" in res) {
      toast.error("Error saving diet. Please try again.");
    }
  }, [diet]);

  const cancelChanges = async () => {
    const res = await refreshDietByDate({ date, userID: user.id });
    if ("error" in res) {
      throw new Error("Error Canceling. Please try again.");
    }
    dispatch(setIsEditingDiet(false));
  };

  const toggleButton = async () => {
    if (!isEditingDiet) {
      dispatch(setIsEditingDiet(true));
    } else {
      await saveDietOpened();
      dispatch(setIsEditingDiet(false));
    }
  };

  // Save diet when user leaves the page
  useEffect(() => {
    const handleRouteChange = async () => {
      console.log({ diet });
      if (isEditingDiet) {
        await saveDietOpened();
      }
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [diet, isEditingDiet]);

  useEffect(() => {
    dispatch(setIsEditingDiet(false));
  }, [date]);

  return (
    <>
      {isEditingDiet && (
        <div className="fixed bottom-[4px] left-1/2 z-[150] flex -translate-x-1/2 items-center justify-center gap-1 rounded-3xl bg-primary-color bg-yellow-200 p-1 shadow-md ">
          <button
            className="flex h-9  items-center justify-center gap-1 rounded-3xl border border-gray-500 bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-400 active:bg-gray-300"
            onClick={cancelChanges}
          >
            <span>Cancel</span>
            {isCanceling ? (
              <Spinner customClass="h-5 w-5" />
            ) : (
              <MdOutlineCancel className="h-5 w-5" />
            )}
          </button>
          <button
            className="flex h-9 items-center justify-center gap-1 rounded-3xl border border-green-600 bg-green-500 px-3 py-1 text-white hover:bg-green-600 active:bg-green-500"
            onClick={toggleButton}
          >
            <span>Save</span>
            {isSaving ? (
              <Spinner customClass="h-5 w-5 stroke-white" />
            ) : (
              <LuSave className="h-5 w-5" />
            )}
          </button>
        </div>
      )}
      <button
        id="tour-dayPlan-4"
        className={`flex h-9 items-center justify-center gap-1 rounded-3xl border border-green-600 bg-green-500 px-3 py-1 text-white hover:bg-green-500/50 active:bg-green-500 ${
          isEditingDiet && "pointer-events-none opacity-50"
        }`}
        onClick={toggleButton}
      >
        {isEditingDiet ? (
          <span className="">Editing...✏️</span>
        ) : (
          <>
            <span>Edit Day</span>
            <LuFileEdit className="h-5 w-5" />
          </>
        )}
      </button>
    </>
  );
};

export default SaveAndEditButton;
