import { FC, useState } from "react";
import { useGetUSDAFoodMutation } from "@/features/foods/services";
import InfoMessage from "@/components/Layout/InfoMessage";
import Modal from "@/components/Modal/Modal";

interface Props {}

const LoadUSDA: FC<Props> = () => {
  const [fdcId, setFdcId] = useState("");
  const [open, setOpen] = useState(false);

  const [getUSDAFood] = useGetUSDAFoodMutation();

  const handleLoad = async (e: React.MouseEvent) => {
    e.preventDefault();
    const res: any = await getUSDAFood({ fdcId });
    const data = res.data;
    const { foodNutrients } = data.data;
    console.log({ data });

    const nutrients = foodNutrients.map((item: any) => {
      const { nutrient } = item;
      const { number, name } = nutrient;

      return {
        number,
        name,
      };
    });

    console.log({ nutrients });
  };

  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
      >
        Load Data
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
              className="rounded-md border border-green-500 bg-green-400 px-3 py-1 hover:bg-green-500 active:bg-green-600"
              onClick={handleLoad}
            >
              Load Data
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LoadUSDA;
