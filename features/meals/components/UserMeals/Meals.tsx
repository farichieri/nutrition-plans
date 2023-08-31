import {
  UserMeals,
  UserMealsArr,
  updateMealsOrder,
  useUpdateUserMealsOrderMutation,
} from "@/features/meals";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { FC, useEffect, useState } from "react";
import { MdDelete, MdDragHandle } from "react-icons/md";
import { reorderArr } from "@/utils/filter";
import { selectAuthSlice } from "@/features/authentication";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

interface Props {
  meals: UserMeals;
  handleConfirmDelete: Function;
}

const Meals: FC<Props> = ({ meals, handleConfirmDelete }) => {
  const { user } = useSelector(selectAuthSlice);
  const mealsArrSorted = Object.values(meals).sort((a, b) => a.order - b.order);
  const [mealsState, setmealsState] = useState<UserMealsArr>(mealsArrSorted);
  const [updateUserMealsOrder] = useUpdateUserMealsOrderMutation();

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    const mealsReordered = reorderArr(
      mealsState,
      source.index,
      destination.index
    );
    updateMeals(mealsReordered);
    setmealsState(mealsReordered);
  };

  const updateMeals = async (mealsReordered: UserMealsArr) => {
    if (user) {
      const mealsUpdated = updateMealsOrder({ meals: mealsReordered });
      const res = await updateUserMealsOrder({
        mealsOrdered: mealsUpdated,
        user,
      });
      if (!("error" in res)) {
        toast.success("Meals order updated successfully");
      } else {
        toast.error("Error updating meals order");
      }
    }
  };

  useEffect(() => {
    const mealsArray = Object.values(meals).sort((a, b) => a.order - b.order);
    setmealsState(mealsArray);
  }, [meals]);

  return (
    <div className="w-full select-none rounded-md border ">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="opaaa">
          {(droppableProvided) => (
            <div
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              className="divide-y"
            >
              {mealsState.map((meal, index) => {
                if (meal.id)
                  return (
                    <Draggable
                      key={meal.id}
                      draggableId={meal.id}
                      index={index}
                    >
                      {(draggableProvided) => (
                        <div
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                          className="flex items-center gap-2 py-2 pl-2 pr-4 hover:bg-slate-500/20 active:bg-slate-500/40"
                        >
                          <MdDragHandle className="mr-2 h-6 w-6 opacity-50" />
                          <span className="text-xs opacity-50">
                            {meal.order + 1}
                          </span>
                          <span className=" capitalize text-green-500">
                            {meal.name}
                          </span>
                          <MdDelete
                            onClick={() => handleConfirmDelete(meal)}
                            className="ml-auto h-6 w-6 cursor-pointer"
                          />
                        </div>
                      )}
                    </Draggable>
                  );
              })}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Meals;
