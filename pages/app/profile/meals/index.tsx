import { selectAuthSlice } from "@/features/authentication";
import { useTour } from "@/features/tours";
import MealsLayout from "@/layouts/MealsLayout";
import { useSelector } from "react-redux";

export default function Page() {
  const { user } = useSelector(selectAuthSlice);
  useTour({
    name: "profile_meals",
    user: user,
    steps: () => [
      {
        element: document.querySelector("#tour-profile_meals-0"),
        title: "Meals Configuration",
        intro: "Here you can update your Meals Configuration",
      },
      {
        element: document.querySelector("#tour-profile_meals-1"),
        title: "My Meals",
        intro:
          "This are your Meals. (Breakfast, Lunch, Dinner and Snack are created as default). You can Delete them, Reorder them and Add new ones.",
        position: "left",
      },
      {
        element: document.querySelector("#tour-profile_meals-2"),
        title: "Add Meal",
        intro:
          "Here you can add a new Meal, which has to be created previously in the Templates section.",
        position: "left",
      },
      {
        element: document.querySelector("#tour-profile_meals-3"),
        title: "My Templates",
        intro:
          "This are your Templates. You can Delete them, Edit them and Add new ones.",
        position: "left",
      },
      {
        element: document.querySelector("#tour-profile_meals-4"),
        title: "Add Meal Template",
        intro:
          "Here you can add a new Meal Template, which will be used to create new Meals. Each Meal Template has different configurations, like the size, time, complexity and cook.",
        position: "left",
      },
    ],
  });
  return <MealsLayout>{}</MealsLayout>;
}
