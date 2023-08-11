import { convertDateToDateString } from "../../utils";
import { FC, useEffect, useState } from "react";
import { selectAuthSlice } from "@/features/authentication";
import { selectPlansSlice } from "../../slice";
import { useSelector } from "react-redux";
import Modal from "@/components/Modal/Modal";
import PlanGenerator from "../common/PlanGenerator";

interface Props {
  dates: string[];
}

const PlansGenerator: FC<Props> = ({ dates }) => {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useSelector(selectAuthSlice);
  const { diets } = useSelector(selectPlansSlice);
  const [missingDays, setMissingDays] = useState<string[]>([]);

  const getMissingDaysDates = ({ dates }: { dates: string[] }) => {
    const missingDiets = [];
    for (const date of dates) {
      if (!diets[date]) {
        missingDiets.push(date);
      }
    }
    return missingDiets;
  };

  useEffect(() => {
    setMissingDays(getMissingDaysDates({ dates }));
  }, [diets, dates]);

  if (!user) return <></>;

  const setDoneGeneratingPlan = (value: boolean) => {
    if (value) {
      setOpenModal(false);
    }
  };

  if (!missingDays.length)
    return (
      <div className="my-2 flex flex-col items-center justify-center gap-2"></div>
    );

  return (
    <div className="my-2 flex flex-col items-center justify-center gap-2">
      <button
        onClick={() => {
          setOpenModal(true);
        }}
        className="w-fit rounded-3xl border px-4 py-1.5"
      >
        Generate All Empty Days
      </button>
      {openModal && (
        <Modal
          onClose={() => {
            setOpenModal(false);
          }}
        >
          <div className="max-w-[95vw] px-4 pb-4 pt-10">
            <div className="rounded-lg border-2 p-2 ">
              <span>
                You are generating plans for the next{" "}
                <b className="text-red-500">empty</b> days:
              </span>
              <ul className="text-sm">
                {missingDays &&
                  missingDays.map((date) => {
                    const dateF = convertDateToDateString({
                      date,
                      userStartOfWeek: user?.startOfWeek,
                    });
                    return (
                      <li
                        className="list-decimal text-sm capitalize"
                        key={date}
                      >
                        {dateF}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <PlanGenerator
              date={null}
              dates={missingDays}
              setDoneGeneratingPlan={setDoneGeneratingPlan}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PlansGenerator;
