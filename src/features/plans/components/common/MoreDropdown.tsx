"use client";

import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillFileAdd } from "react-icons/ai";
import { MdContentCopy, MdDelete, MdOutlineMoreHoriz } from "react-icons/md";
import { useSelector } from "react-redux";

import DropDown from "@/components/DropDown/DropDown";
import Spinner from "@/components/Loader/Spinner";
import Modal from "@/components/Modal/Modal";
import { selectAuthSlice } from "@/features/authentication";
import { ReplaceDietSelector, SaveDiet } from "@/features/library";

import { Diet } from "../..";
import { useDeleteDietMutation } from "../../services";

const optionStyle =
  "flex w-full cursor-pointer items-center gap-2 border-none bg-transparent px-4 py-2 opacity-60 hover:bg-slate-500/40 hover:opacity-100";

interface Props {
  diet: Diet;
}

const MoreDropdown: FC<Props> = ({ diet }) => {
  const [closeDrop, setCloseDrop] = useState(false);
  const { user } = useSelector(selectAuthSlice);
  const [isOpen, setIsOpen] = useState({
    save: false,
    replace: false,
  });
  const [deleteDiet, { isLoading: isLoadingDelete }] = useDeleteDietMutation();

  if (!user || !diet.id || !diet.date) return <></>;

  const handleDelete = async () => {
    toast(
      (t) => (
        <div className="flex flex-col items-center gap-1">
          <span>
            Confirm <b>Delete</b>
          </span>
          <div className="flex gap-1">
            <button
              className="flex items-center gap-1 rounded-md border border-red-500 bg-red-500/20 px-3 py-1 hover:bg-red-500/50 active:bg-red-500"
              onClick={async () => {
                toast.dismiss(t.id);
                const res = await deleteDiet({ diet });
                if (!("error" in res)) {
                  toast.success("Day deleted successfully.");
                } else {
                  toast.error("Error deleting Day. Please try again.");
                }
              }}
            >
              Confirm
            </button>
            <button
              className="flex items-center gap-1 rounded-md border border-gray-500 bg-gray-500/20 px-3 py-1 hover:bg-gray-500/50 active:bg-gray-500"
              onClick={() => {
                toast.dismiss(t.id);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
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
      text: "Save Day",
      icon: (
        <AiFillFileAdd
          className={`pointer-events-none h-5 w-5  text-green-500`}
        />
      ),
      onClick: handleSave,
      isLoading: false,
    },
    {
      text: "Load Saved Day",
      icon: <MdContentCopy className="h-5 w-5 text-blue-500" />,
      onClick: handleReplace,
      isLoading: false,
    },
    {
      text: "Delete Day",
      icon: <MdDelete className="h-5 w-5 text-red-500" />,
      onClick: handleDelete,
      isLoading: isLoadingDelete,
    },
  ];

  return (
    <>
      {isOpen.save && (
        <Modal onClose={handleClose}>
          <SaveDiet diet={diet} handleClose={handleClose} />
        </Modal>
      )}
      {isOpen.replace && (
        <Modal onClose={handleClose}>
          <ReplaceDietSelector
            dates={null}
            date={diet.date}
            handleClose={handleClose}
            setDoneGeneratingPlan={() => {}}
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

export default MoreDropdown;
