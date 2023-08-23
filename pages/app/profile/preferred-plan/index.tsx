import { PlanSelector, selectAuthSlice } from "@/features/authentication";
import { useSelector } from "react-redux";
import { useTour } from "@/features/tours";
import ProfileLayout from "@/layouts/ProfileLayout";

export default function Page() {
  const handleContinue = () => {};
  const { user } = useSelector(selectAuthSlice);
  useTour({
    name: "profile_plan",
    user: user,
    pushWhenFinished: "/app/profile/meals",
    steps: () => [
      {
        element: document.querySelector("#tour-profile_plan-0"),
        title: "Preferred Plan",
        intro: "Here you can update your Preferred Plan",
      },
      {
        element: document.querySelector("#tour-profile_plan-1"),
        title: "Preferred Plan",
        intro:
          "Your preferred plan will be used to calculate your calories and macros. And it will be the first plan to be shown when generating a new Day.",
      },
    ],
  });
  return (
    <ProfileLayout>
      <PlanSelector handleContinue={handleContinue} />
    </ProfileLayout>
  );
}
