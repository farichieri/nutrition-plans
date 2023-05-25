import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { selectAuthSlice } from "@/store/slices/authSlice";
import { setUserMeals } from "@/store/slices/mealsSlice";
import { updateUserMeal } from "@/firebase/helpers/Meals";
import { useDispatch, useSelector } from "react-redux";
import { UserMeals, UserMealsArr } from "@/types/mealsSettingsTypes";
import React, { FC, useEffect, useState } from "react";

interface Props {
  meals: UserMeals;
  handleConfirmDelete: Function;
}

const Meals: FC<Props> = ({ meals, handleConfirmDelete }) => {
  const { user } = useSelector(selectAuthSlice);
  const dispatch = useDispatch();
  const mealsArraySorted = Object.values(meals).sort(
    (a, b) => a.order - b.order
  );
  const [mealsState, setmealsState] = useState<UserMealsArr>(mealsArraySorted);

  const reorder = (
    list: UserMealsArr,
    startIndex: number,
    endIndex: number
  ) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    const mealsReordered = reorder(mealsState, source.index, destination.index);
    updateMealsOrders(mealsReordered);
    setmealsState(mealsReordered);
  };

  const updateMealsOrders = async (mealsReordered: UserMealsArr) => {
    console.log("updating");
    if (!user?.user_id) return;

    const mealsUpdated: UserMeals = {};
    mealsReordered.forEach((meal, index) => {
      if (!meal.id) return;
      mealsUpdated[meal.id] = {
        ...meal,
        order: index,
      };
    });
    Object.values(mealsUpdated).map(async (meal) => {
      const res = await updateUserMeal(user, meal);
      if (res?.error) {
        console.log("Error reordering meals");
      }
    });
    dispatch(setUserMeals(mealsUpdated));
  };

  useEffect(() => {
    const mealsArray = Object.values(meals).sort((a, b) => a.order - b.order);
    setmealsState(mealsArray);
  }, [meals]);

  return (
    <div className="w-full max-w-sm select-none rounded-md border px-4">
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
                          className="flex items-center gap-2 py-2"
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
