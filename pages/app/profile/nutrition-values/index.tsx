import { selectAuthSlice } from "@/features/authentication";
import Results from "@/features/authentication/components/create-user/results/Results";
import { useTour } from "@/features/tours";
import ProfileLayout from "@/layouts/ProfileLayout";
import { useSelector } from "react-redux";

export default function Page() {
  const handleSubmit = () => {};
  const { user } = useSelector(selectAuthSlice);

  useTour({
    name: "profile_nutrition_values",
    user: user,
    pushWhenFinished: "/app/profile/goal",
    steps: () => [
      {
        element: document.querySelector("#tour-profile_nutrition_values-0"),
        title: "Nutrition Targets",
        intro:
          "In Nutrition targets you can see information related to your nutrition.",
      },
      {
        element: document.querySelector("#tour-profile_nutrition_values-1"),
        title: "Calories",
        intro: "These are the calories you need to eat to achieve your goal.",
      },
      {
        element: document.querySelector("#tour-profile_nutrition_values-2"),
        title: "Macronutrients Distribution",
        intro:
          "This is the distribution of macronutrients you need to eat to achieve your goal adjusted to the Preferred Plan selected previously.",
      },
      {
        element: document.querySelector("#tour-profile_nutrition_values-3"),
        title: "Macronutrients Distribution",
        intro:
          "Each Plan has its own percentage of macronutrients. And therefore the grams are calculated based on the calories you need to eat to achieve your goal.",
      },
      {
        element: document.querySelector("#tour-profile_nutrition_values-4"),
        title: "Water",
        intro: "This is the amount of water we recommend you to drink daily.",
      },
    ],
  });

  return (
    <ProfileLayout>
      <Results handleSubmit={handleSubmit} />
    </ProfileLayout>
  );
}
