import { UserMeals, UserMealsArr, setUserMeals } from "@/features/meals";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { FC, useEffect, useState } from "react";
import { reorderArr } from "@/utils/filter";
import { selectAuthSlice } from "@/features/authentication";
import { useDispatch, useSelector } from "react-redux";
import { updateMealsOrders } from "./utils";

interface Props {
  meals: UserMeals;
  handleConfirmDelete: Function;
}

const Meals: FC<Props> = ({ meals, handleConfirmDelete }) => {
  const { user } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();
  const mealsArrSorted = Object.values(meals).sort((a, b) => a.order - b.order);
  const [mealsState, setmealsState] = useState<UserMealsArr>(mealsArrSorted);

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
      const res = await updateMealsOrders(mealsReordered, user);
      if (res.result === "success") {
        dispatch(setUserMeals(res.data));
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
                          className="flex items-center gap-2 px-4 py-2 hover:bg-slate-500/20 active:bg-slate-500/40"
                        >
                          <span className="text-xs opacity-50">
                            {meal.order + 1}
                          </span>
                          <span className=" capitalize text-green-500">
                            {meal.name}
                          </span>
                          <span
                            onClick={() => handleConfirmDelete(meal)}
                            className="material-icons ml-auto cursor-pointer"
                          >
                            delete
                          </span>
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
