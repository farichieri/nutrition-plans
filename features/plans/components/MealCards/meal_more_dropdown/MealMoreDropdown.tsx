import { AiFillFileAdd } from "react-icons/ai";
import { clearMeal } from "@/features/plans/utils";
import { Diet } from "@/features/plans/types";
import { FC, useState } from "react";
import { MdContentCopy, MdDelete, MdOutlineMoreHoriz } from "react-icons/md";
import { ReplaceMealSelector } from "@/features/library";
import { selectAuthSlice } from "@/features/authentication";
import { setDiet } from "@/features/plans/slice";
import { toast } from "react-hot-toast";
import { updateDiet } from "@/features/plans/services";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "@/components/DropDown/DropDown";
import Modal from "@/components/Modal/Modal";
import SaveMeal from "../../../../library/components/library_meals/SaveMeal";
import Spinner from "@/components/Loader/Spinner";

const optionStyle =
  "flex w-full cursor-pointer items-center gap-2 border-none bg-transparent px-4 py-2 opacity-60 hover:bg-slate-500/40 hover:opacity-100";

interface Props {
  diet: Diet;
  mealID: string;
}

const MealMoreDropdown: FC<Props> = ({ diet, mealID }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthSlice);
  const [closeDrop, setCloseDrop] = useState(false);
  const [isLoading, setIsLoading] = useState({
    favorite: false,
    replace: false,
    clear: false,
  });
  const [isOpen, setIsOpen] = useState({
    save: false,
    replace: false,
  });

  if (!user || !mealID || !diet) return <></>;

  const meal = diet.meals[mealID];

  const handleClear = async () => {
    try {
      setIsLoading({ ...isLoading, clear: true });
      const dietUpdated = clearMeal({ diet, mealID });
      const res = await updateDiet({ diet: dietUpdated });
      if (res.result === "error") throw Error;
      dispatch(setDiet(dietUpdated));
    } catch (error) {
      console.log({ error });
      toast.error("Error clearing Meal");
    } finally {
      setIsLoading({ ...isLoading, clear: false });
      handleClose();
    }
  };

  const handleSave = async () => {
    setIsOpen({ ...isOpen, save: true });
    setCloseDrop(true);
  };

  const handleReplace = async () => {
    setIsOpen({ ...isOpen, replace: true });
    setCloseDrop(true);
  };

  const handleClose = () => {
    setCloseDrop(true);
    setIsOpen({ ...isOpen, save: false, replace: false });
  };

  const OPTIONS = [
    {
      text: "Save Meal",
      icon: (
        <AiFillFileAdd
          className={`pointer-events-none h-5 w-5  text-green-500`}
        />
      ),
      onClick: handleSave,
      isLoading: isLoading.favorite,
    },
    {
      text: "Load Saved Meal",
      icon: <MdContentCopy className="h-5 w-5 text-blue-500" />,
      onClick: handleReplace,
      isLoading: isLoading.replace,
    },
    {
      text: "Clear Meal",
      icon: <MdDelete className="h-5 w-5 text-red-500" />,
      onClick: handleClear,
      isLoading: isLoading.clear,
    },
  ];

  return (
    <>
      {isOpen.save && (
        <Modal onClose={handleClose}>
          <SaveMeal meal={meal} handleClose={handleClose} />
        </Modal>
      )}
      {isOpen.replace && (
        <Modal onClose={handleClose}>
          <ReplaceMealSelector
            replaceMealID={mealID}
            diet={diet}
            handleClose={handleClose}
          />
        </Modal>
      )}
      <DropDown
        closeDrop={closeDrop}
        setCloseDrop={setCloseDrop}
        btnText={
          <MdOutlineMoreHoriz className="h-6 w-6 cursor-pointer text-gray-500" />
        }
      >
        <div className=" py-2">
          {OPTIONS.map((option, index) => (
            <div key={index} className={optionStyle} onClick={option.onClick}>
              <>
                {option.isLoading ? (
                  <Spinner customClass="h-5 w-5" />
                ) : (
                  <>{option.icon}</>
                )}
              </>
              <span>{option.text}</span>
            </div>
          ))}
        </div>
      </DropDown>
    </>
  );
};

export default MealMoreDropdown;
