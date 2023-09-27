import { FC, useState } from "react";
import { Food } from "@/features/foods/types";
import { getUSDAFoodCategory } from "@/features/foods/utils/USDA/getUSDAFoodCategory";
import { getUSDANutrients } from "@/features/foods/utils/USDA/getUSDANutrients";
import { getUSDAPortions } from "@/features/foods/utils/USDA/getUSDAPortions";
import { toast } from "react-hot-toast";
import { updateNewFoodStateMultipleFields } from "@/features/foods/slice";
import { useDispatch } from "react-redux";
import { useGetUSDAFoodMutation } from "@/features/foods/services";
import InfoMessage from "@/components/Layout/InfoMessage";
import Modal from "@/components/Modal/Modal";
import Spinner from "@/components/Loader/Spinner";

interface Props {
  currentState: Food;
}

const LoadUSDA: FC<Props> = ({ currentState }) => {
  const dispatch = useDispatch();
  const [fdcId, setFdcId] = useState("");
  const [open, setOpen] = useState(false);

  const [getUSDAFood, { isLoading }] = useGetUSDAFoodMutation();

  const handleLoad = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!fdcId) {
      toast.error("Please enter an FDC ID");
      return;
    }
    try {
      const res: any = await getUSDAFood({ fdcId });
      if ("error" in res) throw new Error(res.error);
      const data = res.data;
      console.log({ data });

      const {
        foodNutrients,
        foodPortions,
        description,
        foodCategory,
        fdcId: id,
      } = data.data;
      const grams = 100;
      const servingName = "Serving";

      const nutrientsFiltered = getUSDANutrients({ foodNutrients });
      const foodCategoryFiltered = getUSDAFoodCategory({ foodCategory });
      const scales = [
        {
          id: "creationScale",
          isCreationScale: true,
          isDefault: true,
          scaleAmount: 1,
          scaleGrams: grams,
          scaleName: servingName,
        },
        ...getUSDAPortions({ foodPortions }),
      ];

      console.log({ nutrientsFiltered, foodCategoryFiltered, scales });

      dispatch(
        updateNewFoodStateMultipleFields({
          fields: {
            name: description,
            category: foodCategoryFiltered,
            fdcId: id,
            servingGrams: grams,
            servingName,
            scales,
            nutrients: nutrientsFiltered,
          },
        })
      );

      toast.success(`Loaded USDA food: ${description}`, { duration: 5000 });
      setFdcId("");
    } catch (error) {
      toast.error("Error loading USDA food");
      console.error(error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <div>
      <button
        className="ml-auto flex rounded-md border-green-500 bg-green-500/50 px-3 py-1 font-semibold text-white"
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
      >
        Load USDA Data
      </button>
      {open && (
        <Modal onClose={() => setOpen(!open)}>
          <div className="flex max-w-xs flex-col  p-8">
            <InfoMessage
              customClass="flex items-center text-xs"
              message="Enter the FDC ID from https://fdc.nal.usda.gov/ of the food you want to load."
            />
            <div className="mt-4 flex w-full items-center justify-start gap-2">
              <label className="mb-3 min-w-fit">FDC ID</label>
              <input
                className="mb-3 w-full rounded-md border border-gray-400 px-3 py-1"
                type="text"
                value={fdcId}
                onChange={(e) => setFdcId(e.target.value)}
              />
            </div>
            <button
              className="flex items-center justify-center gap-2 rounded-md border border-green-500 bg-green-400 px-3 py-1 hover:bg-green-500 active:bg-green-600"
              onClick={handleLoad}
            >
              Load Data
              {isLoading && <Spinner customClass="h-5 w-5" />}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LoadUSDA;
