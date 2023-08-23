import { Goal, selectAuthSlice } from "@/features/authentication";
import { useTour } from "@/features/tours";
import ProfileLayout from "@/layouts/ProfileLayout";
import { useSelector } from "react-redux";

export default function Page() {
  const handleContinue = () => {};
  const { user } = useSelector(selectAuthSlice);
  useTour({
    name: "profile_goal",
    user: user,
    pushWhenFinished: "/app/profile/body-features",
    steps: () => [
      {
        element: document.querySelector("#tour-profile_goal-0"),
        title: "Goal",
        intro: "Here you can update your goal",
      },
      {
        element: document.querySelector("#tour-profile_goal-1"),
        title: "Lose Fat",
        intro:
          "If you choose Lose Fat, we will calculate the calories you need to eat to lose fat (500 calories less than your maintenance calories).",
      },
      {
        element: document.querySelector("#tour-profile_goal-2"),
        title: "Maintain",
        intro:
          "If you choose Maintain, we will calculate the calories you need to eat to maintain your weight.",
      },
      {
        element: document.querySelector("#tour-profile_goal-3"),
        title: "Build Muscle",
        intro:
          "If you choose Build Muscle, we will calculate the calories you need to eat to build muscle (500 calories more than your maintenance calories).",
      },
      {
        element: document.querySelector("#tour-profile_goal-4"),
        title: "Add Weight Goal",
        intro:
          "If your goal selected is Lose Fat or Build Muscle, you can add a weight goal and a date to achieve it.",
      },
      {
        element: document.querySelector("#tour-profile_goal-5"),
        title: "Add Weight Goal",
        intro:
          "We don't recommend planning changes of more than 1% of the body weight per week. If the date to be achieved don't satisfy this condition, you will see an alert.",
      },
    ],
  });
  return (
    <ProfileLayout>
      <Goal handleContinue={handleContinue} />
    </ProfileLayout>
  );
}
