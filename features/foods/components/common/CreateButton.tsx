import { BiFoodMenu } from "react-icons/bi";
import { FC, useState } from "react";
import { MdCreate } from "react-icons/md";
import { PiBowlFoodFill, PiPillFill } from "react-icons/pi";
import Link from "next/link";
import Modal from "@/components/Modal/Modal";

interface Props {}

const CreateButton: FC<Props> = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const CREATE_PAGES = [
    {
      name: "Food",
      url: "/app/create/food",
      icon: <PiBowlFoodFill className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Recipe",
      url: "/app/create/recipe",
      icon: <BiFoodMenu className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Supplements & Vitamins",
      url: "/app/create/supplements-vitamins",
      icon: <PiPillFill className="h-6 w-6 text-green-500" />,
    },
  ];

  return (
    <div>
      {open && (
        <Modal onClose={handleOpen}>
          <div className="flex flex-col gap-2 p-4">
            <span className="font-semibold">Create:</span>
            <div className="m-2 flex flex-col divide-y overflow-auto rounded-lg">
              {CREATE_PAGES.map((page) => (
                <Link
                  key={page.name}
                  href={page.url}
                  className="flex items-center gap-2 py-2 duration-100 hover:bg-slate-500/20 active:bg-slate-500/50"
                >
                  {page.icon}
                  {page.name}
                </Link>
              ))}
            </div>
          </div>
        </Modal>
      )}
      <button
        onClick={handleOpen}
        className="flex items-center gap-1 rounded-3xl border px-2 py-1 duration-100 hover:bg-slate-500/20 active:bg-slate-500/50"
      >
        <MdCreate className="text-green-500" />
        <span className="btn btn-primary text-sm">Create</span>
      </button>
    </div>
  );
};

export default CreateButton;
